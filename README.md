# 🌌 Web3 Learn & Earn Platform

![Stellar](https://img.shields.io/badge/Blockchain-Stellar-purple)
![Next.js](https://img.shields.io/badge/Frontend-Next.js-black)
![License](https://img.shields.io/badge/License-MIT-green)

**Web3 Learn & Earn** is an interactive educational dApp built on the **Stellar Blockchain**. It gamifies the crypto learning process by allowing users to take a personality quiz, receive an investor profile analysis, and earn **10 XLM (Testnet)** rewards instantly via a smart contract interaction.

## 🚀 Features

-   **🔗 Wallet Integration:** Secure login using **Freighter Wallet** (Non-custodial).
-   **🧠 Interactive Quiz:** 15 questions to determine your crypto persona (e.g., Whale, Trader, Newbie).
-   **📊 Smart Analysis:** Automatic categorization of user profiles based on quiz scores.
-   **💰 Learn-to-Earn:** Users who complete the test receive **10 XLM** on the Stellar Testnet immediately.
-   **📜 History Log:** Saves past test results and scores using local storage.
-   **⚡ Fast & Low Cost:** Powered by the Stellar Network for lightning-fast transactions.

## 🛠️ Tech Stack

-   **Frontend:** Next.js (React), JavaScript
-   **Blockchain SDK:** `@stellar/stellar-sdk`
-   **Wallet Provider:** `@stellar/freighter-api`
-   **Styling:** CSS-in-JS (Custom Dark Mode UI)
-   **Deployment:** VPS / Netlify

## 📦 Installation & Setup

Follow these steps to run the project locally.

### 1. Prerequisites
-   Node.js (v18 or higher)
-   [Freighter Wallet Extension](https://www.freighter.app/) installed in your browser.
-   Stellar Testnet account (created automatically via Freighter).

### 2. Clone the Repository
```bash
git clone [https://github.com/Haticenursari256/web3-projem.git](https://github.com/Haticenursari256/web3-projem.git)
cd web3-projem

3. Install Dependencies
npm install

4. Run the Development Server
npm run dev
# If you are running on a VPS or remote server, use:
npm run dev -- --host

Open http://localhost:3000 (or your server IP:3000) with your browser to see the result.

🎮 How to Use
1. Connect Wallet: Click the "Connect Wallet" button on the home screen. Approve the Freighter popup.

2. Start Quiz: Answer the 15 questions about crypto terms, security, and market psychology.

3. Get Results: View your score and persona (e.g., "Crypto Whale").

4. Claim Reward: Click the "Claim 10 XLM" button.

5. Verify: Click the generated transaction link (TX Hash) to see your reward on the Stellar Explorer.

📂 Project Structure
├── app/
│   ├── page.js        # Main application logic (Quiz, Wallet, Logic)
│   ├── layout.js      # Root layout
│   └── error.js       # Error handling
├── public/            # Static assets
├── package.json       # Project dependencies
└── README.md          # Project documentation
🔮 Roadmap
[ ] NFT Certificates: Minting soulbound tokens for passing the quiz.

[ ] Mainnet Launch: Real token rewards with sponsor partnerships.

[ ] Leaderboard: Ranking users based on knowledge score.

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project

2. Create your Feature Branch (git checkout -b feature/AmazingFeature)

3.Commit your changes (git commit -m 'Add some AmazingFeature')

4. Push to the Branch (git push origin feature/AmazingFeature)

5. Open a Pull Request

TEAM
TEAM NAME: PROCYON
Hatice Nur Sarı- haticenursari4@gmail.com
Rumeysa Ak- rumeysaak933@gmail.com



