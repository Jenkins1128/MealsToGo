# MealsToGo
**Developed by Isaiah Jenkins**

## Overview
**MealsToGo** is a full-stack React Native application that allows users to discover local restaurants and complete secure transactions. By leveraging Google Maps services for location data and Stripe for payment processing, the app provides a production-ready food service experience.

## Key Features
* **Location-Based Search**: Search for food places using **Google Cloud Places** and **Geocoding APIs**.
* **Interactive Map Integration**: Dynamic map view powered by **React Native Maps**.
* **Secure Authentication**: User onboarding and login implemented with **Firebase Auth**.
* **Integrated Checkout Flow**: Seamless purchasing experience utilizing the **Stripe API**.
* **Modern UI/UX**: Responsive design with **Styled Components**, **React Native Paper**, and **Lottie animations**.

---

## Configuration & Setup

### 1. Google Cloud Platform (Maps & Geocoding)
To enable location services, you must create an API key in the [Google Cloud Console](https://console.cloud.google.com/):
1.  **Create Project**: Select or create a new project.
2.  **Enable APIs**: Navigate to **APIs & Services > Library** and enable:
    * **Places API**
    * **Geocoding API**
3.  **Create Key**: Go to **APIs & Services > Credentials**, click **+ Create Credentials**, and select **API Key**.
4.  **Security**: Click **Restrict Key**. Under "API restrictions," select the two APIs listed above to prevent unauthorized use.

### 2. Stripe Payments
To handle transactions, obtain your keys from the [Stripe Dashboard](https://dashboard.stripe.com/):
1.  **API Keys**: Navigate to **Developers > API keys**.
2.  **Publishable Key**: Copy the key starting with `pk_test_` for your frontend `.env` file.
3.  **Secret Key**: Click **Reveal test key** (starts with `sk_test_`) and copy it for use in your Firebase backend. *Keep this private.*

### 3. Firebase Functions Setup
The backend logic resides in the `functions` folder. Follow these steps to initialize and install:
1.  **Install CLI**: Run `npm install -g firebase-tools`.
2.  **Login & Init**:
    ```bash
    firebase login
    firebase init functions
    ```
3.  **Select Project**: Choose your existing Firebase project when prompted.
4.  **Install Dependencies**:
    ```bash
    cd functions
    yarn install
    ```
    *This installs the necessary packages like `firebase-functions`, `firebase-admin`, and `stripe` locally in the functions folder*.

### 4. Secrets Manager (Cloud Secret Manager)
To securely store your sensitive keys in the cloud without hardcoding them, use the Firebase Secrets Manager:
1.  **Set Google Key**:
    ```bash
    firebase functions:secrets:set GOOGLE_KEY
    ```
    *Paste your Google Cloud API key when prompted.*
2.  **Set Stripe Secret Key**:
    ```bash
    firebase functions:secrets:set STRIPE_KEY
    ```
    *Paste your Stripe Secret Key (`sk_test_...`) when prompted.*

---

## Getting Started

### Installation
1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/your-username/MealsToGo.git](https://github.com/your-username/MealsToGo.git)
    ```
2.  **Frontend Setup**:
    Create a `.env` file in the root directory:
    ```env
    STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    ```
3.  **Backend Deployment**:
    ```bash
    firebase deploy --only functions
    ```
4.  **Run the app**:
    ```bash
    yarn start
    ```
