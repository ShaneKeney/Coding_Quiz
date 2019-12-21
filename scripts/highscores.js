var highScoreContainerEl = $("#highScoreContainer");
var highScoreElement = $("#highScoreElement");

var highScoreCon = document.querySelector("#highScoreContainer");
var highScoreEl = document.querySelector("#highScoreElement");

$("docuemnt").ready(() => {
    $('#goBack').on("click", goToMainPage);
    $('#clearScores').on("click", clearScores);
    $('#highScoreElement').remove();

    renderHighScores();
});

//renderHighScores();

function goToMainPage() {
    window.location.href='./index.html';
}

function renderHighScores() {
    let scoresArray = [];

    for(var key in localStorage) {
        if(localStorage.getItem(key)) scoresArray.push({ key: key, value: localStorage.getItem(key)});
    }

    scoresArray.sort((a,b) => (parseInt(a.value) > parseInt(b.value)) ? -1 : 1);
    console.log(scoresArray);
    
    scoresArray.forEach((item, index) => {
        var highScoreDiv = document.createElement("div");
        highScoreDiv.className = " d-flex pl-3 py-2 rounded-lg mt-2 test";

        var highScoreText = document.createElement("p");
        highScoreText.className = "mb-0";
        highScoreText.id = "highScoreText";
        highScoreText.textContent = `${index+1}. ${item.key} - ${item.value}`;

        highScoreDiv.appendChild(highScoreText);
        highScoreCon.appendChild(highScoreDiv);
        
        // let addHighScore = $(highScoreElement);
        // addHighScore.find("#highScoreText").text(`${index+1}. ${item.key} - ${item.value}`);

        // console.log(highScoreElement);

        // //not working for some reason
        // $("#highScoreContainer").append(addHighScore);
    });
}

function clearScores() {
    localStorage.clear();
    renderHighScores();
    $("#highScoreContainer").empty();
}