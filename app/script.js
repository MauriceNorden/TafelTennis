function Exit() {
    const {
        ipcRenderer
    } = require('electron')
    ipcRenderer.invoke("exit");
    console.log("The Exit Button is pressed");
}

function Minimize() {
    const {
        ipcRenderer
    } = require('electron')
    ipcRenderer.invoke("min");
    console.log("The Exit Button is pressed");
}

function Maximize() {
    const {
        ipcRenderer
    } = require('electron')
    ipcRenderer.invoke("max");
    console.log("The Exit Button is pressed");
}





var player1Score = 0;
var player2Score = 0;
var player1Name = ``;
var player2Name = ``;
var loadedjson = ``;
const scorePage = document.getElementById("score-page");
const addPage = document.getElementById("add-page");





function setPlayerName() {
    console.log("The Set Player Name Button is pressed");

    player1Name = document.getElementById("player-1-name").value;
    player2Name = document.getElementById("player-2-name").value;

    document.getElementById("player-1-name-holder").innerHTML = player1Name;
    document.getElementById("player-2-name-holder").innerHTML = player2Name;
    scorePage.style.display = "block";
    addPage.style.display = "none";


}

function addScore(id) {
    console.log("The Add Score Button is pressed");
    if (id == 1) {
        player1Score++;
        document.getElementById("player-1-score").innerHTML = player1Score;
    } else {
        player2Score++;
        document.getElementById("player-2-score").innerHTML = player2Score;
    }
}




function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], {
        type: contentType
    });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function onDownload() {
    var jsonData = {
        name1: player1Name,
        name2: player2Name,
        p1score: player1Score,
        p2score: player2Score,
    }
    console.log(jsonData)
    download(JSON.stringify(jsonData), `${player1Name} v.s ${player2Name}.json`, "text/plain");
}


document.getElementById("submit-btn").addEventListener("click", setPlayerName);


function loadJson() {    
    player1Name = loadedjson.name1;
    player2Name = loadedjson.name2;
    player1Score = loadedjson.p1score;
    player2Score = loadedjson.p2score;

    document.getElementById("player-1-name-holder").innerHTML = player1Name;
    document.getElementById("player-2-name-holder").innerHTML = player2Name;
    document.getElementById("player-1-score").innerHTML = player1Score;
    document.getElementById("player-2-score").innerHTML = player2Score;
    scorePage.style.display = "block";
    addPage.style.display = "none";
    console.log("The Load Json Button is pressed");
}


window.addEventListener('load', function() {
    var upload = document.getElementById('fileInput');
    
    // Make sure the DOM element exists
    if (upload) 
    {
      upload.addEventListener('change', function() {
        // Make sure a file was selected
        if (upload.files.length > 0) 
        {
          var reader = new FileReader(); // File reader to read the file 
          
          // This event listener will happen when the reader has read the file
          reader.addEventListener('load', function() {
            loadedjson  = JSON.parse(reader.result); // Parse the result into an object 
            
            loadJson();
          });
          
          reader.readAsText(upload.files[0]); // Read the uploaded file
        }
      });
    }
  });







