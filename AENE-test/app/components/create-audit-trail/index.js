import React, { useState } from 'react';

const CreateAuditModal = ({ onSubmit, onClose }) => {
  const wallet_address = "0x6a2fb1afC12bF7CA6e14c5925EE6DAc93f1176cF"
  const contract_address = "0x79e5574C8BE69FC88EdBE5a925487e1D2af91fE2"
  const [metadata, setMetadata] = useState({ patient_name: '', diagnosis: '', treatment: '', date: '' });
  const callbackUrl = "https://postman-echo.com/post?";  // Fixed callback URL

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Audit Data:', {
      wallet_address: wallet_address,
      contract_address: contract_address,
      metadata,
      callback_url: callbackUrl,
    });
    onSubmit({
      wallet_address,
      contract_address,
      metadata,
      callbackUrl
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white p-8 rounded-lg shadow-lg lg:w-96 w-3/4">
        <h2 className="text-2xl font-bold mb-8">Create Audit</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="walletAddress" className="block mb-2">Wallet Address</label>
            <input
              type="text"
              id="walletAddress"
              value={wallet_address}
              className="w-full px-3 py-2 border rounded-md"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contractAddress" className="block mb-2">Contract Address</label>
            <input
              type="text"
              id="contractAddress"
              value={contract_address}
              className="w-full px-3 py-2 border rounded-md"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="patientName" className="block mb-2">Patient Name</label>
            <input
              type="text"
              id="patientName"
              value={metadata.patient_name}
              onChange={(e) => setMetadata({ ...metadata, patient_name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="diagnosis" className="block mb-2">Diagnosis</label>
            <input
              type="text"
              id="diagnosis"
              value={metadata.diagnosis}
              onChange={(e) => setMetadata({ ...metadata, diagnosis: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="treatment" className="block mb-2">Treatment</label>
            <input
              type="text"
              id="treatment"
              value={metadata.treatment}
              onChange={(e) => setMetadata({ ...metadata, treatment: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block mb-2">Date</label>
            <input
              type="date"
              id="date"
              value={metadata.date}
              onChange={(e) => setMetadata({ ...metadata, date: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 border rounded-md hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Create Audit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAuditModal;