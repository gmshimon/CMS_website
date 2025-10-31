import { useState } from 'react';

const PaymentModal = ({ isOpen, onClose, onSubmit }) => {
  const [receiptFile, setReceiptFile] = useState(null);

  const handleFileChange = (e) => {
    setReceiptFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!receiptFile) {
      alert('Please upload your payment receipt.');
      return;
    }

    // Call parent submit handler
    onSubmit(receiptFile);
    setReceiptFile(null);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-xl p-6 w-full max-w-lg shadow-lg'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-semibold text-gray-800'>Payment Details</h3>
              <button onClick={onClose} className='text-gray-500 hover:text-red-500'>
                ✕
              </button>
            </div>

            <div className='mb-4'>
              <h4 className='font-semibold mb-2'>Bank Information:</h4>
              <ul className='text-sm text-gray-700 space-y-1'>
                <li><strong>Bank Name:</strong> XYZ Bank</li>
                <li><strong>Account Name:</strong> Conference Organizer</li>
                <li><strong>Account Number:</strong> 1234567890</li>
                <li><strong>SWIFT Code:</strong> XYZABC123</li>
                <li><strong>Branch:</strong> Dhaka Main Branch</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Upload Payment Receipt (PDF or Image)
                </label>
                <input
                  type='file'
                  accept='.pdf, .jpg, .jpeg, .png'
                  onChange={handleFileChange}
                  className='file-input file-input-bordered w-full'
                />
              </div>

              <div className='flex justify-end gap-2'>
                <button
                  type='button'
                  onClick={onClose}
                  className='px-2 py-2 text-sm font-semibold text-black border border-black rounded-md transition-colors duration-200 mr-2'
                >
                  Cancel
                </button>
                <button type='submit' className='px-2 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 '>
                  Submit Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentModal;

