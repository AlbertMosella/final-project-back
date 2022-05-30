const bcrypt = require("bcrypt");
const User = require("../../database/model/User");
const {
  mockToken,
  mockUserCredentials,
  mockNewUser,
} = require("../../mocks/mocksUsers");
const { registerUser, loginUser } = require("./userControllers");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

jest.mock("../../database/model/User", () => ({
  findOne: jest.fn().mockResolvedValue(() => mockUserCredentials),
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn().mockResolvedValue(() => true),
  hash: jest.fn().mockResolvedValue(() => "mockPasswordEncrypted"),
}));

jest.mock("jsonwebtoken", () => ({
  sign: () => mockToken,
}));

describe("Given userRegister function", () => {
  describe("When it's called with a new username", () => {
    test("Then it should call response method status with 201 and json with a new user", async () => {
      const expectedMessage = { msg: "User created" };

      const req = {
        body: expectedMessage,
      };

      const expectedStatus = 201;

      User.findOne = jest.fn().mockResolvedValue(false);
      User.create = jest.fn().mockResolvedValue(mockNewUser);

      await registerUser(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it's called with an existen username", () => {
    test("Then it should call response with error message 'User already exists'", async () => {
      const req = {
        body: mockNewUser,
      };

      const expectErrorMessage = new Error();
      expectErrorMessage.customMessage = "User already exists";

      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue(true);

      await registerUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectErrorMessage);
    });
  });

  describe("When it's called with a bad request", () => {
    test("Then it should call response with error message 'Bad request'", async () => {
      const newUserBadRequest = {
        name: "Pepe la rana",
        userName: "pepeRana",
        password: "pepeRana",
        Image: "",
      };

      const req = {
        body: newUserBadRequest,
      };

      const expectErrorMessage = new Error("Bad request");

      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue(false);

      await registerUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectErrorMessage);
    });
  });
});

describe("Given userLogin function", () => {
  describe("When it's called with incorrect username", () => {
    test("Then it should call next method with 'Incorrect username or password'", async () => {
      User.findOne = jest.fn().mockResolvedValue(false);

      const req = {
        body: {
          id: 1,
          username: "incorrectUsername",
          password: "password",
        },
      };

      const expectError = new Error();
      expectError.customMessage = "Incorrect username or password";

      const next = jest.fn();

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectError);
    });
  });

  describe("When it's called with incorrect password", () => {
    test("Then it should call next method with 'Incorrect username or password'", async () => {
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const req = {
        body: {
          id: 1,
          username: "username",
          password: "incorrectPassword",
        },
      };

      const expectError = new Error();
      expectError.customMessage = "Incorrect username or password";

      const next = jest.fn();

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectError);
    });
  });
});
