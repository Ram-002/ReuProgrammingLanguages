function createElementWithInnerText(tagName, text) {
    let el = document.createElement(tagName);
    el.innerText = text;
    return el;
}

function generateMonth(count, off, monthId) {
    let table = document.createElement("table");
    let head = table.createTHead();
    let cell = head.insertRow(0).insertCell(0);
    cell.colSpan = 7;
    cell.innerText = (function (month) {
        switch (month) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June ";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";

        }
    })(monthId);
    head.firstChild.colSpan = 7;
    {
        let tr = table.insertRow();
        tr.insertCell().innerText = "Mon";
        tr.insertCell().innerText = "Tue";
        tr.insertCell().innerText = "Wed";
        tr.insertCell().innerText = "Thu";
        tr.insertCell().innerText = "Fri";
        tr.insertCell().innerText = "Sat";
        tr.insertCell().innerText = "Sun";
    }

    for (let i = 0; i < count + off - 1; i++) {
        let tr;
        if (i % 7 === 0) {
            tr = table.insertRow();
            table.appendChild(tr);
        } else {
            tr = table.lastChild;
        }

        let td = tr.insertCell();
        if (i >= off - 1) {
            td.innerText = i - off + 2;
        }
    }

    if ((count + off - 1) % 7 !== 0)
        for (let i = 0; i < 7 - ((count + off - 1) % 7); i++)
            table.lastChild.insertCell();

    return table;
}

function printYear() {
    let calendarDivs = [
        document.getElementById("calendar-1"),
        document.getElementById("calendar-2"),
        document.getElementById("calendar-3")
    ];
    calendarDivs.forEach(value => {
        while (value.firstChild)
            value.removeChild(value.firstChild)
    });
    const year = document.getElementById("date").value;
    for (let i = 0; i < 12; i++) {
        let weekStart = new Date(year, i, 1).getDay();
        let dayCount = new Date(year, i + 1, 0).getDate();
        let table = generateMonth(dayCount, weekStart, i);
        table.className += "mdl-card--border mdl-shadow--4dp";
        calendarDivs[Math.floor(i / 4)].appendChild(table);
    }
}

printYear();
