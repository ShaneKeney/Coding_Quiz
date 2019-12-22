var startQuizEl = $("#quizDialog-container");
var questionTemplate = $("#quizCardContainer");
var endPrompt = $("#inputUserPrompt");

var TIMER_CONSTANT = questions.length * 15;
var currentQuestionIndex = 0;
var finalScore = "";

$("docuemnt").ready(() => {
    $('#start-quiz').on("click", startTimer);
    $('#start-quiz').on("click", startQuiz);

    //remove temporarily unless start quiz is clicked
    $('#quizCardContainer').remove();
    $("#inputUserPrompt").remove();
    questionTemplate.removeClass("d-none"); //removed d-none so when it is appended it will show up in the body

    //bind change event to highscore submit for form validation
    let submitHighScoreBttn = endPrompt.find("#highScoreSubmission");
    submitHighScoreBttn.submit(submitHighScore);
});

function startTimer() {
    $("#timeIndicator").text(TIMER_CONSTANT);

    setInterval(function() {
        TIMER_CONSTANT --;
        if(TIMER_CONSTANT >=0) {
            $("#timeIndicator").text(TIMER_CONSTANT);
        }
        if(TIMER_CONSTANT === 0) {
            clearInterval(TIMER_CONSTANT);
            endPrompt.find("#answerStatusContainer").addClass("d-none");
            showEndPrompt();
        }
    }, 1000);
}

function showAnswerStatus() {
    let count = 2;

    //displayed in multipleChoiceClick event function
    //Hidden after timer expires
    setInterval(function() {
        count--;
        if(count ===0) {
            clearInterval(count);
            $("#answerStatusContainer").addClass("d-none");
        }
    }, 1000)
}

function showNextQuestion() {
    //first remove old instance in order to remove prev attached event listeners
    $('#quizCardContainer').remove();

    //if there is no next question than cleanup and break;
    if(currentQuestionIndex >= questions.length) {
        endPrompt.find("#answerStatusContainer").removeClass("d-none");
        showEndPrompt();
        return;
    }

    let newQuestion = createQuestionElement(currentQuestionIndex);

    $("body").append(newQuestion);
}

function createQuestionElement(questionIndex) {
    console.log(`Creating Question ${questionIndex} element`);

    let questionElement = questionTemplate;

    //First create the question header
    questionElement.find("#question-header").text(questions[questionIndex].title);

    //Next render the button choices
    let i=0;
    questionElement.find("#button-container").find("button").each(function() {
        $(this).html(`${questions[questionIndex].choices[i]}`);
        
        //Render button click event handler
        $(this).on("click", multipleChoiceClick);
        $(this).on("click", showAnswerStatus);

        i++;
    });

    return questionElement;
}

function multipleChoiceClick(event) {
    //show answer status
    $("#answerStatusContainer").removeClass("d-none");

    currentQuestionIndex++; //move to next question

    let answerStatus;
    //check to see if the answer is correct or incorrect and show prompt
    if(event.currentTarget.innerHTML === questions[currentQuestionIndex - 1].answer) {
        $("#answerStatus").text("CORRECT!")
        answerStatus = true;
    } else {
        $("#answerStatus").text("WRONG!")
        answerStatus = false;
        TIMER_CONSTANT-=10;
    }

    finalScore = TIMER_CONSTANT;

    if(currentQuestionIndex >= questions.length) {
        answerStatus ? endPrompt.find("#answerStatus").text("CORRECT!") : endPrompt.find("#answerStatus").text("WRONG!");
    }

    showNextQuestion(answerStatus);
}

function startQuiz() {
    $("#quizDialog-container").remove();

    showNextQuestion();
}

function showEndPrompt() {
    $('#quizCardContainer').remove();

    //render the ending prompt rather than another question
    endPrompt.removeClass("d-none");

    if(finalScore === "") finalScore = "0";
    endPrompt.find("#finalScoreText").text(`Your final score is ${finalScore}`)
    $("body").append(endPrompt);

    //Reset timer to original value
    currentQuestionIndex = 0;
    TIMER_CONSTANT = 0;
    $("#timeIndicator").text("0");
}

function submitHighScore() {
    //event.preventDefault(); //I want to submit form and navigate away

    let highScoreInput = $("#inputInitials");
    let highScoreInitials = highScoreInput.val().trim();

    console.log(finalScore);

    if(highScoreInitials) {
        let currentUserScore = localStorage.getItem(highScoreInitials);

        if(currentUserScore > finalScore) return;

        localStorage.setItem(highScoreInitials, finalScore);
    } else {
        highScoreInput.attr("placeholder", "Please input initials...");
    }
}