//if (localStorage.getItem("allowed") == "fadlse") {
  //  location.replace(
    //    "https://media.tenor.com/-ZLLANZU3lsAAAAd/ashneer-grover-shark-tank-india-memes.gif"
    //);
//}

questions_title = ["Q1. Lemonade Stand", "Q2. Checking target product pairs", "Q3. Magical Text Encryption/Decryption"];
questions_description = [
`
<p><strong>Problem Statement</strong></p>
<p>Two friends decided to start a lemonade stand business. They sell each cup of lemonade for 'x', and it costs them 'y' to make one cup. Your task is to create a program that calculates their profit based on the number of cups they have sold.</p>
<p><strong>Input</strong></p>
<ul>
<li>The number of lemonade cups sold (an integer).</li>
<li>Cost of making one cup</li>
<li>Selling price of one cup</li>
</ul>
<p><strong>Output</strong></p>
<ul>
<li>The total profit earned from selling lemonade.</li>
</ul>
<strong>Example</strong>
<p> The two friends sold 10 cups of lemonade and charged 20 Rupees for each cup. If it costs them 5 Rupees to make each cup, the profit earned will be 150.</p>
`,
`
<p><strong>Problem Statement</strong></p>
<p>Write a program that takes a list of integers and a target product as input and determines whether there are two distinct numbers in the list that multiply to form the target product. If such numbers exist, the program should output their indices. If no such pair of numbers exists, the program should indicate that.</p>
<p><strong>Input:</strong></p>
<ul>
<li>A list of integers</li>
<li>A target product</li>
</ul>
<p><strong>Output:</strong></p>
<ul>
<li>If there are two distinct numbers in the list that multiply up to the target product, output their indexes.</li>
<li>If no such pair of numbers exists, output &quot;No such pair exists.&quot;</li>
</ul>
<p><strong>Example:</strong></p>
<p>Input:
numbers = [11, 7, 11, 2, 3, 6]
target = 14</p>
<p>Output:
1 and 3 (Since 7 × 2 = 14) </p>

`,
`
<p><strong>Problem Statement</strong></p>
<p>You&#39;ve stumbled upon an ancient text that appears to be encrypted using a magical code. The code works as follows:</p>
<ol>
<li>Each letter in the original word is replaced by the letter that is exactly N positions ahead of it in the alphabet.</li>
<li>The alphabet wraps around, so if a letter goes past &#39;Z&#39;, it starts again from &#39;A&#39;.</li>
<li>Letters that do not lie in A-Z are considered &quot;magical&quot; characters. They should not be shifted.</li>
</ol>
<p>Your task is to implement a decoder that can decrypt these magical text and an encoder to encrypt these words.</p>
<p><strong>Input:</strong></p>
<ul>
<li>The value of N.</li>
<li>An ancient text consisting of uppercase alphabetic characters and magical characters</li>
<li>A normal text that needs to be encrypted into magical text</li>
</ul>
<p><strong>Output:</strong></p>
<ul>
<li>The decoded original text.</li>
<li>The encoded ancient text</li>
</ul>
<p><strong>Note:</strong></p>
<p>ASCII value of A is 65 and Z is 90</p>
<br>
<p><strong>Example:</strong></p>
<p>If the value of N=3 and you provide the Ancient Text - HELLO$WORLD, it should be decrypted to EBIIL$ZLOIA. <br><br>Also, if you provide the Normal Text - EBIIL$ZLOIA, it should be encrpypted to HELLO$WORLD</p>

`
]

status_div = document.querySelector("#status");
question = document.querySelector("#question");
tab_index = 0;
editor = document.getElementById("editor");
lineNumbers = document.querySelector(".line-numbers");
popup = document.querySelector(".popup");
popup_content = document.querySelector(".popup-content");
lifeline = document.getElementById("lifeline");
lifeline_count_span = document.getElementById("lifeline-count");
lifeline_count = 5;
timeout = null;
tabs = document.querySelectorAll(".tab");
code = ["", "", ""];
innerHTML = "";
email = "";
language = "";
submit_btn = document.getElementById("submit");
details = document.getElementById("details");
problem_statement = document.getElementsByClassName("problem-statement")[0];

