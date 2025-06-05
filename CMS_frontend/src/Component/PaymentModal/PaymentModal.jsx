import React, { useState } from 'react';

const PaymentModal = ({ isOpen, onClose, abstracts }) => {
  const [selectedAbstractId, setSelectedAbstractId] = useState('');

  const handleAbstractSelect = (e) => {
    setSelectedAbstractId(e.target.value);
  };

  const handleViewPayment = () => {
    const selectedAbstract = abstracts.find(abstract => abstract.abstractId === selectedAbstractId);
    if (selectedAbstract?.receiptUrl) {
      // Open the payment PDF in a new window/tab
      window.open(selectedAbstract.receiptUrl, '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-gray-900 bg-opacity-50">
      <div className="relative w-full max-w-md mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-gray-200 rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">View Payment Details</h3>
            <button
              onClick={onClose}
              className="p-1 ml-auto bg-transparent border-0 text-gray-600 hover:text-gray-900 float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="relative p-6 flex-auto">
            <div className="mb-4">
              <label htmlFor="abstractId" className="block text-sm font-medium text-gray-700 mb-2">
                Select Abstract ID
              </label>
              <select
                id="abstractId"
                value={selectedAbstractId}
                onChange={handleAbstractSelect}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select an Abstract ID</option>
                {abstracts?.map((abstract) => (
                  <option key={abstract.abstractId} value={abstract.abstractId}>
                    {abstract.abstractId} - {abstract.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b">
            <button
              onClick={onClose}
              className="text-gray-600 background-transparent font-medium px-6 py-2 text-sm outline-none focus:outline-none mr-2 mb-1 hover:text-gray-800"
            >
              Close
            </button>
            <button
              onClick={handleViewPayment}
              disabled={!selectedAbstractId}
              className={`px-6 py-2 text-sm font-medium text-white rounded-md focus:outline-none ${selectedAbstractId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              View Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;