import { createSection } from "../common/commonElements.js";
import { isLoggedIn, showConfirmation } from "../common/util.js";
import {
  createComment,
  deleteComment,
  getCommentsForLink,
  updateComment,
} from "./commentApi.js";
import { createCommentDetail } from "./commentElements.js";

let link;
let comments;

export function startEditingComment(comment) {
  const commentContainerSelector = comment
    ? `#${comment.commentId}`
    : "#commentCreator";
  const content = comment ? comment.content : "";
  const commentContainer = document.querySelector(commentContainerSelector);
  commentContainer.querySelector("input").value = content;
  commentContainer.classList.add("editing");
  validateComment(comment);
}

export function endEditingComment(comment) {
  const commentContainer = document.querySelector(`#${comment.commentId}`);
  commentContainer.classList.remove("editing");
}

export async function saveCommentButtonClicked(comment) {
  const commentContainerSelector = comment
    ? `#${comment.commentId}`
    : "#commentCreator";
  const commentContainer = document.querySelector(commentContainerSelector);
  const content = commentContainer.querySelector("input").value;
  if (comment) {
    comment.content = content;
    await updateComment(comment);
  } else {
    await createComment({
      linkId: link.linkId,
      content,
    });
  }
  comments = await getCommentsForLink(link.linkId);
  populateComments(comments);
}

export function validateComment(comment) {
  const commentContainerSelector = comment
    ? `#${comment.commentId}`
    : "#commentCreator";
  const commentContainer = document.querySelector(commentContainerSelector);
  const content = commentContainer.querySelector("input").value;
  const savable = content.trim().length > 0;

  const saveButton = commentContainer.querySelector(".commentSaveButton");
  saveButton.disabled = !savable;
  if (savable) {
    saveButton.classList.remove("disabledButton");
  } else {
    saveButton.classList.add("disabledButton");
  }
}

export async function cancelCommentButtonClicked(comment) {
  const positiveAction = () => endEditingComment(comment);
  showConfirmation(
    "Discard unsaved changes",
    "Are you sure you want to cancel without saving? All changes will be lost.",
    "Yes",
    "No",
    positiveAction
  );
}

export async function deleteCommentButtonClicked(comment) {
  await deleteComment(comment.commentId);
  comments = await getCommentsForLink(link.linkId);
  populateComments(comments);
}

export function populateComments(comments) {
  console.log(comments);
  const commentsSection = createSection("Comments");
  commentsSection.id = "commentsSection";
  if (isLoggedIn()) {
    commentsSection.appendChild(createCommentDetail(null));
  }
  for (const comment of comments) {
    const commentDetail = createCommentDetail(comment);
    commentsSection.appendChild(commentDetail);
  }
  const mainContent = document.querySelector(".content");
  if (mainContent.querySelector("#commentsSection")) {
    mainContent.removeChild(mainContent.querySelector("#commentsSection"));
  }
  mainContent.appendChild(commentsSection);
}

export async function setupComment(newLink) {
  link = newLink;
  comments = await getCommentsForLink(link.linkId);
  populateComments(comments);
}
