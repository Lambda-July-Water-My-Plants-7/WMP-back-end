const server = require('../api/server');
const request = require('supertest');

describe("yipyip", () => {
    it("Should return Yip yip, Appa", async () => {
        const res = await request(server).get('/')
        expect(res.body).toMatchObject({ message: "Yip, yip, Appa!"} );    
    })
})