# OpenD - OpenSea Clone

OpenD is a project aimed at replicating the functionality and user interface of OpenSea, a leading decentralized marketplace for non-fungible tokens (NFTs). Built using modern web technologies and Ethereum smart contracts, OpenD offers users a familiar interface for trading, discovering, and interacting with NFTs.

<div align="center">
  <img src="https://github.com/Hariram-6674/DSurv-for-trading-tokens/raw/main/demo1.gif" alt="DSurv">
  <img src="https://github.com/Hariram-6674/DSurv-for-trading-tokens/raw/main/demo2.gif" alt="DSurv">
  <img src="https://github.com/Hariram-6674/DSurv-for-trading-tokens/raw/main/demo3.gif" alt="DSurv">
  <img src="https://github.com/Hariram-6674/DSurv-for-trading-tokens/raw/main/demo4.gif" alt="DSurv">
  <img src="https://github.com/Hariram-6674/DSurv-for-trading-tokens/raw/main/demo5.gif" alt="DSurv">
</div> 

## About the App

OpenD allows users to:

Browse and discover NFTs listed on the platform.
Buy and sell NFTs using Ethereum smart contracts.
Manage their NFT collections with ease.

## Deployment Instructions

To deploy the Keeper App on your local environment using DFINITY and React, follow these steps:

1. **Install DFINITY SDK:**
   ```bash
   DFX_VERSION=0.8.4 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
   ```

2. **Start DFINITY Local Node:**
   ```bash
   dfx start --clean
   ```

3. **Deploy the App:**
   Open a new terminal window and execute the following command:
   ```bash
   dfx deploy
   ```

4. **Start the React Development Server:**
   ```bash
   npm start
   ```

5. **Access the App:**
   After starting the development server, navigate to the following URL in your web browser:
   ```
   http://127.0.0.1:8000/?canisterId=<id>
   ```
   Replace with the Canister ID of `dkeeper_assets`.

## Environment Requirements

- Linux or WSL environment.
- Node.js and npm installed.
- DFINITY SDK version 0.8.4(for me it was stable).
