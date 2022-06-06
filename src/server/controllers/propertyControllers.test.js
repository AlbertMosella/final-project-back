const { mockProperty, mockProperties } = require("../../mocks/mockProperties");
const {
  getProperties,
  deleteProperty,
  createProperty,
  editProperty,
} = require("./propertyControllers");

jest.mock("../../database/model/Property", () => ({
  ...jest.requireActual("../../database/model/Property"),
  find: jest.fn().mockResolvedValue(mockProperty),
  findByIdAndDelete: jest.fn().mockResolvedValue(mockProperties),
  create: jest.fn().mockResolvedValue(mockProperty),
  findByIdAndUpdate: jest.fn().mockResolvedValue(mockProperties),
}));

describe("Given a GET properties controller", () => {
  describe("When invoked with a response", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    test("Then it should call the response status method 200", async () => {
      await getProperties(null, res);

      const expectedStatus = 200;

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method with a list of properties", async () => {
      const expectedProperties = mockProperty;

      await getProperties(null, res);

      expect(res.json).toHaveBeenCalledWith(expectedProperties);
    });
  });
});

describe("Given a DELETE deleteProperty controller", () => {
  describe("When invoked when a response and a property with id 1", () => {
    const req = {
      params: {
        idProperty: "6299ef4267d5ef56ab0e6bb7",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should call the response status method with 200", async () => {
      const expectedStatus = 200;

      await deleteProperty(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method a message", () => {
      deleteProperty(req, res);
      const expectedMessage = {
        msg: "The property has been deleted",
      };

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});

describe("Given a POST createProperty controller", () => {
  describe("When invoked whit a response and a property", () => {
    const req = {
      body: mockProperty,
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should call the response status method with 201", async () => {
      const expectedStatus = 201;

      await createProperty(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method a message", () => {
      const expectedRespone = mockProperty;

      createProperty(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedRespone);
    });
  });
});

describe("Given a editProperty controller", () => {
  describe("When invoked whit a response, a property and the property id as request param", () => {
    const req = {
      params: "6298c3c6b8f201e2a9ddc4f3",
      body: mockProperty,
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should call the response status method with a 200", async () => {
      const expectedStatus = 200;

      await editProperty(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method with a property", () => {
      const expectedRespone = mockProperty;

      editProperty(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedRespone);
    });
  });
});
