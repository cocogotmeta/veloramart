/* Class 10 Coding Bot — works fully on GitHub Pages, no API key */
(function () {
  const box = document.getElementById("botBox");
  const log = document.getElementById("botLog");
  const form = document.getElementById("botForm");
  const input = document.getElementById("botInput");
  const toggle = document.getElementById("botToggle");
  const closeBtn = document.getElementById("botClose");
  if (!box || !log || !form || !input || !toggle) return;

  let lastTopic = "";

  const replies = [
    {
      keys: ["salam", "assalam", "hello", "hi", "hey", "aoa"],
      topic: "hi",
      text: "Salam! Main Class 10 Coding Bot hoon.\nPocho: HTML, CSS, JS, tags, color, button, ya \"pehli page banao\"."
    },
    {
      keys: ["kaun", "who are you", "tum kaun", "what are you", "bot"],
      topic: "hi",
      text: "Main is website ka coding helper hoon. WhatsApp account nahi chalta. HTML CSS JS ke sawal ka jawab deta hoon."
    },
    {
      keys: ["html kya", "what is html", "html kia", "html hai"],
      topic: "html",
      text: "HTML website ki haddi hai.\nTag likh ke bataate ho yeh heading hai, yeh button hai, yeh picture hai.\nExample:\n<h1>Mera Page</h1>"
    },
    {
      keys: ["css kya", "what is css", "css kia", "css hai"],
      topic: "css",
      text: "CSS kapray hai — color, size, center.\nFormula:\nselector { property: value; }\n\nh1 { color: darkgreen; }"
    },
    {
      keys: ["javascript kya", "js kya", "what is javascript", "what is js", "js kia"],
      topic: "js",
      text: "JavaScript harkat hai. Click pe kaam, number badalna, message dikhana.\nStart:\nalert(\"Salam Class 10\");"
    },
    {
      keys: ["farq", "difference", "html css js", "teenon", "3 cheez"],
      topic: "idea",
      text: "HTML = kya cheez hai\nCSS = kaisi dikhe\nJS = click pe kya ho\n\nPehle HTML, phir CSS, phir JS."
    },
    {
      keys: ["h1", "heading", "title tag"],
      topic: "html",
      text: "Heading tags:\n<h1>sab se bari</h1>\n<h2>thori chhoti</h2>\n...\n<h6>sab se chhoti</h6>\nPage pe normally ek hi h1 rakho."
    },
    {
      keys: ["paragraph", "<p", " p tag", "p tag"],
      topic: "html",
      text: "Normal text ke liye:\n<p>Yeh ek paragraph hai.</p>"
    },
    {
      keys: ["link", "anchor", "href", "a tag"],
      topic: "html",
      text: "Link:\n<a href=\"https://google.com\">Google</a>\nhref = kahan jana hai."
    },
    {
      keys: ["image", "img", "picture", "tasveer"],
      topic: "html",
      text: "Picture (close tag nahi):\n<img src=\"cat.jpg\" alt=\"cat\">\nsrc = file ka path\nalt = picture na chale to text"
    },
    {
      keys: ["button", "btn"],
      topic: "js",
      text: "Button:\n<button onclick=\"alert('Hi')\">Press me</button>\n\nonclick ke andar JS chalti hai."
    },
    {
      keys: ["list", "ul", "li", "bullet"],
      topic: "html",
      text: "List:\n<ul>\n  <li>Aam</li>\n  <li>Kela</li>\n</ul>\nul = list, li = ek item."
    },
    {
      keys: ["div"],
      topic: "html",
      text: "<div> ek box hai. Andar heading, text, button group karte ho. Khud screen pe text nahi likhta, container hai."
    },
    {
      keys: ["skeleton", "boilerplate", "structure", "html structure"],
      topic: "html",
      text: "Har page:\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Mera Page</title>\n</head>\n<body>\n  <h1>Salam</h1>\n</body>\n</html>\n\nhead = tab ka naam\nbody = jo dikhta hai"
    },
    {
      keys: ["color", "rang", "colour"],
      topic: "css",
      text: "Text rang:\nh1 { color: navy; }\n\nPeeche rang:\nbody { background: lightyellow; }\n\nNames: red, blue, green, navy, gold, black, white."
    },
    {
      keys: ["center", "align", "beech"],
      topic: "css",
      text: "Beech mein:\nh1 { text-align: center; }\n\nleft / center / right."
    },
    {
      keys: ["font-size", "size", "bada", "chhota"],
      topic: "css",
      text: "Text size:\np { font-size: 18px; }\nh1 { font-size: 32px; }"
    },
    {
      keys: ["padding", "margin", "border"],
      topic: "css",
      text: "padding = andar space\nmargin = bahar space\nborder = line\n\n.box {\n  padding: 12px;\n  margin: 10px;\n  border: 2px solid black;\n}"
    },
    {
      keys: ["style tag", "css kaise", "css lagao", "kaise lagaye"],
      topic: "css",
      text: "Asaan tareeqa, head ke andar:\n<style>\n  h1 { color: navy; }\n</style>"
    },
    {
      keys: ["alert"],
      topic: "js",
      text: "Popup message:\nalert(\"Salam Class 10\");"
    },
    {
      keys: ["variable", "let ", "dibba"],
      topic: "js",
      text: "Variable ek dibba hai:\nlet name = \"Ali\";\nlet score = 10;\nscore = score + 1;"
    },
    {
      keys: ["if ", "agar", "else"],
      topic: "js",
      text: "Agar / warna:\nif (score >= 10) {\n  alert(\"Jeet gaye\");\n} else {\n  alert(\"Phir try karo\");\n}"
    },
    {
      keys: ["onclick", "click"],
      topic: "js",
      text: "Click:\n<button onclick=\"alert('Hi')\">Press</button>\n\nYa color badlo:\n<button onclick=\"document.body.style.background='lightblue'\">Rang</button>"
    },
    {
      keys: ["pehli page", "first page", "poori page", "sample page", "starter", "template", "banao page", "page banao"],
      topic: "page",
      text: "Notepad mein save karo index.html:\n\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Mera Page</title>\n  <style>\n    body { font-family: Arial; background: #f3efe6; text-align: center; }\n  </style>\n</head>\n<body>\n  <h1>Mera Pehla Website</h1>\n  <p>Class 10 coding start.</p>\n  <button onclick=\"alert('I can code')\">Press</button>\n</body>\n</html>"
    },
    {
      keys: ["ghalti", "error", "mistake", "nahi chal", "kaam nahi"],
      topic: "mistakes",
      text: "Pehle yeh check karo:\n1. Tag band hai? <h1>Hi</h1>\n2. File .html save hai, .txt nahi\n3. color ki spelling\n4. CSS line ke end pe ;\n5. quotes ek jaisi \" \" "
    },
    {
      keys: ["practice", "mashq", "exercise", "homework"],
      topic: "practice",
      text: "20 minute:\n1. Apna naam h1 mein\n2. 2 lines p mein\n3. Heading center + color\n4. Button jo alert dikhaye\n5. Background lightyellow"
    },
    {
      keys: ["quiz", "sawal do", "test"],
      topic: "quiz",
      text: "Quiz:\nWebsite ki haddi kaun si hai — HTML, CSS ya JS?\n\nJawab likho."
    },
    {
      keys: ["whatsapp", "wa ", "number"],
      topic: "wa",
      text: "Main WhatsApp account nahi chala sakta. Yeh site wala bot hai.\nApne WhatsApp Business mein Greeting + Away message on karo."
    }
  ];

  function add(who, text) {
    const el = document.createElement("div");
    el.className = "bubble " + who;
    el.textContent = text;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
  }

  function think(raw) {
    const q = (" " + raw.toLowerCase().trim() + " ").replace(/[?!.,]/g, " ");
    if (!q.trim()) return "Kuch likho — jaise: HTML kya hai?";

    if (lastTopic === "quiz" && /html/.test(q)) {
      lastTopic = "html";
      return "Sahi. HTML haddi hai. Bonus: CSS kis liye hai?";
    }
    if (lastTopic === "quiz" && /css|js|javascript/.test(q)) {
      return "Qareeb. Pehla sawal: haddi HTML hai. CSS look hai, JS harkat hai.";
    }

    for (const row of replies) {
      if (row.keys.some(function (k) { return q.indexOf(k) !== -1; })) {
        lastTopic = row.topic;
        return row.text;
      }
    }

    if (lastTopic === "html") {
      return "HTML pe ho. Pocho: h1, p, link, img, list, skeleton.";
    }
    if (lastTopic === "css") {
      return "CSS pe ho. Pocho: color, center, font-size, padding.";
    }
    if (lastTopic === "js") {
      return "JS pe ho. Pocho: alert, variable, if, click.";
    }
    return "Samajh nahi aaya. Try: HTML kya hai / CSS kya hai / JS kya hai / pehli page banao / ghaltiyan / practice";
  }

  function send(text) {
    add("me", text);
    add("bot", think(text));
  }

  toggle.addEventListener("click", function () {
    box.classList.toggle("open");
    if (box.classList.contains("open")) input.focus();
  });
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      box.classList.remove("open");
    });
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    send(text);
  });

  document.querySelectorAll("[data-q]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      box.classList.add("open");
      send(btn.getAttribute("data-q"));
    });
  });

  add("bot", "Salam! Coding poocho. Neeche chips dabao ya type karo.");
})();
