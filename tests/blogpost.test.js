const db = require('./testdb');

jest.setTimeout(5000);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.seedDatabase());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);


describe('Blogpost testing', () => {


    it('Should retrieve all blogposts', async () => {
        return new Promise(async (resolve)=>{
            const res = await request.get('/api/getblogposts');

            expect(res._body.length).toBeGreaterThan(0);

            resolve();
        });
    })

    it('Can retrieve based on tags', async () => {
        return new Promise(async (resolve)=>{
            const filter = {tags: ['testtag1']}
            const res = await request.get('/api/getblogposts').query('filter',filter);

            expect(res._body.length).toBeGreaterThan(1);

            resolve();
        });
    })

    
    it('Should create new blogpost', async () => {
        return new Promise(async (resolve)=>{
            const res = await request.post('/api/createblogpost').send({
                title: 'Test Post',
                subtitle: 'Test subtitle',
                body: 'test body',
                date: '1999-1-1',
                public: false,
                tags: ['test_tag1, test_tag2']
            });


            expect(res._body._id).not.toBe(null);

            resolve();
        });
    })

    
});

