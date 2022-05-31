require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("..");
const connectDB = require("../../database");
const User = require("../../database/model/User");

let users;

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  users = [
    {
      username: "Pepito",
      password: "admin",
      name: "Pep que apunta con el Dedo",
    },
    {
      username: "Iñigo",
      password: "1234",
      name: "Iñigo Montoya",
    },
  ];

  await User.create(users[0]);
  await User.create(users[1]);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a POST to the users/login endpoint", () => {
  describe("When invoked with a routing request with a valid user", () => {
    test("Then it should respond the res.status 200 with a token", async () => {
      const testUser = {
        username: "Albert",
        password: "9876",
        name: "Albert",
      };
      await request(app).post("/users/register").send(testUser).expect(201);

      const { token } = await request(app)
        .post("/users/login")
        .send({ username: testUser.username, password: testUser.password })
        .expect(200);

      expect(token).not.toBeNull();
    });
  });
});
