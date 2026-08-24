# Code-Collab

A real-time collaborative code editor that lets multiple people write and edit code together in the same room, live — built with React, CodeMirror, and Socket.IO.

Live Link : https://code-collab-frontend-git-main-ankitajainns-projects.vercel.app/

## Features

- **Real-time collaborative editing** — every keystroke is synced instantly across all connected clients using Socket.IO.
- **Room-based sessions** — create or join a coding room with a unique room ID (powered by `uuid`), and share it with collaborators.
- **Live user presence** — see who else is currently in the room, with avatars via `react-avatar`.
- **Syntax-highlighted editor** — powered by CodeMirror for a fast, familiar code-editing experience.
- **Instant notifications** — join/leave and connection events surfaced with `react-hot-toast`.
- **Client + server in one app** — an Express server handles Socket.IO connections and can also serve the production React build.

## Tech Stack

**Frontend**
- React 18 (bootstrapped with Create React App)
- React Router DOM
- CodeMirror
- Socket.IO Client
- React Avatar
- React Hot Toast

**Backend**
- Node.js + Express
- Socket.IO
- CORS

## Project Structure

```
Code-Collab/
├── public/          # Static assets and HTML template
├── src/             # React application source (components, pages, socket logic)
├── server.js         # Express + Socket.IO server
├── vercel.json        # Deployment configuration
├── package.json
└── .env               # Environment variables (not committed — see below)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ankitajainn/Code-Collab.git
   cd Code-Collab
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables

   Create a `.env` file in the project root and add any required values (e.g. server port, client URL):
   ```
   PORT=5000
   ```

### Running Locally

Run the React frontend in development mode:
```bash
npm run start:front
```
This starts the client at `http://localhost:3000`.

Run the backend server (with auto-restart on changes):
```bash
npm run server:dev
```

### Production Build

Build the React app and start the Express server to serve it:
```bash
npm start
```

This runs `npm run build` followed by `npm run server:prod`, so the Express server serves both the Socket.IO connections and the built frontend from a single process.

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run start:front` | Runs the React app in development mode |
| `npm run server:dev` | Runs the Express server with `nodemon` for auto-reload |
| `npm run server:prod` | Runs the Express server in production mode |
| `npm run build` | Builds the React app for production |
| `npm start` | Builds the app and starts the production server |
| `npm test` | Launches the test runner |

## Deployment

The project includes a `vercel.json` configuration for deployment on [Vercel](https://vercel.com/).

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project currently has no license specified. Consider adding one (e.g. MIT) if you plan to open it up for wider use.
