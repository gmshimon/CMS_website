import dayjs from 'dayjs'
import Abstracts from '../Abstract/abstract.model.js'
import Paper from './paper.model.js'
import {
  s3PaperDeleteService,
  s3PaperUploadService
} from './paper.s3Service.js'

export const postPaper = async (req, res, next) => {
  try {
    const { abstractId } = req.params
    const { _id: userId } = req.user

    const isAbstract = await Abstracts.findOne({
      _id: abstractId
    })

    if (!req.file) {
      return res.status(400).json({
        status: 'Failed',
        message: 'No file uploaded'
      })
    }

    // Check if payment deadline exists and is still valid
    if (
      isAbstract.paper_deadline &&
      dayjs().isAfter(dayjs(isAbstract.paper_deadline))
    ) {
      const error = new Error(
        'Paper Submission deadline has passed. You can no longer make the payment.'
      )
      error.statusCode = 403
      return next(error)
    }

    // Upload to S3
    const fileUrl = await s3PaperUploadService(req.file, req.file.safeFilename)

    // Prepare file object with URL and original name
    const fileObj = {
      url: fileUrl,
      originalName: req.file.originalname
    }

    // Check if a paper already exists
    let paperDoc = await Paper.findOne({ abstract: abstractId })
    let status

    if (paperDoc) {
      // Append or replace based on your use case
      paperDoc.paper.push(fileObj)
      await paperDoc.save()
      status = 'Revision Submitted'
    } else {
      // Create new paper
      paperDoc = await Paper.create({
        ...req.body,
        createdBy: userId,
        abstract: abstractId,
        paper: [fileObj]
      })
      status = 'Paper Submitted'
    }

    await Abstracts.updateOne({ _id: abstractId }, { $set: { status } })

    return res.status(paperDoc.isNew ? 201 : 200).json({
      status: 'Success',
      message: 'Paper uploaded successfully',
      data: paperDoc
    })
  } catch (error) {
    // Cleanup S3 if upload failed
    if (req.file?.safeFilename) {
      try {
        await s3PaperDeleteService(req.file.key || req.file.safeFilename)
      } catch (cleanupErr) {
        console.error('S3 cleanup failed:', cleanupErr.message)
      }
    }
    next(error)
  }
}

export const getPaper = async (req, res, next) => {
  try {
    const { abstractId } = req.params
    // const { _id } = req.user

    const getPaper = await Paper.findOne({
      abstract: abstractId
      // createdBy: _id
    }).populate([{ path: 'abstract' }])

    res.status(200).json({
      status: 'Success',
      message: 'Fetched the paper successfully',
      data: getPaper
    })
  } catch (error) {
    res.status(200).json({
      status: 'Failed',
      message: error.message
    })
  }
}
