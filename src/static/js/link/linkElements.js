import { createButton, createElement } from "../common/commonElements.js";
import {
  getCurrentUser,
  getShortUrlFromId,
  showConfirmation,
  showMessage,
} from "../common/util.js";
import {
  cancelButtonClicked,
  deleteButtonClicked,
  plusButtonClicked,
  removeTagClicked,
  saveButtonClicked,
  startEditing,
  validate,
} from "./linkSetup.js";

export function createLinkDetails(link) {
  const linkDetailShortUrl = createLinkDetailShortUrl(
    getShortUrlFromId(link.linkId)
  );
  const linkDetailUrl = createLinkDetailUrl(link.url);
  const linkDetailDescription = createLinkDetailDescription(link.description);
  const linkDetailTags = createLinkDetailTags(link.tags);
  const linkDetailVisited = createLinkDetailVisited(link.hits);
  const linkDetailControl = createLinkDetailControl(link.user);
  const form = createElement("form", null, null, [
    linkDetailShortUrl,
    linkDetailUrl,
    linkDetailDescription,
    linkDetailTags,
    linkDetailVisited,
    linkDetailControl,
  ]);
  form.id = "linkEditForm";
  form.autocomplete = "off";
  return createElement("div", "linkDetails", null, [form]);
}

export function createLinkDetailShortUrl(shortUrl) {
  const name = createElement("div", "linkDetailName", "Short URL:");
  const content = createElement("div", "linkDetailContent", shortUrl);
  content.id = "contentShortUrl";
  const container = createElement(
    "div",
    "linkDetailItem hideWhenCreating",
    null,
    [name, content]
  );
  return container;
}

export function createLinkDetailUrl(url) {
  const name = createElement("div", "linkDetailName", "URL:");
  const content = createElement(
    "div",
    "linkDetailContent hideWhenEditing",
    url
  );
  content.id = "contentUrl";

  const option1 = createElement("option", null, "https://");
  option1.value = "https://";
  const option2 = createElement("option", null, "http://");
  option2.value = "http://";

  const select = createElement("select", null, null, [option1, option2]);
  select.name = "protocol";
  select.id = "protocol";
  select.addEventListener("change", validate);

  const input = createElement("input");
  input.type = "text";
  input.name = "path";
  input.id = "path";
  input.addEventListener("input", validate);

  const editRow = createElement("div", "editRow", null, [select, input]);
  const edit = createElement("div", "linkDetailEdit", null, [editRow]);
  const container = createElement("div", "linkDetailItem", null, [
    name,
    content,
    edit,
  ]);
  return container;
}

export function createLinkDetailDescription(description) {
  const name = createElement("div", "linkDetailName", "Description:");
  const content = createElement(
    "div",
    "linkDetailContent hideWhenEditing",
    description
  );
  content.id = "contentDescription";

  const textArea = createElement("textarea");
  textArea.name = "description";
  textArea.id = "description";

  textArea.addEventListener("input", resizeTextArea);

  const edit = createElement("div", "linkDetailEdit", null, [textArea]);
  const container = createElement("div", "linkDetailItem", null, [
    name,
    content,
    edit,
  ]);
  return container;
}

export function createLinkDetailTags(tags) {
  const name = createElement("div", "linkDetailName", "Tags:");

  const content = createElement("div", "linkDetailContent linkTags");
  content.id = "contentLinkTags";
  populateTags(tags, content);

  const input1 = createElement("input");
  input1.type = "text";
  input1.name = "tagInput";
  input1.id = "tagInput";

  const input2 = createElement("input");
  input2.type = "text";
  input2.id = "singleTagInput";

  const plusButton = createButton("+");
  plusButton.id = "plusButton";
  plusButton.addEventListener("click", plusButtonClicked);

  const editRow = createElement("div", "editRow", null, [
    input1,
    input2,
    plusButton,
  ]);
  const edit = createElement("div", "linkDetailEdit tagEdit", null, [editRow]);

  const container = createElement("div", "linkDetailItem", null, [
    name,
    content,
    edit,
  ]);
  return container;
}

export function createLinkDetailVisited(visited) {
  const name = createElement("div", "linkDetailName", "Visited:");
  const content = createElement(
    "div",
    "linkDetailContent",
    `${visited} time(s)`
  );
  content.id = "contentVisited";
  const container = createElement(
    "div",
    "linkDetailItem hideWhenCreating",
    null,
    [name, content]
  );
  return container;
}

export function createLinkDetailControl(user) {
  const buttonCopy = createElement(
    "button",
    "hideWhenEditing",
    "Copy Short URL"
  );
  buttonCopy.addEventListener("click", copyButtonClicked);

  const buttonEdit = createElement("button", "hideWhenEditing", "Edit");
  buttonEdit.addEventListener("click", (event) => {
    event.preventDefault();
    startEditing();
  });

  const buttonDelete = createElement(
    "button",
    "hideWhenEditing deleteButton",
    "Delete"
  );
  buttonDelete.addEventListener("click", (event) => {
    event.preventDefault();
    showConfirmation(
      "Confirm delete",
      "Are you sure you want to delete this link? This action cannot be undone.",
      "Yes",
      "No",
      deleteButtonClicked
    );
  });

  const buttonSave = createElement("button", "displayWhenEditing", "Save");
  buttonSave.id = "saveButton";
  buttonSave.addEventListener("click", saveButtonClicked);

  const buttonCancel = createElement("button", "displayWhenEditing", "Cancel");
  buttonCancel.addEventListener("click", cancelButtonClicked);

  let containerChildren;
  if (!user || user === getCurrentUser()) {
    containerChildren = [
      buttonCopy,
      buttonEdit,
      buttonDelete,
      buttonSave,
      buttonCancel,
    ];
  } else {
    containerChildren = [buttonCopy];
  }

  const container = createElement(
    "div",
    "linkDetailControl",
    null,
    containerChildren
  );
  return container;
}

function copyButtonClicked(event) {
  event.preventDefault();
  const buttonCopy = event.target;
  try {
    navigator.clipboard
      .writeText(document.querySelector("#contentShortUrl").textContent.trim())
      .then();
    const originalWidth = getComputedStyle(buttonCopy).width;
    const originalText = buttonCopy.innerHTML;
    buttonCopy.style.width = originalWidth;
    buttonCopy.innerHTML = "Copied!";
    buttonCopy.removeEventListener("click", copyButtonClicked);
    buttonCopy.addEventListener("click", noop);
    setTimeout(() => {
      buttonCopy.style.width = "";
      buttonCopy.innerHTML = originalText;
      buttonCopy.removeEventListener("click", noop);
      buttonCopy.addEventListener("click", copyButtonClicked);
    }, 2000);
  } catch (e) {
    showMessage(
      "Automatic copy is not supported on this device. Please manually copy the link."
    );
  }
}

function noop(event) {
  event.preventDefault();
}

export function resizeTextArea() {
  const textArea = document.querySelector("#description");
  setTimeout(() => {
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px";
  });
}

export function populateTags(tags, content) {
  if (!content) {
    content = document.querySelector("#contentLinkTags");
  }
  content.innerHTML = "";
  for (const tag of tags) {
    const div = createElement("div", "linkTag", tag);
    const removeSign = createElement(
      "span",
      "linkTagRemoveSign displayWhenEditing",
      " ×"
    );
    div.appendChild(removeSign);
    div.addEventListener("click", (event) => removeTagClicked(event, tag));
    content.appendChild(div);
  }
}
