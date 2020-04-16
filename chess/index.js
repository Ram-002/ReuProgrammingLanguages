const names = ["a", "b", "c", "d", "e", "f", "g", "h"];
const defaultFile = "e2 e4 e7 e5 h2 h4 h7 h5 f2 f4 e5 f4";

const fileInput = document.getElementById("fileInput");
const fileInputPlaceholder = document.getElementById("fileInput-placeholder");
const fileInputDefault = document.getElementById("fileInput-default");

fileInputPlaceholder.addEventListener("click", function (e) {
    fileInput.click();
});

fileInputDefault.addEventListener("click", function (e) {
    prepareField(defaultFile);
});

fileInput.addEventListener("change", function (e) {
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

    document.body.appendChild(generateField(moves));
}

function generateField(moves) {
    const fieldContainer = document.createElement("div");
    fieldContainer.classList.add("field-container");

    const fieldBody = fieldContainer.appendChild(document.createElement("div"));
    fieldBody.classList.add("field-body");

    for (let rowCounter = 0; rowCounter < 8; rowCounter++) {
        const fieldRow = fieldBody.appendChild(document.createElement("div"));
        fieldRow.classList.add("field-row");
        fieldRow.classList.add((rowCounter % 2 === 0) ? "row-first-white" : "row-first-black");

        let fieldCellRowNumber = fieldRow.appendChild(document.createElement("div"));
        fieldCellRowNumber.classList.add("field-cell");
        fieldCellRowNumber.textContent = 8 - rowCounter;

        for (let cellCounter = 0; cellCounter < 8; cellCounter++) {
            const fieldCell = fieldRow.appendChild(document.createElement("div"));
            fieldCell.history = [];
            fieldCell.classList.add("field-cell");
            fieldCell.classList.add(names[cellCounter] + (8 - rowCounter));
            fieldCell.textContent = getChessForRowAndCell(8 - rowCounter, cellCounter + 1);
        }
    }

    const row = fieldBody.appendChild(document.createElement("div"));
    row.classList.add("field-row");

    let cell = row.appendChild(document.createElement("div"));
    cell.classList.add("field-cell");
    for (let i = 0; i < 8; i++) {
        const cell = row.appendChild(document.createElement("div"));
        cell.classList.add("field-cell");
        cell.textContent = names[i];
    }

    fieldContainer.appendChild(generateControls(parseMoves(moves), fieldContainer));
    return fieldContainer;
}


function parseMoves(text) {
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

function generateControls(moves, fieldContainer) {
    const container = document.createElement("div");
    container.classList.add("field-controls");

    const backwardButton = document.createElement("button");
    backwardButton.innerHTML = "<i class=\"material-icons\">arrow_back</i>";
    container.appendChild(backwardButton);
    backwardButton.moves = moves;
    backwardButton.classList.add("btn", "field-button");

    const forwardButton = document.createElement("button");
    forwardButton.innerHTML = "<i class=\"material-icons\">arrow_forward</i>";
    container.appendChild(forwardButton);
    forwardButton.moves = moves;
    forwardButton.classList.add("btn", "field-button");

    let movePointer = 0;

    forwardButton.addEventListener("click", function (e) {
        let moves = (e.target.moves) ? e.target.moves : e.target.parentElement.moves;
        if (moves.length <= movePointer) {
            return;
        }
        const from = fieldContainer.getElementsByClassName(moves[movePointer].from)[0];
        const to = fieldContainer.getElementsByClassName(moves[movePointer].to)[0];

        to.history.push(to.textContent);

        to.textContent = from.textContent;
        from.textContent = "";

        movePointer++;
    });

    backwardButton.addEventListener("click", function (e) {
        let moves = (e.target.moves) ? e.target.moves : e.target.parentElement.moves;
        if (movePointer === 0) {
            return;
        }
        const from = fieldContainer.getElementsByClassName(moves[movePointer - 1].to)[0];
        const to = fieldContainer.getElementsByClassName(moves[movePointer - 1].from)[0];

        to.textContent = from.textContent;
        from.textContent = from.history.pop();

        movePointer--;
    });

    return (container);
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
