const names = ["a", "b", "c", "d", "e", "f", "g", "h"];
const defaultFile = "e2 e4 e7 e5 h2 h4 h7 h5 f2 f4 e5 f4";

const fileInput = document.getElementById('fileInput');
const fileInputPlaceholder = document.getElementById("fileInput-placeholder");
const fileInputDefault = document.getElementById("fileInput-default");

fileInputPlaceholder.addEventListener("click", ev => {
    fileInput.click();
});

fileInputDefault.addEventListener("click", ev => {
    prepareField(defaultFile);
});

fileInput.addEventListener('change', function (e) {
    const file = fileInput.files[0];

    const reader = new FileReader();

    reader.onload = function (e) {
        prepareField(reader.result);
    };

    reader.readAsText(file);

});

function prepareField(moves) {
    fileInputPlaceholder.style.display = "none";
    fileInputDefault.style.display = "none";

    let table = generateTable();
    generateControls(parseReplay(moves), table);
    document.body.appendChild(table);
}

function generateTable() {
    const table = document.createElement("table");
    table.classList.add("field");
    table.createTBody().classList.add("field-body");
    for (let rowCounter = 0; rowCounter < 8; rowCounter++) {
        const row = table.insertRow();
        row.classList.add("row");
        row.classList.add((rowCounter % 2 === 0) ? "fw" : "fb");
        let cell = row.insertCell();
        cell.classList.add("cell");
        cell.textContent = 8 - rowCounter;
        for (let cellCounter = 0; cellCounter < 8; cellCounter++) {
            const cell = row.insertCell();
            cell.classList.add("cell");
            cell.classList.add(names[cellCounter] + (8 - rowCounter));
            cell.textContent = getChessForRowAndCell(8 - rowCounter, cellCounter + 1);

        }
    }
    const row = table.insertRow();
    row.classList.add("row");
    row.insertCell().classList.add("cell");
    for (let i = 0; i < 10; i++) {
        const cell = row.insertCell();
        cell.classList.add("cell");
        cell.textContent = names[i];
    }
    return table;
}


function parseReplay(text) {
    const tokens = text.split(" ");
    if (tokens % 2 === 1) {
        alert("Invalid file")
    }
    const out = [];
    for (let i = 0; i < Math.floor(tokens.length / 2); i++) {
        out[i] = {from: tokens[2 * i], to: tokens[2 * i + 1]};
    }
    return out;
}

function generateControls(moves, table) {
    const footer = table.createTFoot();
    footer.classList.add("field-foot")
    const cell = footer.insertRow().insertCell();
    cell.colSpan = 8;

    const backwardButton = document.createElement("button");
    backwardButton.innerText = "Backward";
    cell.appendChild(backwardButton);
    backwardButton.moves = moves;
    backwardButton.classList.add("btn");

    const forwardButton = document.createElement("button");
    forwardButton.innerText = "Forward";
    cell.appendChild(forwardButton);
    forwardButton.moves = moves;
    forwardButton.classList.add("btn");

    let movePointer = 0;

    forwardButton.addEventListener("click", function (e) {
        const moves = e.target.moves;
        if (moves.length <= movePointer) {
            return;
        }
        const from = table.getElementsByClassName(moves[movePointer].from)[0];
        const to = table.getElementsByClassName(moves[movePointer].to)[0];


        to.textContent = from.textContent;
        from.textContent = "";

        movePointer++;
    });
}

function getChessForRowAndCell(row, cell) {
    if (row === 2) {
        return "♙";
    } else if (row === 7) {
        return "♟";
    } else if (row === 1 || row === 8) {
        switch (cell) {
            case 1:
            case 8:
                return (row === 1) ? "♖" : "♜";
            case 2:
            case 7:
                return (row === 1) ? "♘" : "♞";
            case 3:
            case 6:
                return (row === 1) ? "♗" : "♝";
            case 4:
                return (row === 1) ? "♕" : "♛";
            case 5:
                return (row === 1) ? "♔" : "♚";
        }
    } else {
        return "";
    }
}
