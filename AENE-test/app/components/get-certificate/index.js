"use client";
import React, { useState } from 'react';

const GetCertificateModal = ({ onSubmit, onClose }) => {
  const to = "0x6a2fb1afC12bF7CA6e14c5925EE6DAc93f1176cF"

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('get Data:', {
      to: to,
    });
    onSubmit({
      to
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white p-8 rounded-lg shadow-lg lg:w-96 w-3/4">
        <h2 className="text-2xl font-bold mb-8">Create Audit</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="to" className="block mb-2">Wallet Address</label>
            <input
              type="text"
              id="to"
              value={to}
              className="w-full px-3 py-2 border rounded-md"
              readOnly
            />
          </div>
          
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 border rounded-md hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              get certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetCertificateModal;