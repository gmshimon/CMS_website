import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import 'dotenv/config'

const s3client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

export const s3AbstractGraphicalAbstract = async file => {
  try {
    const param = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `abstract/graphical_abstract/${file.originalname}`,
      Body: file.buffer,
      ContentType:
        file.mimetype ||
        (file.originalname.endsWith('.zip')
          ? 'application/zip'
          : 'application/octet-stream')
    }

    const result = await s3client.send(new PutObjectCommand(param))
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/abstract/graphical_abstract/${file.originalname}`
    return fileUrl
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

export const s3AbstractPresentationProfilePicture = async file => {
  try {
    const param = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `abstract/presenter/profile/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype
    }

    const result = await s3client.send(new PutObjectCommand(param))
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/abstract/presenter/profile/${file.originalname}`

    return fileUrl
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

export const deleteAbstractFile = async fileKey => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey
    }
    const result = await s3client.send(new DeleteObjectCommand(params))
    return {
      success: true,
      message: 'File deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting file from S3:', error)
    throw error
  }
}

export const s3PaymentReceiptUploadService = async file => {
  try {
    const param = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `payment/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype
    }

    const result = await s3client.send(new PutObjectCommand(param))
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/payment/${file.originalname}`
    return fileUrl
  } catch (error) {
    console.error('Error uploading payment receipt:', error)
    throw error
  }
}

export const s3PaymentReceiptDeleteService = async fileKey => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey
    }
    const result = await s3client.send(new DeleteObjectCommand(params))
    return {
      success: true,
      message: 'Payment receipt deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting payment receipt from S3:', error)
    throw error
  }
} 