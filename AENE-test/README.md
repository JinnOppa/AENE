# Healthcare Management System Using Blockchain

This project was developed for the DevMatch Hackathon, focusing on secure and efficient patient record management utilizing blockchain technology. Built using MasChain and Node.js, the system leverages smart contracts, certificates, audit trails, and user wallet management to ensure the integrity and confidentiality of patient data.

## Features

- **User Wallet Management**: Securely create and manage user wallets through the MasChain portal.
- **Certificate Creation**: Generate certificates for various healthcare processes.
- **Patient Record Management**: Create and manage patient records using smart contracts, ensuring data integrity and security.
- **Audit Trails**: Maintain a transparent and immutable audit trail for all actions performed on the blockchain.

## Technology Stack

- **Blockchain Platform**: MasChain
- **Backend**: Node.js
- **Smart Contracts**: Utilized for patient record management and certification processes.
- **MasChain Portal**: Used for managing user wallets and integrating blockchain features.

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/healthcare-blockchain.git
   cd healthcare-blockchain
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Set up your environment variables in a `.env` file. Ensure to include details for connecting to MasChain and any other required configuration.

4. **Run the application:**
   ```bash
   npm start
   ```

## How It Works

1. **Creating User Wallet**: Users can create and manage wallets using the MasChain portal, which is then integrated into the system for secure transactions.

2. **Creating Certificates**: The system allows the creation of certificates related to healthcare processes, ensuring they are stored securely on the blockchain.

3. **Patient Record Management**: Patient records are stored using smart contracts, providing an immutable and secure method of data storage. Each interaction is logged in the blockchain, ensuring transparency.

4. **Audit Trails**: Every action taken within the system is recorded on the blockchain, providing a complete audit trail for all transactions and modifications.
