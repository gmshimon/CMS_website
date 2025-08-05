import React, { useEffect, useState } from 'react'
import { IoClose, IoCloudUpload, IoDocument } from 'react-icons/io5'
import { FaFilePdf, FaFileWord } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { postPaper } from '../../Redux/Slice/PaperSlice'

const UploadPaperModal = ({ isOpen, onClose, abstractData }) => {
  const { createPostPaperLoading, createPostPaperSuccess } = useSelector(
    state => state.paper
  )
  const [selectedFile, setSelectedFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (createPostPaperSuccess) {
      onClose()
    }
  }, [createPostPaperSuccess, onClose])

  // Handle file selection
  const handleFileSelect = file => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    const maxSize = 15 * 1024 * 1024 // 10MB

    if (!allowedTypes.includes(file.type)) {
      toast.error('Please select a PDF or Word document only')
      return
    }

    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB')
      return
    }

    setSelectedFile(file)
  }

  // Handle file input change
  const handleFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  // Handle drag events
  const handleDrag = e => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  // Handle drop
  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  // Handle upload
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload')
      return
    }

    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('abstract', abstractData?._id)
      formData.append('conference', abstractData?.conference._id)
      formData.append('category', abstractData?.category)
      formData.append('theme', abstractData?.theme)

      // Here you would make the API call to upload the paper
      // const response = await axiosSecure.post('/papers/upload', formData)
      dispatch(postPaper({ id: abstractData?._id, data: formData }))
      setSelectedFile(null)
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Failed to upload paper. Please try again.')
    }
  }

  // Remove selected file
  const removeFile = () => {
    setSelectedFile(null)
  }

  // Get file icon based on type
  const getFileIcon = fileType => {
    if (fileType === 'application/pdf') {
      return <FaFilePdf className='text-red-500 text-2xl' />
    } else {
      return <FaFileWord className='text-blue-500 text-2xl' />
    }
  }

  // Format file size
  const formatFileSize = bytes => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <div>
            <h2 className='text-2xl font-bold text-gray-800'>Upload Paper</h2>
            <p className='text-sm text-gray-600 mt-1'>
              Abstract ID: {abstractData?._id || 'N/A'}
            </p>
          </div>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
          >
            <IoClose className='text-2xl text-gray-600' />
          </button>
        </div>

        {/* Content */}
        <div className='p-6'>
          {/* Abstract Information */}
          <div className='mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200'>
            <h3 className='font-semibold text-gray-800 mb-2'>
              Abstract Details
            </h3>
            <p className='text-sm text-gray-700 mb-1'>
              <span className='font-medium'>Title:</span>{' '}
              {abstractData?.paper_title || 'N/A'}
            </p>
            <p className='text-sm text-gray-700 mb-1'>
              <span className='font-medium'>Author:</span>{' '}
              {abstractData?.authors?.[0]?.name || 'N/A'}
            </p>
            <p className='text-sm text-gray-700'>
              <span className='font-medium'>Theme:</span>{' '}
              {abstractData?.theme || 'N/A'}
            </p>
          </div>

          {/* File Upload Area */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-3'>
              Upload Paper Document
            </label>

            {!selectedFile ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <IoCloudUpload className='mx-auto text-4xl text-gray-400 mb-4' />
                <p className='text-lg font-medium text-gray-700 mb-2'>
                  Drag and drop your paper here
                </p>
                <p className='text-sm text-gray-500 mb-4'>
                  or click to browse files
                </p>
                <input
                  type='file'
                  accept='.pdf,.doc,.docx'
                  onChange={handleFileChange}
                  className='hidden'
                  id='file-upload'
                />
                <label
                  htmlFor='file-upload'
                  className='inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors duration-200'
                >
                  <IoDocument className='mr-2' />
                  Choose File
                </label>
                <p className='text-xs text-gray-500 mt-3'>
                  Supported formats: PDF, DOC, DOCX (Max size: 10MB)
                </p>
              </div>
            ) : (
              <div className='border border-gray-300 rounded-lg p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    {getFileIcon(selectedFile.type)}
                    <div>
                      <p className='font-medium text-gray-800'>
                        {selectedFile.name}
                      </p>
                      <p className='text-sm text-gray-500'>
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className='p-1 hover:bg-gray-100 rounded-full transition-colors duration-200'
                  >
                    <IoClose className='text-lg text-gray-600' />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Upload Guidelines */}
          <div className='mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200'>
            <h4 className='font-medium text-yellow-800 mb-2'>
              Upload Guidelines
            </h4>
            <ul className='text-sm text-yellow-700 space-y-1'>
              <li>
                • Only PDF and Word documents (.pdf, .doc, .docx) are accepted
              </li>
              <li>• Maximum file size is 10MB</li>
              <li>
                • Ensure your paper follows the conference formatting guidelines
              </li>
              <li>• The paper should correspond to the submitted abstract</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className='flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50'>
          <button
            onClick={onClose}
            className='px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200'
            disabled={createPostPaperLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || createPostPaperLoading}
            className={`px-6 py-2 text-white rounded-lg transition-colors duration-200 ${
              !selectedFile || createPostPaperLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {createPostPaperLoading ? (
              <div className='flex items-center space-x-2'>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                <span>Uploading...</span>
              </div>
            ) : (
              'Upload Paper'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UploadPaperModal
