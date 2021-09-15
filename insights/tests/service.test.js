const app = require("../index");
const supertest = require("supertest");

describe("Testing end points", () => {
  test("POST /events", async () => {
    await supertest(app)
      .post("/events")
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("ok");
      });
  });
});
