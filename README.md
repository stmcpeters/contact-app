# Contact App

## Overview
The Contact App is an easy-to-use web application that acts as a virtual address book to view, store, update, and delete contacts. This project was created for week 11's Techtonica program assignment. The system uses a React frontend and a Node.js backend to create an interactive UI.

## Screenshot
![Contact App](client/screenshot.png)

## Features
- View a list of contacts
- Add new contact
- Edit an existing contact
- Delete a contact
- View additional details for a contact
- Responsive design built with React
- Real-time data synchronization between frontend and backend

## Technologies
### Frontend
- React: JavaScript library for building responsive user interfaces
- React Bootstrap: Styling and layout of the app
- Fetch API: Makes HTTP requests to the backend <br>
### Backend
- Express.js: A Node.js framework for setting up the server and handling HTTP requests
- Node.js: JavaScript environment used to run the Express server
- Cors: Middleware to handle Cross-Origin Resource Sharing
- Dotenv: Hides sensitive environment variables
- PostgreSQL: Database management system

## Installation
### Pre Requisites 
- Node.js (which includes npm): [Download Node.js](https://nodejs.org/en/download/package-manager)
- Git (for cloning the repository): [Download Git](https://git-scm.com/downloads)

1. Clone the repo <br>
`git clone https://github.com/stmcpeters/contact-app`<br>
`cd contact-app` 
2. Set up the backend
- Navigate to the `server` folder
- Install backend dependencies: `npm install`
- Create a `.env` file in the server directory and add your environment variables (see `.env-sample` for example)
- Import and configure `dotenv` in your `server.js` file: <br>
`import dotenv from 'dotenv';` <br>
`dotenv.config();` <br>
3. There are two ways to restore the DB dump file the project already contains: 

A- If you have postgres set up postgres with an User:  
 * just run the command `psql -U postgres -f db.sql`. Make sure that you have your Postgres password on hand. The psql console will ask for your password. 

B- If your initial configuration of postgres doesn't require a User:
* just run the command `psql -f db.sql`

7. Inside your server folder, open the file `.env.example` and copy the correct option for your configuation found there to your new .env file. 

Here is what your `.env` might look like:

```
DB_URI="postgresql://localhost/contacts"
``` 
For this template, the name of your db should be `address-book`.

⚠️ If you don't see a `address-book` db, you can create one. From the terminal, navigate to the psql command line with `psql` and type `create database address-book;` - don't forget the semicolon!! ⚠️

- Start the server using: `npm start`

4. Set up the frontend:
- Navigate to the `client` folder
- Install dependencies: `npm install`
- Start the React development server using `npm run dev`

## API Endpoints
- GET `/api/contacts`: Fetches all contacts and details (joined table)
- GET `/api/details`: Fetches all from details table
- POST `/api/contacts`: Creates a new contact
- POST `/api/details`: Creates a new row in details table
- DELETE `/api/contacts/:id`: Deletes a contact and details
- PUT `/api/contacts/:id`: Updates a contact and details

## Stretch Goals/Help Wanted
- Search bar/filter contacts
- Add photos to contact
- Implement testing for frontend and backend components

## Contributing
Contributions are welcomed to this project! If you have an idea for a new feature or a bug fix, please open an issue or a pull request.

## License
This project is licensed under the MIT License.