# DevTracker!

<p align="center" style="background-color: black">
  <img src="client/src/assets/DevTrackerLogo.png" width="200"/>
</p>
DevTracker is a companion app for software engineers who are active one the job market. It supports them by managing job applications, reminding them about upcoming interviews, and archiving recruitment information. 

• Implemented automated integration and unit tests for all API endpoints and key front-end react components. 
• Performed a major refactor of legacy code following the DRY/SOLID method design pattern resulting in fewer API calls and a cleaner, more readable codebase.
• Refactored legacy code following the DRY/SOLID method design pattern and moved the project to TypeScript resulting in fewer API calls and a cleaner codebase.
• Utilized tools such as Postman and Chrome Dev tools to isolate and debug issues.

• Tech Stack: React, TypeScript,, Recharts, Jest, Cypress, SuperTest, Express, MongoDB.

## Screenshots

<p align="center">
  <img src="" alt="appPhoto" />
</p>

## Getting Started

1. Clone this repo.

    ```bash
    git clone https://github.com/lthemis/DevTracker.git
    ```

2. Install dependencies in both client and server folders.

    ```bash
    npm install
    ```

3. Create .env file in client folder

    ```bash
    REACT_APP_apiKey=
    REACT_APP_authDomain=
    REACT_APP_projectId=
    REACT_APP_storageBucket=
    REACT_APP_messagingSenderId=
    REACT_APP_appId=
    REACT_APP_measurementId=
    ```

4. Create .env file in server folder

    ```bash
    PORT=
    DB_MONGO_HOST=
    ```

5. Install the [Mongo](https://www.mongodb.com/docs/manual/installation/) database on your machine


6. Start the server. From the server folder, run

    ```bash
    npx nodemon ./index.ts
    ```

7. Start the client. From the client folder, run

    ```bash
    npm start
    ```

## Tech Stack

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Mongo](https://www.mongodb.com/)
