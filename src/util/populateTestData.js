const { createComment } = require("../service/commentService");
const { createLink, findUrl } = require("../service/linkService");

const tags = [
  "tech",
  "fun",
  "search",
  "video",
  "pic",
  "community",
  "java",
  "apple",
  "free",
  "discount",
  "productivity",
  "travel",
  "car",
  "cat",
  "dog",
  "bird",
  "animal",
  "plant",
  "apple",
  "juice",
  "music",
  "edm",
  "techno",
  "cool",
  "news",
];
const urls = [
  "https://google.com",
  "https://youtube.com",
  "https://facebook.com",
  "https://instagram.com",
  "https://twitter.com",
  "https://wikipedia.org",
  "https://amazon.com",
  "https://bing.com",
  "https://yahoo.com",
  "https://reddit.com",
  "https://whatsapp.com",
  "https://taobao.com",
  "https://microsoft.com",
  "https://linkedin.com",
  "https://tiktok.com",
  "https://fandom.com",
  "https://t.co",
  "https://github.com",
  "https://google.com.hk",
  "https://netflix.com",
  "https://yahoo.co.jp",
  "https://paypal.com",
  "https://canva.com",
  "https://naver.com",
  "https://imdb.com",
  "https://ebay.com",
  "https://pinterest.com",
  "https://office.com",
  "https://telegram.org",
  "https://adobe.com",
  "https://duckduckgo.com",
  "https://apple.com",
  "https://msn.com",
  "https://spotify.com",
  "https://stackoverflow.com",
  "https://twitch.tv",
  "https://microsoftonline.com",
  "https://zoom.us",
  "https://mega.nz",
  "https://pixiv.net",
  "https://etsy.com",
  "https://t.me",
  "https://quora.com",
  "https://deepl.com",
  "https://google.co.in",
  "https://myshopify.com",
  "https://imgur.com",
  "https://doubleclick.net",
  "https://sogou.com",
  "https://mediafire.com",
  "https://nih.gov",
  "https://bbc.com",
  "https://espn.com",
  "https://indeed.com",
  "https://redd.it",
  "https://discord.com",
  "https://wordpress.com",
  "https://ilovepdf.com",
  "https://cnn.com",
  "https://booking.com",
  "https://sciencedirect.com",
  "https://nytimes.com",
  "https://walmart.com",
  "https://flipkart.com",
  "https://patreon.com",
  "https://instructure.com",
  "https://researchgate.net",
  "https://roblox.com",
  "https://dropbox.com",
  "https://archive.org",
  "https://google.de",
  "https://medium.com",
  "https://google.co.uk",
  "https://rakuten.co.jp",
  "https://tradingview.com",
  "https://fiverr.com",
  "https://googlevideo.com",
];
const descriptions = [
  "Enim sed faucibus turpis in. Egestas dui id ornare arcu.",
  "Tortor condimentum lacinia quis vel eros. Enim nec dui nunc mattis enim ut tellus elementum sagittis.",
  "Rhoncus mattis rhoncus urna neque viverra justo nec. Diam vel quam elementum pulvinar etiam non quam.",
  "Varius vel pharetra vel turpis nunc eget. Varius sit amet mattis vulputate enim nulla aliquet porttitor lacus.",
  "Lacus viverra vitae congue eu consequat ac. Mattis molestie a iaculis at erat pellentesque adipiscing.",
  "Pharetra diam sit amet nisl suscipit adipiscing. A lacus vestibulum sed arcu.",
  "Aliquam ultrices sagittis orci a scelerisque purus semper. Egestas sed sed risus pretium quam vulputate dignissim suspendisse.",
  "Eu tincidunt tortor aliquam nulla facilisi. Ipsum dolor sit amet consectetur.",
  "Sapien pellentesque habitant morbi tristique senectus et. Nibh praesent tristique magna sit amet purus.",
  "Morbi tristique senectus et netus et malesuada fames. Dolor sit amet consectetur adipiscing.",
  "Diam quam nulla porttitor massa id. Pharetra magna ac placerat vestibulum.",
  "Feugiat vivamus at augue eget arcu dictum. Laoreet sit amet cursus sit.",
  "Senectus et netus et malesuada fames ac turpis egestas integer. Elit ullamcorper dignissim cras tincidunt.",
  "Quam pellentesque nec nam aliquam sem et. Hac habitasse platea dictumst vestibulum rhoncus est.",
  "Laoreet sit amet cursus sit amet. Sed risus pretium quam vulputate dignissim.",
  "Accumsan lacus vel facilisis volutpat est velit egestas dui. Integer feugiat scelerisque varius morbi.",
  "Accumsan in nisl nisi scelerisque eu ultrices vitae. Viverra justo nec ultrices dui sapien eget.",
  "Eget dolor morbi non arcu risus quis varius quam quisque. Eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque.",
  "Est ante in nibh mauris cursus mattis molestie. Urna id volutpat lacus laoreet non curabitur gravida.",
  "Nibh mauris cursus mattis molestie a. Integer quis auctor elit sed vulputate mi sit.",
  "Facilisi morbi tempus iaculis urna id volutpat lacus. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor.",
  "Eget felis eget nunc lobortis mattis aliquam faucibus. Nam at lectus urna duis.",
  "Dolor morbi non arcu risus. Sed libero enim sed faucibus turpis in eu mi bibendum.",
  "Egestas dui id ornare arcu odio ut sem nulla. Elit at imperdiet dui accumsan sit.",
  "Quis ipsum suspendisse ultrices gravida dictum fusce. Vitae aliquet nec ullamcorper sit amet risus nullam.",
  "Gravida in fermentum et sollicitudin. Faucibus ornare suspendisse sed nisi.",
  "Dignissim diam quis enim lobortis scelerisque fermentum dui. Urna nunc id cursus metus.",
  "Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam. Nisl vel pretium lectus quam.",
  "In est ante in nibh mauris cursus mattis. Quis risus sed vulputate odio ut enim blandit volutpat.",
  "Duis ultricies lacus sed turpis. Tempus urna et pharetra pharetra massa massa ultricies mi.",
  "Velit scelerisque in dictum non consectetur a erat nam at. Faucibus interdum posuere lorem ipsum dolor.",
  "Vitae tortor condimentum lacinia quis vel eros donec. Aliquet risus feugiat in ante metus dictum at tempor commodo.",
  "Massa massa ultricies mi quis hendrerit dolor magna eget est. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras.",
  "Varius vel pharetra vel turpis nunc eget lorem dolor. Tortor vitae purus faucibus ornare suspendisse.",
  "Sit amet purus gravida quis blandit turpis cursus in hac. Facilisi morbi tempus iaculis urna id volutpat lacus.",
  "Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Aliquam sem et tortor consequat id porta nibh venenatis.",
  "Vitae congue mauris rhoncus aenean vel. Nibh nisl condimentum id venenatis.",
  "Nunc eget lorem dolor sed viverra ipsum nunc aliquet. Enim ut tellus elementum sagittis.",
  "Amet nulla facilisi morbi tempus iaculis urna id. Lobortis mattis aliquam faucibus purus in massa tempor nec feugiat.",
];
const users = ["alice", "bob", "charlie"];

const linkIds = [];

function randomSelect(arr, number) {
  const result = [];
  const index = Math.floor(Math.random() * arr.length);
  for (let i = 0; i < number; i++) {
    result.push(arr[(index + i) % arr.length]);
  }
  return result;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function populate() {
  for (let i = 0; i < 100; i++) {
    const link = {
      url: randomSelect(urls, 1)[0],
      tags: randomSelect(tags, 3),
      description: randomSelect(descriptions, 1)[0],
      user: randomSelect(users, 1)[0],
    };
    const linkId = await createLink(link);
    linkIds.push(linkId);
    const numberOfHits = getRandomInt(20);
    for (let j = 0; j < numberOfHits; j++) {
      await findUrl(linkId);
    }
  }
  for (let i = 0; i < 200; i++) {
    const comment = {
      linkId: randomSelect(linkIds, 1)[0],
      content: randomSelect(descriptions, 1)[0],
      user: randomSelect(users, 1)[0],
    };
    await createComment(comment);
  }
  console.log("Done!");
}

populate().then();
