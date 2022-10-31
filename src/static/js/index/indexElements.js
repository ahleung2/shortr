import { createElement } from "../common/commonElements.js";
import { getShortUrlFromId } from "../common/util.js";

export function createLinkCard(link) {
  const linkId = createElement("div", "linkId", link.linkId);
  const img = createElement("img");
  img.src = "image/click.png";
  img.alt = "pointer icon";
  const span = createElement("span", null, null, [img]);
  span.innerHTML += " " + link.hits;
  const linkHitCount = createElement("div", "linkHitCount", null, [span]);
  const linkTitle = createElement("div", "linkTitle", null, [
    linkId,
    linkHitCount,
  ]);

  const a = createElement("a", null, link.url);
  a.href = getShortUrlFromId(link.linkId);
  const linkActualUrl = createElement("div", "linkActualUrl", null, [a]);

  const linkDescription = createElement(
    "div",
    "linkDescription",
    link.description
  );

  const tags = [];
  for (const tagName of link.tags) {
    tags.push(createElement("div", "linkTag", tagName));
  }

  const linkTags = createElement("div", "linkTags", null, tags);

  const linkCard = createElement("div", "linkCard", null, [
    linkTitle,
    linkActualUrl,
    linkDescription,
    linkTags,
  ]);
  linkCard.addEventListener(
    "click",
    () => (window.location.href = `/link.html?linkId=${link.linkId}`)
  );
  return linkCard;
}

export function createLinkList(links) {
  const linkCards = [];
  for (const link of links) {
    linkCards.push(createLinkCard(link));
  }
  return createElement("div", "linkList", null, linkCards);
}
