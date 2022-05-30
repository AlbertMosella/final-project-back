const User = require("../../database/model/User");
const {
  mockToken,
  mockUserCredentials,
  mockNewUser,
} = require("../../mocks/mocksUsers");
const registerUser = require("./userControllers");

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
      // Arrange
      const expectedMessage = { msg: "User created" };

      const req = {
        body: expectedMessage,
      };

      const expectedStatus = 201;

      User.findOne = jest.fn().mockResolvedValue(false);
      User.create = jest.fn().mockResolvedValue(mockNewUser);

      // Act
      await registerUser(req, res, null);

      // Assert
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it's called with an existen username", () => {
    test("Then it should call response with error message 'User already exists'", async () => {
      // Arrange
      const req = {
        body: mockNewUser,
      };

      const expectErrorMessage = new Error();
      expectErrorMessage.customMessage = "User already exists";

      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue(true);

      // Act
      await registerUser(req, null, next);

      // Assert
      expect(next).toHaveBeenCalledWith(expectErrorMessage);
    });
  });

  describe("When it's called with a bad request", () => {
    test("Then it should call response with error message 'Bad request'", async () => {
      // Arrange
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

      // Act
      await registerUser(req, null, next);

      // Assert
      expect(next).toHaveBeenCalledWith(expectErrorMessage);
    });
  });
});
