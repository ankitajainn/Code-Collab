import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 20000,
        transports: ['polling','websocket'],
    };
    console.log(process.env.REACT_APP_BACKEND_URL);
    return io(process.env.REACT_APP_BACKEND_URL, options);
};