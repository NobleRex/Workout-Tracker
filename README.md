# Workout Tracker App

A full-stack web application to track workouts, allowing users to add, view, update, and delete workout records. The app uses React for the front-end and Node.js with Express and MongoDB for the back-end.

## Features

- Add new workouts with fields like title, load (in kg), and repetitions
- View a list of all workouts with their details
- Update or delete existing workouts
- RESTful API to manage workout data
- Proxy integration for smooth client-server communication
- Dark-themed user interface with responsive design

## Tech Stack

- **Frontend**: React, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: CSS

## Prerequisites

- Node.js installed on your machine
- MongoDB (local or cloud-hosted instance like MongoDB Atlas)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd workout-tracker-app
   ```

2. **Install Dependencies**:

   - **Frontend**:
     ```bash
     cd frontend
     npm install
     ```
   - **Backend**:
     ```bash
     cd backend
     npm install
     ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   PORT=4000
   ```

## Running the Application

### Development Mode

1. **Start the Backend**:

   ```bash
   cd backend
   npm run dev
   ```

2. **Start the Frontend**:
   ```bash
   cd frontend
   npm start
   ```
   The React app will run at `http://localhost:3000` and proxy API requests to `http://localhost:4000`.

### Production Build

1. **Build the Frontend**:

   ```bash
   cd frontend
   npm run build
   ```

   This generates a production-ready build in the `build` directory.

2. **Serve the Frontend** (optional):
   Use a static file server like `serve` to host the `build` directory.

## Available Commands

### Backend

- `npm start`: Start server in production mode
- `npm run dev`: Start server in development mode with nodemon

### Frontend

- `npm start`: Start development server
- `npm run build`: Create optimized production build

## API Endpoints

- **GET /api/workouts**: Fetch all workouts
- **GET /api/workouts/:id**: Fetch a single workout by ID
- **POST /api/workouts**: Add a new workout
- **PATCH /api/workouts/:id**: Update an existing workout
- **DELETE /api/workouts/:id**: Delete a workout by ID

## Notes

- Proxy configuration in `frontend/package.json`:
  ```json
  "proxy": "http://localhost:4000"
  ```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
