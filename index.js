const dirTree = require("directory-tree");
const tree = dirTree(".", {
  exclude: /node_modules|\.git/,
  extensions: /^((?!js).)*$/
});

// let prefix = `https://github.com/lib-pku/libpku/raw/master/`;
let prefix = `https://github.com/CoderTonyChan/libpku/raw/master/`;
function solve(e, depth) {
  let s = "";
  let res = [];
  if (depth == 1) {
    res.push(`## toc`);
  }
  if (e.type == "directory") {
    for (let i = 0; i < depth; ++i) s += "#";
    res.push(`${s} [${e.name}](${prefix + encodeURIComponent(e.path)})`);
  } else if (e.type == "file") {
    res.push(`[${e.name}](${prefix + encodeURIComponent(e.path)})`);
  }
  if (e.children) {
    e.children.forEach(ww => {
      if (ww && ww.name) res.push(solve(ww, depth + 1));
    });
  }
  return res.join("\n");
}

// console.log(solve(tree, 1));

let begin = `<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>libpku - 贵校课程资料民间整理</title>
<meta property="og:url" content="https://blog.tonystudio.ml/libpku/" />
<meta property="og:site_name" content="blog.tonystudio.ml/libpku" />
<link rel="canonical" href="https://blog.tonystudio.ml/libpku" />
<link rel="stylesheet" href="assets/css/index.css">
</head>
<body>
  <header>
  <div class="inner">
    <br>
    <a href="https://blog.tonystudio.ml/libpku/">
      <h2>libpku - 贵校课程资料民间整理</h2>
    </a>
    <h2></h2>
    <a href="https://github.com/CoderTonyChan/libpku" class="button"><small>Fork this on</small> GitHub</a>
  </div>
  </header>
  <div id="content-wrapper">
    <div class="inner clearfix">
      <section id="main-content"><aside id="sidebar">`;

let sd = `</section>`;

let ed = `<p>This page was generated by <a href="https://pages.github.com">GitHub Pages</a>.</p>
    </div>
  </div>
</body>
</html>`;

var remark = require("remark");
var html = require("remark-html");
var toc = require("remark-toc");

remark()
  .use(toc)
  .use(html)
  .process(solve(tree, 1), function(err, file) {
    if (err) {
      console.error(err);
    }
    // console.log(file)
    console.log(
      begin + String(file).replace("<h1 id=", `</aside>` + "<h1 id=") + ed
    );
    // console.log(String(file))
  });
