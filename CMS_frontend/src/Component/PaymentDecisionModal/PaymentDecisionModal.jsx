import { useState } from "react";

const PaymentDecisionModal = ({ isOpen, onClose, onSubmit }) => {
  const [decision, setDecision] = useState("");
  const [invoiceFile, setInvoiceFile] = useState(null);

  const handleDecisionChange = (e) => {
    setDecision(e.target.value);
    if (e.target.value !== "Paid") {
      setInvoiceFile(null); // reset invoice if reject
    }
  };

  const handleFileChange = (e) => {
    setInvoiceFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!decision) {
      alert("Please select a decision.");
      return;
    }
    if (decision === "Paid" && !invoiceFile) {
      alert("Please upload an invoice for accepted payments.");
      return;
    }

    // ✅ Pass decision + invoice file to parent
    onSubmit({ decision, invoiceFile });

    // reset
    setDecision("");
    setInvoiceFile(null);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Payment Decision
              </h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Decision dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Decision
                </label>
                <select
                  value={decision}
                  onChange={handleDecisionChange}
                  className="select select-bordered w-full"
                >
                  <option value="">-- Choose --</option>
                  <option value="Paid">Accept (Paid)</option>
                  <option value="Unpaid">Reject (Unpaid)</option>
                </select>
              </div>

              {/* Invoice upload if Paid */}
              {decision === "Paid" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Invoice (PDF or Image)
                  </label>
                  <input
                    type="file"
                    accept=".pdf, .jpg, .jpeg, .png"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered w-full"
                  />
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Decision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentDecisionModal;
