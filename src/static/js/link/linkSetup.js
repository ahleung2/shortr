import {
  createFooter,
  createHeader,
  createMainContent,
  createSection,
} from "../common/commonElements.js";
import { createLink, deleteLink, getLinkData, updateLink } from "./linkApi.js";
import {
  commonSetup,
  getQueryParams,
  isLoggedIn,
  parseUrl,
  showConfirmation,
  showMessage,
} from "../common/util.js";
import {
  createLinkDetails,
  populateTags,
  resizeTextArea,
} from "./linkElements.js";
import { setupComment } from "../comment/commentSetup.js";

let link;

let editingTags;
let isEditing;
let isCreating;

export function startEditing() {
  const parsedUrl = parseUrl(link.url);
  document.querySelector("#protocol").value = parsedUrl[0];
  document.querySelector("#path").value = parsedUrl[1];
  document.querySelector("#description").value = link.description;
  document.querySelector("#tagInput").value = JSON.stringify(link.tags);
  populateTags(link.tags);
  editingTags = link.tags.slice();

  document.querySelector(".linkDetails").classList.add("editing");
  resizeTextArea();
  validate();
  isEditing = true;
}

export function endEditing() {
  populateTags(link.tags);
  document.querySelector(".linkDetails").classList.remove("editing");
  isEditing = false;
}

export function startCreating() {
  document.querySelector(".linkDetails").classList.add("creating");
  isCreating = true;
  startEditing();
}

export function endCreating() {
  window.location.href = "/";
}

export function validate() {
  const protocol = document.querySelector("#protocol").value;
  const path = document.querySelector("#path").value;
  let savable = true;
  if (protocol !== "http://" && protocol !== "https://") {
    savable = false;
  }
  if (path.indexOf(".") === -1) {
    savable = false;
  }
  const saveButton = document.querySelector("#saveButton");
  saveButton.disabled = !savable;
  if (savable) {
    saveButton.classList.remove("disabledButton");
  } else {
    saveButton.classList.add("disabledButton");
  }
}

export function plusButtonClicked(event) {
  event.preventDefault();
  const inputText = document.querySelector("#singleTagInput").value.trim();
  document.querySelector("#singleTagInput").value = "";
  if (inputText && !editingTags.includes(inputText)) {
    editingTags.push(inputText);
    populateTags(editingTags);
  }
}

export function removeTagClicked(event, tag) {
  event.preventDefault();
  if (isEditing) {
    editingTags.splice(editingTags.indexOf(tag), 1);
    populateTags(editingTags);
  }
}

export async function saveButtonClicked(event) {
  event.preventDefault();
  const urlValue =
    document.querySelector("#protocol").value +
    document.querySelector("#path").value;
  const descriptionValue = document.querySelector("#description").value;
  const tagValue = editingTags.slice();
  const updatedLink = {
    url: urlValue,
    tags: tagValue,
    description: descriptionValue,
    linkId: link.linkId,
  };
  if (isCreating) {
    const linkId = (await createLink(updatedLink)).linkId;
    window.location.href = `/link.html?linkId=${linkId}`;
  } else {
    link = await updateLink(updatedLink);
  }
  populateLink(link);
  await setupComment(link);
  showMessage("Changes have been saved.");
}

export async function cancelButtonClicked(event) {
  event.preventDefault();
  let positiveAction;
  if (isCreating) {
    positiveAction = endCreating;
  } else {
    positiveAction = endEditing;
  }
  showConfirmation(
    "Discard unsaved changes",
    "Are you sure you want to cancel without saving? All changes will be lost.",
    "Yes",
    "No",
    positiveAction
  );
}

export async function deleteButtonClicked() {
  await deleteLink(link.linkId);
  document.querySelector(".content").innerHTML = "";
  const msg = `${link.linkId} has been deleted. Redirecting to <a href = "/">home page</a> in 5 seconds.`;
  showMessage(msg, (messageBox) => {
    for (let i = 5; i >= 1; i--) {
      setTimeout(
        () =>
          (messageBox.innerHTML = `${link.linkId} has been deleted. Redirecting to <a href = "/">home page</a> in ${i} seconds.`),
        (5 - i) * 1000
      );
    }
  });
  setTimeout(() => {
    window.location.href = "/";
  }, 5000);
}

async function setupLink() {
  commonSetup();
  let linkId = null;
  if (getQueryParams().create) {
    if (!isLoggedIn()) {
      window.location.href = "/";
    }
    link = {
      url: "",
      tags: [],
      description: "",
      hits: 0,
      linkId,
    };
    populateLink(link);
    startCreating();
  } else {
    linkId = getQueryParams().linkId;
    link = await getLinkData(linkId);
    console.log(link);
    populateLink(link);
    await setupComment(link);
  }
}

function populateLink(link) {
  const linkSection = createSection("Link");
  linkSection.appendChild(createLinkDetails(link));

  const mainContent = createMainContent();
  mainContent.appendChild(linkSection);

  const mainContainer = document.querySelector(".main");

  mainContainer.innerHTML = "";

  mainContainer.appendChild(createHeader());
  mainContainer.appendChild(mainContent);
  mainContainer.appendChild(createFooter());
}

setupLink().then();
