(function () {
  const logEl = document.getElementById("log");
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const chips = document.getElementById("chips");
  const clearBtn = document.getElementById("clearBtn");
  if (!logEl || !form || !input) return;

  let last = "menu";

  const MENU =
    "Main coding bot hoon. Menu:\n" +
    "1 html  2 css  3 javascript  4 python\n" +
    "5 variables  6 if  7 loops  8 functions\n" +
    "9 arrays  10 strings  11 forms  12 events\n" +
    "13 errors  14 git  15 website kaise banti\n" +
    "16 comments  17 operators  18 data types\n" +
    "19 page banao  20 quiz  21 practice\n\n" +
    "Koi topic type karo.";

  const R = [
    { k: ["menu", "help", "madad", "start", "topics", "list"], t: "menu", a: MENU },
    { k: ["salam", "hello", "hi", "hey", "aoa", "assalam"], t: "menu", a: "Salam!\n" + MENU },
    { k: ["coding kya", "programming kya", "code kya", "what is coding", "what is programming"], t: "intro",
      a: "Coding = computer ko steps dena.\nJaisi recipe: pehle yeh, phir yeh.\nLanguages: HTML page banati, CSS sundar, JS click, Python general programs." },
    { k: ["compiler", "interpreter", "ide", "vs code", "notepad"], t: "tools",
      a: "Likhne ke liye: VS Code (best) ya Notepad.\nHTML file save .html, browser se open.\nPython ke liye Python install + VS Code.\nConsole/terminal code chalane ki window." },
    { k: ["website kaise", "internet", "browser", "server", "domain", "github pages"], t: "web",
      a: "Website files hoti hain (html/css/js).\nBrowser unko padh ke screen banata hai.\nGitHub Pages un files ko internet pe rakh deta hai.\nURL = address. Domain = naam jaise google.com." },
    { k: ["html kya", "what is html", "html kia"], t: "html",
      a: "HTML = HyperText Markup Language.\nPage ki haddi. Tags se structure.\n<!DOCTYPE html>\n<html>\n<head><title>Naam</title></head>\n<body>jo dikhe</body>\n</html>" },
    { k: ["doctype"], t: "html", a: "<!DOCTYPE html> browser ko kehta hai yeh modern HTML5 page hai. Sab se upar likho." },
    { k: ["head body", "head aur body", "head body farq"], t: "html",
      a: "head = tab title, CSS, extra info. Screen pe nahi.\nbody = jo user dekhe: text, buttons, images." },
    { k: ["h1", "h2", "heading"], t: "html",
      a: "Headings:\n<h1>Title</h1> sab se bari, page pe 1.\n<h2>section</h2>\n<h3>chhoti\n... h6 tak." },
    { k: ["paragraph", "p tag", "<p"], t: "html", a: "Text block:\n<p>Yeh paragraph hai.</p>" },
    { k: ["span"], t: "html", a: "<span> chhota text piece, line nahi todti. Color dene ke liye useful." },
    { k: ["div"], t: "html", a: "<div> box/container. Sections group. Khud text nahi, wrapper." },
    { k: ["br tag", "<br", "line break", "next line"], t: "html", a: "Next line: <br>  (band nahi hota)" },
    { k: ["hr"], t: "html", a: "Line across page: <hr>" },
    { k: ["a tag", "href", "anchor", "link banao", "hyperlink"], t: "html",
      a: "Link:\n<a href=\"https://google.com\" target=\"_blank\">Google</a>\nhref = address\ntarget=_blank naya tab." },
    { k: ["img", "image", "tasveer", "picture"], t: "html",
      a: "<img src=\"photo.jpg\" alt=\"photo\" width=\"200\">\nsrc=file, alt=backup text. Close tag nahi." },
    { k: ["ul", "ol", "li", "list", "bullet"], t: "html",
      a: "Dots:\n<ul><li>Aam</li><li>Kela</li></ul>\nNumbers:\n<ol><li>Pehla</li><li>Doosra</li></ol>" },
    { k: ["table", "tr", "td", "th"], t: "html",
      a: "<table>\n  <tr><th>Naam</th><th>Marks</th></tr>\n  <tr><td>Ali</td><td>90</td></tr>\n</table>\ntr=row, th=heading cell, td=data." },
    { k: ["form", "input", "textarea", "select", "label"], t: "forms",
      a: "<form>\n  <label>Naam</label>\n  <input type=\"text\" />\n  <input type=\"email\" />\n  <input type=\"password\" />\n  <input type=\"number\" />\n  <textarea></textarea>\n  <button type=\"submit\">Send</button>\n</form>\ntype batata hai kaunsa box." },
    { k: ["button", "btn"], t: "html",
      a: "<button>Click</button>\nJS ke sath:\n<button onclick=\"alert('Hi')\">Hi</button>" },
    { k: ["semantic", "header footer nav main section article"], t: "html",
      a: "Matlab wale tags:\n<header> top\n<nav> links\n<main> asl content\n<section> hissa\n<article> post\n<footer> neeche\nGoogle ko samajh aata hai." },
    { k: ["attribute", "id class", "id aur class"], t: "html",
      a: "Attribute tag ke andar extra info.\nid=\"box\" unique naam.\nclass=\"card\" kai elements same style.\n<p id=\"a\" class=\"note\">Hi</p>" },
    { k: ["comment html", "html comment"], t: "html", a: "HTML comment (code mein note, screen pe nahi):\n<!-- yeh note hai -->" },
    { k: ["css kya", "what is css", "css kia"], t: "css",
      a: "CSS = look.\nselector { property: value; }\nh1 { color: navy; text-align: center; }" },
    { k: ["css lagao", "style tag", "stylesheet", "link css"], t: "css",
      a: "3 tarike:\n1) <style> head mein\n2) alag style.css phir\n<link rel=\"stylesheet\" href=\"style.css\">\n3) style=\"color:red\" kisi tag pe (chhota kaam)." },
    { k: ["color", "rang", "background", "colour"], t: "css",
      a: "color: text\nbackground: peeche\n\nbody { background: #f3efe6; color: #111; }\nNames: red blue green navy gold black white\nYa #ff0000 jaisa code." },
    { k: ["font", "font-size", "font-family", "text-align", "center"], t: "css",
      a: "p {\n  font-family: Arial;\n  font-size: 18px;\n  font-weight: bold;\n  text-align: center;\n  line-height: 1.5;\n}" },
    { k: ["padding", "margin", "border", "box model"], t: "css",
      a: "Box model andar se bahar:\ncontent -> padding -> border -> margin\n\n.box {\n  padding: 12px;\n  border: 2px solid black;\n  margin: 16px;\n  width: 200px;\n}" },
    { k: ["display", "flex", "grid", "block", "inline"], t: "css",
      a: "display: block; poori line\ninline; text ke sath\nflex; row/column align\ngrid; rows+cols\n\n.row { display: flex; gap: 10px; }" },
    { k: ["position", "relative", "absolute", "fixed"], t: "css",
      a: "position: relative; normal + shift\nabsolute; parent ke hisaab se\nfixed; scroll pe chipki (jaise bot button)\nstatic default." },
    { k: ["hover", "pseudo", ":hover"], t: "css",
      a: "button:hover { background: black; color: white; }\nMouse upar ho to style badle." },
    { k: ["responsive", "mobile", "media query"], t: "css",
      a: "Phone ke liye:\n@media (max-width: 600px) {\n  h1 { font-size: 22px; }\n}\nPehle yeh bhi:\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">" },
    { k: ["javascript kya", "what is javascript", "what is js", "js kya", "js kia"], t: "js",
      a: "JavaScript page ko zinda karti hai.\nalert, click, calculate, hide/show.\n<script>alert('Hi')</script>\nya alag app.js" },
    { k: ["console", "console.log"], t: "js",
      a: "Testing:\nconsole.log(\"hello\");\nBrowser: right click -> Inspect -> Console." },
    { k: ["variable", "let ", "const", "var ", "dibba"], t: "vars",
      a: "let x = 10; badal sakte\nconst pi = 3.14; nahi badalte\nvar purana, class 10 mein let use karo.\nlet name = \"Ali\";" },
    { k: ["data type", "typeof", "boolean", "undefined", "null"], t: "types",
      a: "JS types:\nstring  \"hello\"\nnumber  10, 3.5\nboolean true/false\narray   [1,2]\nobject  {a:1}\nundefined abhi value nahi\nnull    khaali rakha" },
    { k: ["operator", "+ ", "===", "compare"], t: "ops",
      a: "Math: + - * / %\n% remainder 10%3=1\nCompare: > < >= <=\n== value\n=== value+type (yeh use karo)\n&& aur   || ya   ! nahi" },
    { k: ["string", "concat", "length", "uppercase"], t: "string",
      a: "let a = \"Salam\";\na.length\na.toUpperCase()\na.toLowerCase()\na + \" Ali\"  jodna\na.includes(\"la\")" },
    { k: ["if ", "else", "agar", "warna", "else if"], t: "if",
      a: "let marks = 80;\nif (marks >= 80) {\n  alert(\"A+\");\n} else if (marks >= 50) {\n  alert(\"Pass\");\n} else {\n  alert(\"Try again\");\n}" },
    { k: ["switch"], t: "if",
      a: "switch (day) {\n  case \"mon\": alert(\"School\"); break;\n  default: alert(\"Off\");\n}" },
    { k: ["loop", "for ", "while", "foreach", "iteration"], t: "loops",
      a: "Repeat.\nfor (let i = 1; i <= 5; i++) {\n  console.log(i);\n}\n\nlet n = 1;\nwhile (n <= 3) {\n  console.log(n);\n  n++;\n}\n\nArray:\n[\"a\",\"b\"].forEach(x => console.log(x));" },
    { k: ["function", "arrow", "return", "func"], t: "fn",
      a: "function salam(name) {\n  return \"Hi \" + name;\n}\nalert(salam(\"Ali\"));\n\nChhota:\nconst add = (a,b) => a + b;" },
    { k: ["array", "list js", "push", "index"], t: "array",
      a: "let fruits = [\"aam\", \"kela\"];\nfruits[0]  pehli\nfruits.push(\"seb\");\nfruits.length\nfruits.join(\", \")" },
    { k: ["object", "json"], t: "object",
      a: "let student = { name: \"Ali\", age: 15 };\nstudent.name\nstudent[\"age\"]\nJSON = data likhne ka format, objects jaisa." },
    { k: ["event", "onclick", "addEventListener", "click"], t: "events",
      a: "HTML: onclick=\"go()\"\nYa JS:\ndocument.getElementById(\"b\").addEventListener(\"click\", go);\nfunction go(){ alert(\"ok\"); }\nAur events: input, submit, keydown." },
    { k: ["dom", "getelementbyid", "queryselector", "innerhtml", "textcontent"], t: "dom",
      a: "DOM = page ke tags JS se pakarna.\nlet el = document.getElementById(\"demo\");\nel.textContent = \"Naya text\";\nquerySelector(\".card\") class se.\ninnerHTML HTML daal sakta, textContent safe text." },
    { k: ["alert", "prompt", "confirm"], t: "js",
      a: "alert(\"msg\");\nlet n = prompt(\"Naam?\");\nlet ok = confirm(\"Sure?\");" },
    { k: ["settimeout", "setinterval", "timer"], t: "js",
      a: "setTimeout(() => alert(\"1 sec\"), 1000);\nlet id = setInterval(() => console.log(\"tick\"), 1000);\nclearInterval(id);" },
    { k: ["python kya", "what is python", "python kia"], t: "py",
      a: "Python asaan general language. Web ke ilawa calculator, data, AI start.\nprint(\"Salam\")\nname = \"Ali\"\nage = 15" },
    { k: ["python if", "python loop", "python function", "def ", "print("], t: "py",
      a: "if age >= 10:\n    print(\"ok\")\nelse:\n    print(\"no\")\n\nfor i in range(1,6):\n    print(i)\n\ndef add(a,b):\n    return a+b" },
    { k: ["python list", "indent", "indentation"], t: "py",
      a: "Python mein spaces zaroori (indent). if ke neeche 4 spaces.\nnums = [1,2,3]\nnums.append(4)" },
    { k: ["algorithm", "flowchart", "logic", "computational", "pseudocode"], t: "logic",
      a: "Algorithm = steps.\nExample chai: pani, patti, ubalo, cup.\nFlowchart boxes se steps.\nPseudocode English-jaisa code se pehle plan.\nInput -> Process -> Output." },
    { k: ["bug", "debug", "error", "ghalti", "syntax", "kaam nahi", "not working"], t: "err",
      a: "Syntax error: spelling/bracket.\nRuntime: chalte hue crash.\nLogic: chal gaya lekin galat jawab.\nCheck:\n1 tag/bracket band\n2 .html name\n3 console errors\n4 quotes match\n5 CSS ;" },
    { k: ["git", "github", "commit", "push", "repo"], t: "git",
      a: "Git = versions save.\nGitHub = internet pe code.\nrepo = project folder.\ncommit = snapshot + message.\npush = GitHub bhejna.\nPages = repo se live website." },
    { k: ["comment", "comments"], t: "misc",
      a: "HTML <!-- note -->\nCSS  /* note */\nJS   // note\nPython  # note" },
    { k: ["operator precedence", "math"], t: "ops", a: "Pehle * / phir + -\n(2+3)*4 = 20\n2+3*4 = 14" },
    { k: ["boolean", "true false"], t: "types", a: "true / false. if ke liye.\n5 > 3  true\n\"a\" === \"b\"  false" },
    { k: ["page banao", "pehli page", "starter", "template", "boilerplate", "sample page"], t: "page",
      a: "index.html:\n<!DOCTYPE html>\n<html>\n<head>\n<title>Mera Page</title>\n<style>\nbody{font-family:Arial;text-align:center;background:#f3efe6}\nbutton{padding:10px 16px}\n</style>\n</head>\n<body>\n<h1>Mera Website</h1>\n<p>Class 10 coding</p>\n<button onclick=\"document.body.style.background='lightblue'\">Rang</button>\n</body>\n</html>" },
    { k: ["calculator", "calc"], t: "page",
      a: "Mini idea:\nlet a = Number(prompt(\"Pehla number\"));\nlet b = Number(prompt(\"Doosra\"));\nalert(a + b);\nNumber() text ko number banata." },
    { k: ["practice", "mashq", "exercise", "homework"], t: "practice",
      a: "Practice set:\n1 Bio page: naam h1, 2 p, photo\n2 List of 5 hobbies\n3 Button color change\n4 JS: 1 se 10 print console\n5 if marks pass/fail\n6 Python print 1..5" },
    { k: ["quiz", "test", "sawal"], t: "quiz",
      a: "Quiz 1: Website ki haddi HTML CSS ya JS?\nJawab type karo." },
    { k: ["best language", "konsi language", "kis se start"], t: "intro",
      a: "Website: HTML -> CSS -> JS.\nGeneral/school: Python.\nEk waqt ek seekho. Pehle chhoti page banao." },
    { k: ["whatsapp"], t: "misc", a: "Yeh site bot hai. WhatsApp account yahan se nahi chalta." }
  ];

  const CHIPS = [
    ["Menu", "menu"],
    ["HTML", "HTML kya hai"],
    ["CSS", "CSS kya hai"],
    ["JavaScript", "JS kya hai"],
    ["Python", "Python kya hai"],
    ["Loops", "loop"],
    ["If", "if else"],
    ["Functions", "function"],
    ["Forms", "form"],
    ["Errors", "error"],
    ["Git", "git"],
    ["Page banao", "page banao"],
    ["Quiz", "quiz"],
    ["Practice", "practice"]
  ];

  function add(who, text) {
    const el = document.createElement("div");
    el.className = "bubble " + who;
    el.textContent = text;
    logEl.appendChild(el);
    logEl.scrollTop = logEl.scrollHeight;
  }

  function think(raw) {
    const q = (" " + raw.toLowerCase().trim() + " ").replace(/[?!.,]/g, " ");
    if (!raw.trim()) return "Sawal likho ya Menu dabao.";

    if (last === "quiz") {
      if (q.indexOf("html") !== -1) {
        last = "html";
        return "Sahi. HTML haddi.\nQuiz 2: Loop kis liye? (repeat / color / picture)";
      }
      if (q.indexOf("repeat") !== -1 || q.indexOf("dobara") !== -1) {
        last = "loops";
        return "Sahi. Loop repeat ke liye.\nQuiz 3: let se kya banta hai?";
      }
      if (q.indexOf("variable") !== -1 || q.indexOf("dibba") !== -1 || q.indexOf("let") !== -1) {
        last = "vars";
        return "Sahi. let variable (dibba) banata hai. Menu ke liye menu likho.";
      }
    }

    let best = null;
    let bestLen = 0;
    for (let i = 0; i < R.length; i++) {
      const row = R[i];
      for (let j = 0; j < row.k.length; j++) {
        const key = row.k[j];
        if (q.indexOf(key) !== -1 && key.length >= bestLen) {
          best = row;
          bestLen = key.length;
        }
      }
    }
    if (best) {
      last = best.t;
      return best.a;
    }
    return "Ye topic list mein clear nahi.\n\n" + MENU;
  }

  function send(text) {
    add("me", text);
    add("bot", think(text));
  }

  CHIPS.forEach(function (c) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = c[0];
    b.addEventListener("click", function () { send(c[1]); });
    chips.appendChild(b);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const t = input.value.trim();
    if (!t) return;
    input.value = "";
    send(t);
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      logEl.innerHTML = "";
      last = "menu";
      add("bot", MENU);
    });
  }

  add("bot", MENU);
})();
