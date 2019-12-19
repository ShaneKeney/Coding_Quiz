var startQuizEl = $("#quizDialog-container");
var questionTemplate = $("#quizCardContainer");

var TIMER_CONSTANT = questions.length * 15;

$("docuemnt").ready(() => {
    $('#start-quiz').on("click", startTimer);
    $('#start-quiz').on("click", startQuiz);

    //remove temporarily unless start quiz is clicked
    $('#quizCardContainer').remove();
    questionTemplate.removeClass("d-none"); //removed d-none so when it is appended it will show up in the body
});

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
            $("body").append(startQuizEl);

            //Rebind listeners for restarting quiz
            $("#start-quiz").on("click", startTimer);
            $("#start-quiz").on("click", startQuiz);
        }
    }, 1000);
}

function showQuestions() {
    $("body").append(questionTemplate);
}

function startQuiz() {
    $("#quizDialog-container").remove();

    showQuestions();
}