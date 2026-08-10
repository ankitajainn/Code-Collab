const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
// const ACTIONS = require('./src/Actions');


// Define actions directly inside server.js to avoid module path resolution errors
const ACTIONS = {
    JOIN: 'join',
    JOINED: 'joined',
    DISCONNECTED: 'disconnected',
    CODE_CHANGE: 'code-change',
    SYNC_CODE: 'sync-code',
    LEAVE: 'leave',
};

const server = http.createServer(app);
const io = new Server(server);


//addin these for deployment safety
const allowedOrigins = [
    'http://localhost:3000',
    /\.vercel\.app$/ // Matches any Vercel deployment URL
];

// Configure Express CORS
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
}));

// Configure Socket.IO CORS
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST'],
        credentials: true,
    },
});
//till here

app.use(express.static('build'));
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const userSocketMap = {};
function getAllConnectedClients(roomId) {
    // Map datatype h js k andr usko aRRy bnane kr liye from array use krenge
     
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}

io.on('connection', (socket) => {
    console.log('socket connected with socket id ', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));


// const express = require('express');
// const app = express();
// const http = require('http');
// // const path = require('path');
// const {Server}=require('socket.io');

// const server = http.createServer(app);
// const io= new Server(server);

// const userSocketMap = {};

// function getAllConnectedClients(roomId) {
// //     // Map datatype h js k andr usko aRRy bnane kr liye from array use krenge
     
//     return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
//         (socketId) => {
//             return {
//                 socketId,
//                 username: userSocketMap[socketId],
//             };
//         }
//     );
// }
// io.on('connection',(socket)=>{
//     console.log('socket connected',socket.id);
//         socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
//         userSocketMap[socket.id] = username;
//         socket.join(roomId);
//         const clients = getAllConnectedClients(roomId);
//         clients.forEach(({ socketId }) => {
//             io.to(socketId).emit(ACTIONS.JOINED, {
//                 clients,
//                 username,
//                 socketId: socket.id,
//             });
//         });
//     });

// //     socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
// //         socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
// //     });

// //     socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
// //         io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
// //     });

// //     socket.on('disconnecting', () => {
// //         const rooms = [...socket.rooms];
// //         rooms.forEach((roomId) => {
// //             socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
// //                 socketId: socket.id,
// //                 username: userSocketMap[socket.id],
// //             });
// //         });
// //         delete userSocketMap[socket.id];
// //         socket.leave();
// //     });
// // });

// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT,()=>console.log(`Listening on port ${PORT}`));