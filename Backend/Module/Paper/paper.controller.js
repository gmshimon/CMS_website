import Abstracts from '../Abstract/abstract.model.js'
import Paper from './paper.model.js'
import {
  s3PaperDeleteService,
  s3PaperUploadService
} from './paper.s3Service.js'

export const postPaper = async (req, res, next) => {
  try {
    const { abstractId } = req.params
    const { id } = req.user

    const paperFile = req.file
    let fileUrl = null

    if (paperFile) {
      fileUrl = await s3PaperUploadService(paperFile)
    }

    const isPaperExist = await Paper.findOne({
      abstract: abstractId
    })
    // if paper exist update the paper
    if (isPaperExist) {
      await Paper.updateOne(
        { _id: isPaperExist._id },
        {
          $push: {
            paper: paperFile
          }
        }
      )

      await Abstracts.updateOne(
        { _id: abstractId },
        {
          $set: {
            status: 'Paper Submitted '
          }
        }
      )

      const getPaper = await Paper.findOne({ _id: isPaperExist._id })
      return res.status(200).json({
        status: 'Success',
        message: 'Paper Uploaded Successfully',
        data: result
      })
    }

    const data = req.body

    data.createdBy = id
    data.paper = [fileUrl]

    const result = await Paper.create(data)

    res.status(200).json({
      status: 'Success',
      message: 'Paper Uploaded Successfully',
      data: result
    })
  } catch (error) {
    if (req.file) {
      await s3PaperDeleteService(`/paper/${req.file.originalname}`)
    }

    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const getPaper = async (req, res, next) => {
  try {
    const { abstractId } = req.params
    const { id } = req.user

    const getPaper = await Paper.find({
      abstract: abstractId,
      createdBy: id
    })

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
