import { getCurrentUser, makeHttpRequest } from "../common/util.js";

export async function getLinkData(linkId) {
  return await makeHttpRequest(`/api/link/${linkId}`);
}

export async function createLink(link) {
  link.user = getCurrentUser();
  return await makeHttpRequest("/api/link", "POST", JSON.stringify(link));
}

export async function updateLink(link) {
  return await makeHttpRequest("/api/link", "PUT", JSON.stringify(link));
}

export async function deleteLink(linkId) {
  return await makeHttpRequest(`/api/link/${linkId}`, "DELETE");
}
