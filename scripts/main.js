

var TIMER_CONSTANT = 75;

$('#start-quiz').on("click", startTimer);
$('#start-quiz').on("click", startQuiz);

function startTimer() {
    var counter = TIMER_CONSTANT;
    $("#timeIndicator").text(counter);

    setInterval(function() {
        counter --;
        if(counter >=0) {
            $("#timeIndicator").text(counter);
        }
        if(counter === 0) {
            clearInterval(counter);
        }
    }, 1000);
}

function startQuiz() {

}