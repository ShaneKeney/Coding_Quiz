var startQuizEl = $("#quizDialog-container");
var questionTemplate = $("#quizCardContainer");

var TIMER_CONSTANT = questions.length * 15;
var currentQuestionIndex = 0;

$("docuemnt").ready(() => {
    $('#start-quiz').on("click", startTimer);
    $('#start-quiz').on("click", startQuiz);

    //remove temporarily unless start quiz is clicked
    $('#quizCardContainer').remove();
    questionTemplate.removeClass("d-none"); //removed d-none so when it is appended it will show up in the body
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
            $("body").append(startQuizEl);

            //Rebind listeners for restarting quiz
            $("#start-quiz").on("click", startTimer);
            $("#start-quiz").on("click", startQuiz);
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

function showNextQuestion(lastAnswerCorrect = undefined) {
    //first remove old instance in order to remove prev attached event listeners
    $('#quizCardContainer').remove();

    //if there is no next question than cleanup and break;
    if(currentQuestionIndex >= questions.length) {
        $('#quizCardContainer').remove();

        //TODO: render the ending prompt rather than another question


        //Reset timer to original value
        TIMER_CONSTANT = questions.length * 15;
        currentQuestionIndex = 0;

        return;
    }

    let newQuestion = createQuestionElement(currentQuestionIndex);

    //show right or wrong
    if(lastAnswerCorrect) {
        newQuestion.find("#answerStatusContainer").remove("d-none"); 
    }

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
    }

    showNextQuestion(answerStatus);
}

function startQuiz() {
    $("#quizDialog-container").remove();

    showNextQuestion();
}