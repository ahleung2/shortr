import { createElement } from "../common/commonElements.js";
import {
  saveCommentButtonClicked,
  cancelCommentButtonClicked,
  deleteCommentButtonClicked,
  startEditingComment,
  validateComment,
} from "./commentSetup.js";
import { getCurrentUser, showConfirmation } from "../common/util.js";

export function createCommentDetail(comment) {
  const isCreating = !comment;

  const content = isCreating ? "" : comment.content;
  const commentContent = createElement(
    "div",
    "commentContent hideWhenEditing",
    content
  );

  const commentContentInput = createElement("input");
  commentContentInput.type = "text";
  commentContentInput.name = "commentContent";
  commentContentInput.addEventListener("input", () => validateComment(comment));

  const commentDetailEdit = createElement("div", "commentDetailEdit", null, [
    commentContentInput,
  ]);

  const editButton = createElement("button", "hideWhenEditing", "Edit");
  editButton.addEventListener("click", (event) => {
    event.preventDefault();
    startEditingComment(comment);
  });

  const deleteButton = createElement(
    "button",
    "hideWhenEditing deleteButton",
    "Delete"
  );
  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    showConfirmation(
      "Confirm delete",
      "Are you sure you want to delete this comment? This action cannot be undone.",
      "Yes",
      "No",
      () => deleteCommentButtonClicked(comment)
    );
  });

  const saveButtonText = isCreating ? "Post" : "Save";
  const saveButton = createElement(
    "button",
    "displayWhenEditing commentSaveButton",
    saveButtonText
  );
  saveButton.addEventListener("click", (event) => {
    event.preventDefault();
    saveCommentButtonClicked(comment).then();
  });

  const cancelButton = createElement("button", "displayWhenEditing", "Cancel");
  cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    cancelCommentButtonClicked(comment).then();
  });

  let buttonsList;
  if (isCreating) {
    buttonsList = [saveButton];
  } else {
    buttonsList = [editButton, deleteButton, saveButton, cancelButton];
  }
  const commentControls = createElement(
    "div",
    "commentControls",
    null,
    buttonsList
  );

  const postNewCommentTitle = createElement(
    "div",
    "linkDetailName",
    "Post New Comment"
  );

  let formChildren;

  if (!comment || getCurrentUser() === comment.user) {
    formChildren = [commentContent, commentDetailEdit, commentControls];
  } else {
    formChildren = [commentContent, commentDetailEdit];
  }

  const form = createElement("form", null, null, formChildren);
  form.autocomplete = "off";

  const commentContainer = createElement(
    "div",
    "commentDetails",
    null,
    isCreating ? [postNewCommentTitle, form] : [form]
  );
  if (isCreating) {
    commentContainer.id = "commentCreator";
    setTimeout(() => startEditingComment(comment));
  } else {
    commentContainer.id = comment.commentId;
  }
  return commentContainer;
}
