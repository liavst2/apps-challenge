
import "jest";
import { appServer } from "../main";
import * as Mocks from "./query.mocks";
import axios from "axios";


describe("Apps server tests", () => {
  
  const queryRequest = (query: string) => ({
    method: "get",
    url: `http://localhost:9898/apps/items?${query}`,
    validateStatus: _ => true
  })

  beforeAll(() => {
    if (!appServer.listening) {
      appServer.listen();
    }
  });

  afterAll(() => {
    if (appServer.listening) {
      appServer.close();
    }
  });

  test('Testing for filters existance', async () => {
    const filters = await axios.get("http://localhost:9898/apps/filter-info")
    expect(filters.data).toBeDefined();
    Object.keys(filters.data).forEach(key => {
      expect(filters.data[key]).not.toHaveLength(0);
    })
  })

  test('Testing for empty query', async () => {
    const query = new URLSearchParams(Mocks.emptyQuery).toString();
    const res = await axios(queryRequest(query));
    expect(res.status).toEqual(400);
  })

  test('Testing for missing query fields', async () => {
    const queryWithoutYear = new URLSearchParams(Mocks.missingQuery1).toString();
    const queryWithoutCategories = new URLSearchParams(Mocks.missingQuery2).toString();
    const queryWithoutRank = new URLSearchParams(Mocks.missingQuery3).toString();

    let res = await axios(queryRequest(queryWithoutYear));
    expect(res.status).toEqual(400);
    res = await axios(queryRequest(queryWithoutCategories));
    expect(res.status).toEqual(400);
    res = await axios(queryRequest(queryWithoutRank));
    expect(res.status).toEqual(400);
  })

  test('Testing for invalid query fields', async () => {
    const invalidRankQuery = new URLSearchParams(Mocks.invalidRankQuery).toString();
    const invalidYearQuery = new URLSearchParams(Mocks.invalidYearQuery).toString();
    let res = await axios(queryRequest(invalidRankQuery));
    expect(res.status).toEqual(400);
    res = await axios(queryRequest(invalidYearQuery));
    expect(res.status).toEqual(400);
  })

  test('Testing for apps fetching', async () => {
    const validQuery = new URLSearchParams(Mocks.validQuery).toString();
    let res = await axios(queryRequest(validQuery));
    expect(res.status).toEqual(200);
    expect(res.data).toHaveLength(3);
  })

  test('Testing for empty apps list', async () => {
    const nothingShouldReturnQuery = new URLSearchParams(Mocks.nothingShouldReturn).toString();
    let res = await axios(queryRequest(nothingShouldReturnQuery));
    expect(res.status).toEqual(200);
    expect(res.data).toHaveLength(0);
  })

  test('Testing for apps list integrity', async () => {
    const validQuery = new URLSearchParams(Mocks.validQuery).toString();
    let res = await axios(queryRequest(validQuery));
    expect(res.status).toEqual(200);
    for (let i = 0; i < res.data.length; ++i) {
      expect(res.data[i].category === "Business" || res.data[i].category === "Tools").toBeTruthy();
      expect(res.data[i].rating).toBeGreaterThanOrEqual(4);
    }
  })
});


