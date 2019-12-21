var highScoreContainerEl = $("#highScoreContainer");
var highScoreElement = $("#highScoreElement");

$("docuemnt").ready(() => {
    $('#goBack').on("click", goToMainPage);
    $('#clearScores').on("click", clearScores);
    $('#highScoreElement').remove();

    renderHighScores();
});

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
        let addHighScore = highScoreElement;
        addHighScore.find("#highScoreText").text(`${index+1}. ${item.key} - ${item.value}`);

        //not working for some reason
        $("#highScoreContainer").append(addHighScore);
    });
}

function clearScores() {
    localStorage.clear();
    renderHighScores();
    $("#highScoreContainer").empty();
}