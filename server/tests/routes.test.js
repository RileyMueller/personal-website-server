const db = require('./db');

jest.setTimeout(20000);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.seedDatabase());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);


describe('tests run when', () => {
    it('Testing /test', async () => {
        return new Promise(async (resolve) => {
            const response = await request.get("/test");

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("pass!");

            resolve();
        });
    });
    it('Testing /api/save_blogpost', async () => {
        return new Promise(async (resolve) => {
            const response = await request.post("/api/save_blogpost").send({
                title: "Test Title",
                subtitle: "Test Subtitle",
                body: "Test Body"
            });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe("Successfully saved blog post");

            resolve();
        });
    });
    it('Testing /api/get_blogposts', async () => {
        return new Promise(async (resolve) => {
            const response = await request.get("/api/get_blogposts");

            expect(response.status).toBe(200);
            expect(response.body.message.length).toBe(1);

            resolve();
        });
    });
    it('Testing /api/save_rss_feed', async () => {
        return new Promise(async (resolve) => {
            const response = await request.post("/api/save_rss_feed").send({
                url: "https://www.royalroad.com/fiction/syndication/21322"
            });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe("Successfully saved RSS feed");

            resolve();
        });
    });
    it('Testing /api/get_rss_feeds', async () => {
        return new Promise(async (resolve) => {
            const response = await request.get("/api/get_rss_feeds");

            expect(response.status).toBe(200);
            expect(response.body.message.length).toBe(1);

            resolve();
        });
    });
});