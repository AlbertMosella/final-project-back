const { mockProperty } = require("../../mocks/mockProperties");
const { getProperties } = require("./propertyControllers");

jest.mock("../../database/model/Property", () => ({
  ...jest.requireActual("../../database/model/Property"),
  find: jest.fn().mockResolvedValue(mockProperty),
}));

describe("Given the GET properties controller", () => {
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
