import { getCurrentUser, makeHttpRequest } from "../common/util.js";

export async function getCommentData(commentId) {
  return await makeHttpRequest(`/api/comment/${commentId}`);
}

export async function createComment(comment) {
  comment.user = getCurrentUser();
  return await makeHttpRequest("/api/comment", "POST", JSON.stringify(comment));
}

export async function updateComment(comment) {
  return await makeHttpRequest("/api/comment", "PUT", JSON.stringify(comment));
}

export async function deleteComment(commentId) {
  return await makeHttpRequest(`/api/comment/${commentId}`, "DELETE");
}

export async function getCommentsForLink(linkId) {
  return await makeHttpRequest(`/api/comment/byLinkId/${linkId}`);
}
