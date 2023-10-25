const connection = require('../config/connection');
const { User } = require('../models');
const { userData } = require('./data')

connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

connection.once('open', async () => {
    console.log('connected');
    try {
        // Check if the 'users' and 'thoughts' collections exist and drop them if they do
        let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
        if (userCheck.length) {
            await connection.dropCollection('users');
        }

        let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
        if (thoughtCheck.length) {
            await connection.dropCollection('thoughts');
        }

        // Seed the 'users' collection
        await User.insertMany(userData);
        console.log('Seeded users');

        // // Seed the 'thoughts' collection
        // await Thought.insertMany(thoughtData);
        // console.log('Seeded thoughts');

    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        // Close the MongoDB connection when seeding is complete
        connection.close();
    }
});