import { makeHttpRequest } from "../common/util.js";

export async function getHubData(user) {
  return await makeHttpRequest(`/api/hub/${user}`);
}
