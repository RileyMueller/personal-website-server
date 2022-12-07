// Database for testing
const mongoose = require('mongoose');
const seedDatabase = require('./seed');
mongoose.set('strictQuery', false);

const url = 'mongodb://localhost:27017/testing';

module.exports = {
    connect: async () => {
        const mongooseOpts = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        await mongoose.connect(url, mongooseOpts);
    },

    seedDatabase: async () => {
        await seedDatabase();
    },

    clearDatabase: async () => {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    },

    closeDatabase: async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    }
}
