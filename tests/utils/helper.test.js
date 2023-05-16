
const fetchdata = require('../../db/fetchdata');
const { getVehicleState } = require('../../utils/helper')

jest.mock('fetchdata');
describe("Test different requests and responses for vehicle state", () => {

    beforeEach(() => {
        jest.resetModules();
    })
    it("should return success response", async () => {
        fetchdata.getVehicleStateFromDB.mockResolvedValueOnce({
            "id": 123,
            "state": "selling"
        })
        let input = {
            body: {
                "id": 123,
                "timestamp": "2022-09-11T23:21:38.000Z"
            }
        }
        const resp = await getVehicleState(input)
        expect(resp).toEqual(
            {
                statusCode: 200,
                body: {
                    status: "Success",
                    data: {
                        "id": 123,
                        "state": "selling"
                    }
                }
            }
        );
    });
    it("should return missing data message for missing input", async () => {
          let input = {
            body: {
                "id": 123,
            }
        }
        const resp = await getVehicleState(input)
        expect(resp).toEqual(
            {
                statusCode: 400,
                body: {
                    status: "Fail",
                    message: "Missing data in the request. Vehicle id and timestamp required"
                }
            }
        );
    });
    it("should return no data message for unavailable data in db", async () => {
        fetchdata.getVehicleStateFromDB.mockResolvedValueOnce("");
        let input = {
          body: {
              "id": 987,
              "timestamp": "2022-09-11T23:21:38.000Z"
          }
      }
      const resp = await getVehicleState(input)
      expect(resp).toEqual(
          {
              statusCode: 400,
              body: {
                  status: "Fail",
                  message: "No data found. Please check the input"
              }
          }
      );
  });
  it("should return error message in case of error", async () => {
    fetchdata.getVehicleStateFromDB.mockRejectedValue(new Error("Integer expected"));
    let input = {
      body: {
          "id": "xyz",
          "timestamp": "2022-09-11T23:21:38.000Z"
      }
  }
  const resp = await getVehicleState(input)
  expect(resp).toEqual(
      {
          statusCode: 500,
          body: {
              status: "Fail",
              message: "Integer expected"
          }
      }
  );
});


});