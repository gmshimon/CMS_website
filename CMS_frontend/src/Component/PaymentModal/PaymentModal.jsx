// import React, { useState } from 'react';

// const PaymentModal = ({ isOpen, onClose, abstracts }) => {
//   const [selectedAbstractId, setSelectedAbstractId] = useState('');

//   const handleAbstractSelect = (e) => {
//     setSelectedAbstractId(e.target.value);
//   };

//   const handleViewPayment = () => {
//     const selectedAbstract = abstracts.find(abstract => abstract.abstractId === selectedAbstractId);
//     if (selectedAbstract?.receiptUrl) {
//       // Open the payment PDF in a new window/tab
//       window.open(selectedAbstract.receiptUrl, '_blank');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-gray-900 bg-opacity-50">
//       <div className="relative w-full max-w-md mx-auto my-6">
//         <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
//           {/* Header */}
//           <div className="flex items-start justify-between p-5 border-b border-gray-200 rounded-t">
//             <h3 className="text-xl font-semibold text-gray-900">View Payment Details</h3>
//             <button
//               onClick={onClose}
//               className="p-1 ml-auto bg-transparent border-0 text-gray-600 hover:text-gray-900 float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
//             >
//               ×
//             </button>
//           </div>

//           {/* Body */}
//           <div className="relative p-6 flex-auto">
//             <div className="mb-4">
//               <label htmlFor="abstractId" className="block text-sm font-medium text-gray-700 mb-2">
//                 Select Abstract ID
//               </label>
//               <select
//                 id="abstractId"
//                 value={selectedAbstractId}
//                 onChange={handleAbstractSelect}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="">Select an Abstract ID</option>
//                 {abstracts?.map((abstract) => (
//                   <option key={abstract.abstractId} value={abstract.abstractId}>
//                     {abstract.abstractId} - {abstract.title}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b">
//             <button
//               onClick={onClose}
//               className="text-gray-600 background-transparent font-medium px-6 py-2 text-sm outline-none focus:outline-none mr-2 mb-1 hover:text-gray-800"
//             >
//               Close
//             </button>
//             <button
//               onClick={handleViewPayment}
//               disabled={!selectedAbstractId}
//               className={`px-6 py-2 text-sm font-medium text-white rounded-md focus:outline-none ${selectedAbstractId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
//             >
//               View Payment
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentModal;

// components/PaymentModal.jsx or .tsx if you're using TypeScript
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
                  className='btn btn-ghost'
                >
                  Cancel
                </button>
                <button type='submit' className='btn btn-primary'>
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

