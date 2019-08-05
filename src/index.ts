function fetchProfilePage() {
  const { host } = window.location;
  return fetch(`http://${host}/ff.txt`, {
    credentials: "include"
  }).then(request => request.text());
}

async function main() {
  const content = await fetchProfilePage();
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const rootDom = doc.body.querySelector("#root");
  const codesDom = Array.from(doc.body.querySelectorAll("code")).map(node =>
    node.innerHTML.replace("<!--", "").replace("-->", "")
  );

  // new version profile page locate bio text with `#bio` selector
  if (codesDom.length) {
    for (let code of codesDom) {
      const codeParser = new DOMParser();
      const codeDoc = codeParser.parseFromString(code, "text/html");
      const bio = codeDoc.querySelector("#bio");

      if (bio) {
        console.log(bio);
        break;
      }
    }
    return;
  }

  // old version profile page locate bio text with magic selector
  if (rootDom) {
    console.log(
      rootDom.querySelector("div > div > div:nth-child(2) > div:nth-child(2)")
    );
  }
}

main();
