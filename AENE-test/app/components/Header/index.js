"use client";
import React, { useState } from "react";
import CreateWalletModal from "../Create-wallet";
import CreateAuditModal from "../create-audit-trail";
import CreateCertificateModal from "../create-certificate";
import GetCertificateModal from "../get-certificate";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isGetCertificateModalOpen, setIsGetCertificateModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const openAuditModal = () => {
    setIsAuditModalOpen(true);
  }

  const openCertificateModal = () => {
    setIsCertificateModalOpen(true);
  }

  const openGetCertificateModal = () => {
    setIsGetCertificateModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeAuditModal = () => {
    setIsAuditModalOpen(false);
  };

  const closeCertificateModal = () => {
    setIsCertificateModalOpen(false);
  };

  const closeGetCertificateModal = () => {
    setIsGetCertificateModalOpen(false);
  };

  const handleSubmit = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/wallet/create-user`,
        {
          method: "POST",
          headers: {
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const result = await response.json();
      //   console.log("User created:", result);
      const walletAddress = result.result.wallet.wallet_address;
      //   console.log("Wallet address:", walletAddress);
      // Store the wallet address in sessionStorage
      sessionStorage.setItem("walletAddress", walletAddress);

      if (!walletAddress) {
        throw new Error("Wallet address not found in the response");
      }

      toast.success(
        `🦄 User created successfully!
        Wallet address: ${walletAddress}`,
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      closeModal();
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("🦄 Error creating user", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Don't send the request if there's an error
      return;
    }
  };

  const handleCertificateSubmit = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/certificate/mint-certificate`,
        {
          method: 'POST',
          headers: {
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
          },
          body: formData,
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server responded with:", errorData);
        throw new Error("Failed to create certificate");
      }
  
      const result = await response.json();
      const certificateId = result.result.transactionHash; // Adjust based on actual response
  
      if (!certificateId) {
        throw new Error("Certificate ID not found in the response");
      }
  
      toast.success(
        `🦄 Certificate created successfully! Certificate ID: ${certificateId}`,
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      closeCertificateModal();
    } catch (error) {
      console.error("Error creating certificate:", error);
      toast.error("🦄 Error creating certificate", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleAuditSubmit = async (data) => {
    try {
      const payload = {
        wallet_address: data.wallet_address,
        contract_address: data.contract_address,
        metadata: data.metadata,
        callback_url: "https://postman-echo.com/post?"  // Ensure this is added to the payload
      };
  
      console.log("Sending data:", JSON.stringify(payload));
     const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/audit/audit/`,
      {
        method: "POST",
        headers: {
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
     );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server responded with:", errorData);
        throw new Error("Failed to create audit");
      }

      const result = await response.json();

      const auditId = result.result.transactionHash;

      sessionStorage.setItem("auditId", auditId);

      if (!auditId) {
        throw new Error("Audit ID not found in the response");
      }
      toast.success(
        `🦄 Audit created successfully!
        Audit ID: ${auditId}`,
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      closeAuditModal();
    } catch (error) {
      console.error("Error creating audit from catch:", error);
      toast.error("🦄 Error creating audit from catch", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Don't send the request if there's an error
      return;
    }
  };

  const handleGetCertificateSubmit = async (data) => {
    try {
      const payload = {
        to: data.to  // Ensure this is added to the payload
      };
  
      console.log("Sending data:", JSON.stringify(payload));
     const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/certificate/get-certificate`,
      {
        method: "GET", 
        headers: {
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
          "Content-Type": "application/json",
        }
        
      }
     );

     if (!response.ok) {
      const errorData = await response.json();
      console.error("Server responded with:", errorData);
      throw new Error("Failed to create certificate");
    }

    const result = await response.json();
    console.log("Result:", result);
    
      toast.success(
        `🦄 get audit successfully!
       `,
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      closeAuditModal();
    } catch (error) {
      console.error("Error creating audit from catch:", error);
      toast.error("🦄 Error creating audit from catch", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Don't send the request if there's an error
      return;
    }
  };


  return (
    <header className="w-full py-6 lg:py-4 relative border-b" style={{ backgroundColor: "lightblue" }}>
      <div className="container mx-auto px-8 lg:px-4 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Maschain Project</h1>
      </div>
      <div className="flex space-x-4">
        {/* Create Wallet Button */}
        <button
        onClick={openModal}
        className="border rounded-md py-2 px-4 hover:bg-black hover:text-white transition-all duration-300"
        >
        {typeof window !== "undefined" &&
        window.sessionStorage.getItem("walletAddress") ? (
          <span className="text-sm">
          {`${window.sessionStorage
            .getItem("walletAddress")
            .slice(0, 6)}...${window.sessionStorage
            .getItem("walletAddress")
            .slice(-4)}`}
          </span>
        ) : (
          "Create Wallet"
        )}
        </button>
    
        {/* Create Audit Button */}
        <button
        onClick={openAuditModal} // Function to open the audit modal
        className="border rounded-md py-2 px-4 hover:bg-black hover:text-white transition-all duration-300"
        >
        Create Audit
        </button>

        {/* Create Certificate Button */}
        <button
        onClick={openCertificateModal} // Function to open the certificate modal
        className="border rounded-md py-2 px-4 hover:bg-black hover:text-white transition-all duration-300"
        >
        Create Certificate
        </button>

        {/* Create get Certificate Button */}
        <button
        onClick={openGetCertificateModal} // Function to open the get certificate modal
        className="border rounded-md py-2 px-4 hover:bg-black hover:text-white transition-all duration-300"
        >
        get Certificate
        </button>
      </div>
      </div>
      <AnimatePresence>
      {/* Wallet Modal */}
      {isModalOpen && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        >
        <CreateWalletModal onSubmit={handleSubmit} onClose={closeModal} />
        </motion.div>
      )}
    
      {/* Audit Modal */}
      {isAuditModalOpen && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        >
        <CreateAuditModal
          onSubmit={handleAuditSubmit} // Function to handle audit form submission
          onClose={closeAuditModal} // Function to close the audit modal
        />
        </motion.div>
      )}

      {/* Certificate Modal */}
      {isCertificateModalOpen && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        >
        <CreateCertificateModal
          onSubmit={handleCertificateSubmit} // Function to handle audit form submission
          onClose={closeCertificateModal} // Function to close the audit modal
        />
        </motion.div>
      )}

      {/* Get Certificate Modal */}
      {isGetCertificateModalOpen && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        >
        <GetCertificateModal
          onSubmit={handleGetCertificateSubmit} // Function to handle audit form submission
          onClose={closeGetCertificateModal} // Function to close the audit modal
        />
        </motion.div>
      )}

      </AnimatePresence>
      <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </header>
    );
  };

  

export default Header;
