import {
  createFooter,
  createHeader,
  createMainContent,
  createSection,
} from "../common/commonElements.js";
import { createLinkList } from "./indexElements.js";
import { getHubData } from "./indexApi.js";
import { commonSetup, getCurrentUser } from "../common/util.js";

let yourLinks;
let topHits;
let latest;

async function setupIndex() {
  commonSetup();
  yourLinks = createSection("Your Links");
  topHits = createSection("Top Hits");
  latest = createSection("Latest");

  const hubData = await getHubData(getCurrentUser());
  yourLinks.appendChild(createLinkList(hubData.yourLinks));
  topHits.appendChild(createLinkList(hubData.topHits));
  latest.appendChild(createLinkList(hubData.latest));

  const mainContainer = document.querySelector(".main");
  const mainContent = createMainContent();

  if (hubData.yourLinks && hubData.yourLinks.length > 0) {
    mainContent.appendChild(yourLinks);
  }
  mainContent.appendChild(topHits);
  mainContent.appendChild(latest);

  mainContainer.appendChild(createHeader());
  mainContainer.appendChild(mainContent);
  mainContainer.appendChild(createFooter());
}

setupIndex().then();
