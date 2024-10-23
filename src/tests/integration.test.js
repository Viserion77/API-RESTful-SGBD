import server from '../index.js';

beforeAll(async () => {
  await new Promise((resolve) => setTimeout(resolve, 700));
});

describe('Integration test', () => {
  it('Deve retornar 200 ao acessar a rota /api/movies', async () => {

    const response = await fetch('http://localhost:3000/api/v1/producers/interval-awards');
    expect(response.status).toBe(200);
  });

  it('Deve retornar o json com os filmes ao acessar a rota /api/movies', async () => {
    const response = await (await fetch('http://localhost:3000/api/v1/producers/interval-awards')).json();

    expect(response).toEqual({
      "min": [
        { "producer": "Bo Derek", "interval": 6, "previousWin": 1984, "followingWin": 1990 },
        { "producer": "Buzz Feitshans", "interval": 9, "previousWin": 1985, "followingWin": 1994 },
        { "producer": "Joel Silver", "interval": 1, "previousWin": 1990, "followingWin": 1991 }
      ],
      "max": [
        { "producer": "Bo Derek", "interval": 6, "previousWin": 1984, "followingWin": 1990 },
        { "producer": "Buzz Feitshans", "interval": 9, "previousWin": 1985, "followingWin": 1994 },
        { "producer": "Joel Silver", "interval": 1, "previousWin": 1990, "followingWin": 1991 }
      ]
    });
  });
});

afterAll(() => {
  server.close();
});