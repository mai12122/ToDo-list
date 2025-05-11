const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const task = inputBox.value.trim();
    if (task === '') {
        alert("You must write something!");
        return;
    }

    let li = document.createElement("li");
    li.textContent = task;

    li.ondblclick = function () {
        const editedText = prompt("Edit your task", li.textContent.replace("×", "").trim());
        if (editedText && editedText.trim() !== "") {
            li.firstChild.nodeValue = editedText.trim();
            saveData();
        }
    };

    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; 
    li.appendChild(span);

    listContainer.appendChild(li);
    inputBox.value = ""; 
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
