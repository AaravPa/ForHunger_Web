# ForHunger Web

ForHunger is a cross-platform React Native and Expo app that connects people who can donate food with people and organizations requesting it. The main flow lets a user choose Donate or Request, enter food and contact details, and persist the exchange through Firebase.

## Features

- Donation and request flows with multi-screen forms.
- Custom donation and custom request paths.
- Firebase-backed data access for requests, donations, and storage.
- Location search with the Google Places autocomplete API.
- Android, iOS, and web targets through Expo.

## Stack

- Expo 45 and React Native 0.69
- React Navigation stack navigation
- Firebase and React Native Firebase Firestore
- Axios for HTTP requests
- React Native Elements for list and form UI

## Repository layout

- App.js contains navigation, screen components, form state, Firebase reads and writes, and the donation/request flows.
- config.js initializes the Firebase client.
- index.js registers the Expo root component.
- package.json defines the Expo scripts and dependencies.
- food.png and userimage.png are bundled image assets.

## Setup

Use a Node.js version supported by the Expo 45 toolchain, then install dependencies:

~~~bash
npm install
npm start
~~~

The start command opens the Expo development server. The project also defines these scripts:

~~~bash
npm run web
npm run android
npm run ios
~~~

The native scripts require the corresponding Android or iOS development environment. For a quick browser check, use the web target.

## Firebase and Places configuration

The current project initializes Firebase in config.js and calls Google Places autocomplete from App.js. Before deploying or sharing a build, move configuration to environment-specific settings, restrict browser and mobile API keys by app and API, and rotate any credentials that may have been exposed in repository history. Never add service-account credentials or unrestricted secrets to the client bundle.

## Development notes

This project uses an older Expo and React Native dependency set. If a current Node.js or Expo toolchain reports compatibility errors, use a compatible Expo 45 environment or plan a dependency upgrade before changing application code. There are no automated tests in the repository; manually exercise the Donate, Request, search, and Firebase flows on each target you support.

## Status

ForHunger is a project prototype. It is not a hosted service and does not include a production deployment configuration. Review authentication, validation, error handling, and backend access rules before using it with real users or sensitive data.
