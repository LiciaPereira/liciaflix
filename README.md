# Liciaflix

A Netflix-inspired streaming app built with React, Firebase, Redux, and Stripe. It includes authentication, protected app screens, profile UI, plan selection, and movie category rows powered by API requests.

Live site: https://licia-flix.web.app/

## Why This Project Matters

This project demonstrates common production app patterns: authentication, client-side routing, global user state, external API requests, payment/subscription flow structure, and responsive UI.

## Tech Stack

- React
- JavaScript
- Firebase Authentication
- Firestore
- Redux Toolkit
- Stripe
- Axios
- CSS

## Features

- User sign up and sign in with Firebase Authentication.
- Protected home and profile screens.
- Global user state with Redux Toolkit.
- Movie rows and banner content loaded through API requests.
- Profile and plan selection UI.
- Stripe integration structure for subscription handling.
- Responsive layout for desktop and mobile screens.

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_web_api_key
```

Start the app:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm start
npm run build
npm test
```

## Development Notes

The strongest parts of this project are the authentication flow, route structure, global user state, Firebase integration, and subscription UI. The app is a portfolio project and does not provide real streaming content.
