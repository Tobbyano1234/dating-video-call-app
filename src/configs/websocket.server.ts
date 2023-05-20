import { Server } from 'socket.io';

export const createWebSocketServer = (httpServer) => {
    const io = new Server(httpServer, { cors: { origin: '*' } });

    io.on('connection', (socket) => {
        // Handle the video call event
        socket.on('call', (data) => {
            socket.broadcast.emit('call', data);
        });

        // Handle the answer event
        socket.on('answer', (response) => {
            socket.broadcast.emit('answer', response);
        });
    });

    return io;
};