function set_question() {
    question.innerText = questions_title[tab_index];
    problem_statement.innerHTML = questions_description[tab_index];

}

set_question();

function save_details() {
    email = document.getElementById("email").value;
    language = document.getElementById("language").value;
    details.style.display = "none";
}

function submit() {
    submit_btn.disabled = true;
    submit_btn.innerText = "Submitting...";
    sendRequest("submit", { email: email, code: code, language: language });

    location.href="index.html"
}

tabs.forEach((element) => {
    element.addEventListener("click", switch_tab);
});

function switch_tab(e) {
    tab_index = parseInt(e.target.getAttribute("tab"));
    editor.value = code[tab_index];
    generate_lines();
    tabs.forEach((element) => {
        element.style.backgroundColor = "transparent";
    });
    tabs[tab_index].style.backgroundColor = "#424959";
    editor.focus();
    handlerInput();
    set_question();
}

function use_lifeline() {
    if (lifeline_count > 0) {
        lifeline_count--;
        lifeline_count_span.innerText = lifeline_count;
        editor.style.color = "white";
        editor.style.caretColor = "white";
        setTimeout(function () {
            editor.style.color = "transparent";
            editor.style.caretColor = "transparent";
        }, 5000);

        if (lifeline_count == 0) {
            lifeline.disabled = true;
        }
    }
}

//Handling logic for leaving windows

function addEvent(obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    } else if (obj.attachEvent) {
        obj.attachEvent("on" + evt, fn);
    }
}

addEvent(document, "mouseout", function (evt) {
    if (evt.toElement == null && evt.relatedTarget == null) {
        popup.style.display = "block";
        popup_content.innerText =
            "⚠️ Leaving this page will result in disqualification";
    }
});

addEvent(document, "mouseenter", function (evt) {
    popup.style.display = "none";
});

is_blur = false;
window.onblur = blur;
window.onfocus = focus;

//Logic for Editor

function blur() {
    popup.style.display = "block";
    popup_content.innerText =
        "⚠️ You will be disqualified after 3 seconds of inactivity";
    timeout = setTimeout(function () {
        sendRequest("disqualify", { email: email }, function () {
            location.replace(
                "https://media.tenor.com/-ZLLANZU3lsAAAAd/ashneer-grover-shark-tank-india-memes.gif"
            );
            localStorage.setItem("allowed", false);
        });
    }, 5000);
}

function focus() {
    popup.style.display = "none";
    clearTimeout(timeout);
}

editor.addEventListener("select", function (e) {
    editor.selectionStart = editor.selectionEnd;
});

editor.addEventListener("input", handlerInput);
editor.addEventListener("input", function () {
    status_div.innerText = "Typing...";
});
editor.addEventListener("keyup", function () {
    status_div.innerText = "Idle";
});

function handlerInput(e) {
    if (editor.value[editor.value.length - 1] == "\n" || editor.value == "") {
        editor.style.caretColor = "white";
    } else {
        editor.style.caretColor = "transparent";
    }
    code[tab_index] = editor.value;
}

function generate_lines() {
    lines = editor.value.split("\n");
    const lineCount = lines.length;
    let lineNumbersHTML = "";
    for (let i = 1; i <= lineCount; i++) {
        lineNumbersHTML += `<p>${i}</p>`;
    }
    lineNumbers.innerHTML = lineNumbersHTML;
    const text = editor.value;
    const cursorPosition = editor.selectionStart;
    const cursor_lines = text.substr(0, cursorPosition).split("\n");
    const lineNumber = cursor_lines.length;
    x = lineNumbers.children[lineNumber - 1];
    x.style.fontWeight = "700";
    x.style.backgroundColor = "#424959";
}

editor.addEventListener("input", generate_lines);
editor.addEventListener("keyup", generate_lines);
generate_lines();
