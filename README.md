# Instagram Clone

This is a simple Instagram clone project that aims to replicate some basic features of Instagram using modern web technologies. The project includes frontend components and Firebase integration for authentication and data storage.

## Installation and Usage

### Prerequisites
Make sure you have the following tools installed on your machine:
- Node.js
- npm (Node Package Manager)

### Installation
1. Clone this repository: `git clone <repository-url>`
2. Change to the project directory: `cd instagram_clone`
3. Install the dependencies: `npm install`

### Configuration
To use Firebase services, you need to set up a Firebase project and obtain the configuration details. Follow the steps below:

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Obtain the Firebase configuration details (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId) for your project.
3. Open the `index.js` file in the project and replace the placeholder values in the `firebaseConfig` object with your Firebase configuration details.

### Starting the Application
To start the application, run the following command: `npm run dev`

This will start the development server. Open your browser and visit `http://localhost:3000` to view the Instagram clone.

## Project Structure

The project structure is as follows:

- `components/`: Contains reusable React components used in the application.
  - `Header.tsx`: Renders the header component.
  - `Feed.tsx`: Renders the feed component.
  - `Modal.tsx`: Renders the modal component.
  - `MiniProfile.tsx`: Renders the mini profile component.
  - `Post.tsx`: Renders a post component.
  - `Posts.tsx`: Renders the posts component.
  - `Stories.tsx`: Renders the stories component.
  - `Story.tsx`: Renders a story component.
  - `Suggestions.tsx`: Renders the suggestions component.
- `pages/`: Contains the pages of the application.
  - `index.tsx`: The main page that renders the Instagram clone UI.
- `public/`: Contains static assets used in the application, such as the favicon.
- `styles/`: Contains CSS styles for the application.
- `index.js`: Initializes the Firebase app and exports the app, database, and storage objects.
- `auth/`: Contains the authentication configuration using NextAuth.
  - `signin.tsx`: Custom sign-in page.

## Firebase Configuration

The project uses Firebase for authentication and data storage. To configure Firebase, follow these steps:

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Obtain the Firebase configuration details (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId) for your project.
3. Open the `index.js` file and replace the placeholder values in the `firebaseConfig` object with your Firebase configuration details.

## NextAuth Authentication

The project uses NextAuth for authentication with the Google provider. To set up authentication, follow these steps:

1. Set the environment variables `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` with valid values for your Google OAuth credentials.
2. Customize the authentication providers and pages in the `authOptions` object in the `auth/index.ts` file.

## Additional Notes

- This project requires Node.js and npm to be installed on your machine.
- Make sure to configure the Firebase and authentication settings before running the application.
- Explore the different components in the `components/` directory to understand the UI and functionality of the Instagram clone.
- Customize and extend the project according to your needs and preferences.
