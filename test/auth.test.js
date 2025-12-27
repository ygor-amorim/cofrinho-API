const request = require('supertest');
const app = require('../src/app');

beforeAll(async () => {
	await app.db.seed.run();
});

describe('Auth Routes', () => {

	describe('POST /auth/signup', () => {
    
		test('should create a new user', async () => {
			const res = await request(app)
				.post('/auth/signup')
				.send({
					name: 'Test User',
					email: `test${Date.now()}@test.com`,
					password: '123456'
				});

			expect(res.status).toBe(201);
			expect(res.body).toHaveProperty('name', 'Test User');
			expect(res.body).toHaveProperty('email');
			expect(res.body).not.toHaveProperty('password');
		});

		test('should fail to create user due to missing E-mail', async () => {
			const res = await request(app)
				.post('/auth/signup')
				.send({
					name: 'Test User',
					email: '',
					password: '123456'
				});
			expect(res.status).toBe(400);
			expect(res.body).not.toHaveProperty('email');
			expect(res.body).toHaveProperty('error');
		});

		test('should fail to create user due to missing Username', async () => {
			const res = await request(app)
				.post('/auth/signup')
				.send({
					name: '',
					email: `test${Date.now()}@test.com`,
					password: '123456'
				});
			expect(res.status).toBe(400);
			expect(res.body).not.toHaveProperty('name');
			expect(res.body).toHaveProperty('error');
		});

		test('should fail to create user due to missing Password', async () => {
			const res = await request(app)
				.post('/auth/signup')
				.send({
					name: 'Test User',
					email: `test${Date.now()}@test.com`,
					password: ''
				});
			expect(res.status).toBe(400);
			expect(res.body).toHaveProperty('error');
		});

        test('should fail to create user due to existing E-mail', async () => {
            const res = await request(app)
                .post('/auth/signup')
                .send({
                    name: 'Test User',
                    email: 'user1@test.com',
                    password: '123456'
                });
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('error');
        });

	});

    describe('POST /auth/signin', () => {
        test('should log in succesfully', async () => {
            const res = await request(app)
                .post('/auth/signin')
                .send({
                    email: 'user1@test.com',
                    password: '123456'
                });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
        });

        test('should fail log in succesfully - wrong e-mail', async () => {
            const res = await request(app)
                .post('/auth/signin')
                .send({
                    email: 'yuser3@test.com',
                    password: '123456'
                });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('error');
        });

        test('should fail to log in - wrong password', async () => {
            const res = await request(app)
                .post('/auth/signin')
                .send({
                    email: 'user1@test.com',
                    password: '1234567'
                });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('error');
        });

        test('should fail to log in - missing e-mail', async () => {
            const res = await request(app)
                .post('/auth/signin')
                .send({
                    email: '',
                    password: '1234567'
                });
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('error');
        });

        test('should fail to log in - missing password', async () => {
            const res = await request(app)
                .post('/auth/signin')
                .send({
                    email: 'user1@test.com',
                    password: ''
                });
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('error');
        });

    });
});

