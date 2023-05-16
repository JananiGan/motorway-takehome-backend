const { Pool } = require('pg');
const { getVehicleStateFromDB } = require('../../db/fetchdata');

jest.mock('pg', () => {
  const clientPool = {
    connect: function () {
      return { query: jest.fn() };
    },
    query: jest.fn(),
    end: jest.fn(),
    on: jest.fn(),
  };
  return { Pool: jest.fn(() => clientPool) };
});

describe("Test fetch of vehicles and logs data from database", () => {
    let pool;

    beforeEach(() => {
         pool=new Pool();
    })

    it("should return the results successfully", async () => {
        pool.query.mockResolvedValueOnce({
            rows: [{
                "id": 123,
                "state": "selling"
            }]
        })
        const resp = await getVehicleStateFromDB(123, "2022-09-11T23:21:38.000Z")


        expect(resp).toEqual(
            {
                "id": 123,
                "state": "selling"
            },
        );
    });
    it("should throw error", async () => {
        pool.query.mockRejectedValue(new Error("Invalid input"))
        try{
            await getVehicleStateFromDB("xyz", "2022-09-11T23:21:38.000Z")
        }catch(err){
            expect(err.message).toEqual("Invalid input")
        }
    });
    it("should return empty response or results", async () => {
        pool.query.mockResolvedValueOnce({})
        const response=await getVehicleStateFromDB("9", "2022-09-11T23:21:38.000Z");
        expect(response).toEqual({});
    });
});