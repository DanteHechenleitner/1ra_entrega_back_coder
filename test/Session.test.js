import chai from 'chai';
import supertest from 'supertest';

const { expect } = chai;
const api = supertest('http://localhost:8080'); // Cambia la URL según corresponda

describe('API Tests', () => {
  describe('POST /register', () => {
    it('Debe registrar un nuevo usuario', async () => {
      const newUser = {
        first_name: 'Jose',
        last_name: 'Perez',
        email: `pp${Date.now()}@email.com`,
        edad: 30,
        password: '123',
      };

      const response = await api.post('/register').send(newUser);
      console.log(response.body);
    });
  });
});