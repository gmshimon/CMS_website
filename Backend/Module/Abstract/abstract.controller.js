import { abstractCreatedTemplate } from '../../Utilis/EmailTemplate/abstractCreatedTemplate.js'
import { sendEmail } from '../../Utilis/sendEmail.js'
import conference_reg from '../Conference_reg/conference_reg.model.js'
import { createNotificationService } from '../Notification/notification.service.js'
import Abstracts from './abstract.model.js'
import {
  s3AbstractGraphicalAbstract,
  s3AbstractPresentationProfilePicture
} from './abstract.s3Service.js'

export const createAbstract = async (req, res, next) => {
  try {
    const { conference_registration, ...data } = req.body
    const { _id, email, name } = req.user

    conference_registration.createdBy = _id
    // ✅ create the conference registration data
    const createConference = await conference_reg.create(
      conference_registration
    )

    const abstractFile = req.files?.image?.[0]
    const profileImage = req.files?.file?.[0]

    let graphical = null
    let image = null

    if (abstractFile) {
      graphical = await s3AbstractGraphicalAbstract(abstractFile)
    }

    if (profileImage) {
      image = await s3AbstractPresentationProfilePicture(profileImage)
    }

    data.graphical_abstract = graphical
    data.presentation_profile_picture = image
    data.conference_reg = createConference._id
    data.createdBy = _id

    // ✅ create the abstract
    const createAbstract = await Abstracts.create(data)
    await conference_reg.updateOne(
      { _id: createConference._id },
      {
        $set: {
          abstract: createAbstract._id
        }
      }
    )

    const message = `Your abstract ${data.paper_title} has been successfully submitted`
    const type = 'abstract_created'

    // get the styled html
    const emailHtml = abstractCreatedTemplate({
      userName: name,
      abstractTitle: data.paper_title || ''
    })

    // ✅ save the notification and send notification to the frontend
    await createNotificationService(_id, message, emailHtml)

    // ✅ Send styled email
    await sendEmail({
      to: email,
      subject: 'Abstract Submission confirmation',
      html: emailHtml
    })
    res.status(200).json({
      status: 'Success',
      message: 'Successfully abstract created',
      data: createAbstract
    })
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message
    })
  }
}

export const getAbstract = async (req, res, next) => {
  try {
    const { conference_id } = req.params

    const getAbstract = await Abstracts.find({
      conference: conference_id
    }).populate({
      path: 'conference',
      path: 'createdBy'
    })

    res.status(200).json({
      status: 'Success',
      message: 'fetched the abstract successfully',
      data: getAbstract
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}
