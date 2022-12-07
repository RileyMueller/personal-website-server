const db = require('./db');

jest.setTimeout(20000);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.seedDatabase());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);


describe('API Testing Suite', () => {

    it('Should retrieve existing rssfeeds', async() => {
        return new Promise(async (resolve) => {
            const response = await request.get('/api/rssfeeds');

            expect(response._body.length == 2);

            resolve();

        });
    })

    it('Should add new rssfeeds', async () => {
        return new Promise(async (resolve) => {
            const response = await request.post("/api/rssfeed").send({
                // Test might fail if royalroad is ever down
                url: "https://www.royalroad.com/fiction/syndication/54068"
            });

            expect(response._body.title).toBe('Modern Patriarch');
            
            resolve();
        });
    });


    it('Should update stored rssfeeds', async () => {
        return new Promise(async (resolve) => {

            // The database has this feed but no items
            const response = await request.put('/api/rssfeed').send({
                url: 'https://www.royalroad.com/fiction/syndication/21322'
            });


            expect(response._body.acknowledged).toBe(true);
            expect(response._body.modifiedCount).toBe(1);
            expect(response._body.matchedCount).toBe(1);

            resolve();
        });
    });

    it('Should delete stored rssfeed', async () => {
        return new Promise(async (resolve) => {

            // The database has this feed but no items
            const response = await request.delete('/api/rssfeed/339012c7d6e728b3a0be2c52');

            // Status is only true if actually deleted an item
            expect(response._body.status).toBe('true');

            resolve();
        });
    });
});