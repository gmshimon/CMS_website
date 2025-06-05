import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand
}  from'@aws-sdk/client-s3'

const s3client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

export const s3UserUpload = async file => {
  try {
    const param = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `users/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype
    }

    const result = await s3client.send(new PutObjectCommand(param))
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/users/${file.originalname}`

    return fileUrl
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

export const deleteImageFromS3 = async fileKey => {
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
