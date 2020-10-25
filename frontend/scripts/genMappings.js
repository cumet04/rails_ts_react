// ---------- filetree ----------
// src/
//   index.js
//   _pages.js  <-- generated
//   pages/
//     index.tsx
//     posts/
//       index.tsx
//       new.tsx
//       _id/
//         index.tsx
//   types/
//     _pageProps.d.ts  <-- generated
// ---------- _pages.js ----------
// import _page0 from "/src/pages/index"
// import _page1 from "/src/pages/posts/index"
// import _page2 from "/src/pages/posts/new"
// import _page3 from "/src/pages/posts/_id/index"
// export let Pages = {
//   "index": _page0,
//   "posts": _page1,
//   "posts/new": _page2,
//   "posts/_id": _page3,
// };
// ---------- _pageProps.d.ts ----------
// import {Props as props0} from "../src/./pages/index"
// import {Props as props1} from "../src/./pages/posts/index"
// import {Props as props2} from "../src/./pages/posts/new"
// import {Props as props3} from "../src/./pages/posts/_id/index"
// declare namespace PagePropsType {
// type index = props0
// type posts = props1
// type postsXnew = props2
// type postsX_id = props3
// }
// ------------------------------

const fs = require("fs");
const path = require("path");

// $ find dirpath -type f -name "*.tsx"
function getFiles(dirpath, list) {
  const dirents = fs.readdirSync(dirpath, { withFileTypes: true });
  for (const dirent of dirents) {
    const fp = path.join(dirpath, dirent.name);
    if (dirent.isDirectory()) {
      getFiles(fp, list);
    } else {
      if (fp.endsWith(".tsx")) list.push(fp);
    }
  }
  return list;
}

function generatePageMapping(mapping, filename) {
  const imports = mapping
    .map((pair, i) => `import _page${i} from "${pair.file}"`)
    .join("\n");
  const exports = mapping
    .map((pair, i) => `"${pair.path}": _page${i},`)
    .join("\n");
  fs.writeFileSync(
    filename,
    [
      "// This file is automatic generated by scripts/genMappings.js",
      imports,
      "export let Pages = {",
      exports,
      "} as Record<string, PageComponent<any>>;",
    ].join("\n")
  );
}

function generatePropMapping(mapping, filename) {
  const imports = mapping
    .map((pair, i) => `import {Props as props${i}} from "../src/${pair.file}"`)
    .join("\n");
  const declares = mapping
    .map((pair, i) => `type ${pair.path.replace("/", "_")} = props${i}`)
    .join("\n");
  fs.writeFileSync(
    filename,
    [
      "// This file is automatic generated by scripts/genMappings.js",
      imports,
      "declare namespace PagePropsType {",
      declares,
      "}",
    ].join("\n")
  );
}

function run() {
  const mapping = getFiles("src/pages", [])
    .map((path) => {
      return path.replace("src/pages/", "").replace(".tsx", "");
    })
    .map((file) => {
      const path = file
        .replace(/\/index/, "") // remove "/index"; normalize
        .replace(/^$/, "index"); // "index" for "/"
      return {
        path,
        file: `./pages/${file}`,
      };
    });

  const pagefile = path.join("src", "_pages.ts");
  console.log(`generate ${pagefile}`);
  generatePageMapping(mapping, pagefile);

  const propfile = path.join("types", "_pageProps.d.ts");
  console.log(`generate ${propfile}`);
  generatePropMapping(mapping, propfile);
}

module.exports = run;

if (!module.parent) run();