const request = require('supertest');
const app = require('../src/app');

let token;

beforeAll(async () => {
    await app.db.seed.run();

    // Get token for authenticated requests
    const res = await request(app)
        .post('/auth/signin')
        .send({ email: 'user1@test.com', password: '123456'});
    token = res.body.token;
});

    // Test listing all accounts from an user

    describe('GET /accounts', () => {
        
        test('should list all accounts for authenticated user', async () => {
            const res = await request(app)
                .get('/accounts')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBe(2);
        });
        
        test('should deny access for unauthenticated user', async () => {
            const res = await request(app)
                .get('/accounts');

            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('error');
        });

        test('should deny access for invalid token', async () => {
            const res = await request(app)
                .get('/accounts')
                .set('Authorization', `Bearer invalid-token`);

            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('error');
        })
    })

    // TO-DO Next Session.
    // Test creation of accounts

    // describe('POST /accounts', () => {

    //     test('should create a new account', async () => {
    //         // POST to /accounts with { name: 'New Account'}
    //         // Expect 201, body has id and name



    //     });

    //     test('should fail to create account without name', async () => {
    //         // POST with { name: '' }
    //         // Expect 400
    //     });

    // });
