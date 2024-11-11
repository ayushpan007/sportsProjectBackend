const { Server } = require('socket.io');
const byBallSchema = require('../models/byBallModels');

function setupSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: process.env.ALLOWED_ORIGINS || '*',
            methods: ["GET", "POST"],
            credentials: true
        },
        transports: ['websocket', 'polling']
    });

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        socket.onAny((eventName, ...args) => {
            console.log('Received event:', eventName, 'with data:', JSON.stringify(args, null, 2));
        });

        socket.on('updateTarget', async (data) => {
            console.log('UpdateTarget received:', data);

            try {
                console.log('Searching for match:', data.matchId);
                const existingMatch = await byBallSchema.findOne({ match: data.matchId });
                console.log('Existing match:', existingMatch);

                if (!existingMatch) {
                    console.log('Match not found');
                    socket.emit('error', { message: 'Match not found' });
                    return;
                }
                const updatedMatch = await byBallSchema.findOneAndUpdate(
                    { match: data.matchId },
                    { $set: { totalTarget: data.newTarget } },
                    { new: true }
                );

                console.log('Updated match:', updatedMatch);
                const response = {
                    success: true,
                    matchId: updatedMatch.match.toString(),
                    totalTarget: updatedMatch.totalTarget
                };

                console.log('Emitting response to all clients:', response);
                io.emit('targetUpdated', response);

            } catch (error) {
                console.error('Error details:', {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                });

                socket.emit('error', {
                    message: error.message,
                    type: error.name
                });
            }
        });

        socket.on('testDB', async () => {
            try {
                const count = await byBallSchema.countDocuments();
                socket.emit('testDBResult', {
                    success: true,
                    count,
                    message: `Found ${count} documents`
                });
            } catch (error) {
                socket.emit('testDBResult', {
                    success: false,
                    error: error.message
                });
            }
        });

        socket.on('echo', (data) => {
            console.log('Echo received:', data);
            socket.emit('echo', data);
        });
    });

    return io;
}

module.exports = { setupSocket };
