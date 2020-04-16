const imageContainer = document.getElementById("image");

const minId = 1;
const maxId = 9;
var i = 1;

function setImage(id) {
    imageContainer.src = id + ".png"
}

function nextPicture() {
    if (i === maxId)
        i = minId;
    else
        i++;
    setImage(i);
}

function previousPicture() {
    if (i === minId)
        i = maxId;
    else
        i--;
    setImage(i);
}

var intervalId = -1;

function switchPlay() {
    if (intervalId === -1) {
        intervalId = setInterval(nextPicture, 2000);
    } else {
        clearInterval(intervalId);
        intervalId = -1;
    }
}