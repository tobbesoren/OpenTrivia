//https://opentdb.com/api.php?amount=10&category=12&difficulty=medium


const apiUrl = 'https://opentdb.com/api.php?amount=10&category=12&difficulty=medium'

const button=document.querySelector('#fetch');
const currentScore = document.getElementById('current_score')
let score = 0;



button.addEventListener('click', async e => {
    clearData();
    console.log('1. Click');
    const response = await fetch(apiUrl);
    console.log('2. got response', response);

    const quizData = await response.json();
    console.log('3. got data:', quizData);
    const questions = quizData.results;
    createQuestions(questions);
})


const clearData = () => {
    document.getElementById('questions').innerHTML="";
    score = 0;
    currentScore.innerText = score;
}


const createQuestions = (questions) => {
    let questionNumber = 1;
    const questionContainer = document.querySelector('#questions');
    questions.forEach(question => {
      const questionElement = createQuestionElement(question, questionNumber);
      questionContainer.appendChild(questionElement);
      questionNumber ++;
    });
}

const createQuestionElement = (question, questionNumber) => {
    const questionElement = document.createElement('div');
    questionElement.className='question';
    questionElement.id=questionNumber;

    const questionHeading = document.createElement('h2');
    questionHeading.innerHTML = question.question;

    questionElement.appendChild(questionHeading);

    let options = question.incorrect_answers;

    const randomIndex = Math.floor(Math.random() * options.length +1);
    options.splice(randomIndex, 0, question.correct_answer);

    
    options.forEach(option => {
        const optionElement = createOptionElement(option, question.correct_answer);
        if(optionElement.innerText == question.correct_answer) {
            optionElement.classList.add('correct')
        }
        questionElement.appendChild(optionElement);
    })
    return questionElement;
}


const createOptionElement = (option, correct_answer) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.innerHTML = option;

    optionElement.addEventListener('click', e => {

        //Check if question is already answered
        if (optionElement.parentNode.classList.contains('answered')) {
            return
        } else {
            optionElement.parentNode.classList.add('answered');
        }
        
        if (option == correct_answer) {
            optionElement.classList.add('correct_answer');
            
            score ++;
            currentScore.innerText = score;
           
            console.log('Rätt!');
        } else {
            optionElement.classList.add('wrong_answer');
            revealCorrectAnswer(optionElement);
            console.log('Fel!');
        }
        //questionAnswered(optionElement, option, correct_answer);
    })
    return optionElement;
}


const revealCorrectAnswer = (optionElement) => {
    console.log(optionElement.parentNode.children);

    Array.from(optionElement.parentNode.children).forEach(child => {
        console.log(child);
        if (child.classList.contains('correct')) {
            child.classList.add('display_correct_answer');
        }
    })
}


const questionAnswered = (optionElement, option, correct_answer) => {
    
    const question = optionElement.parentNode;
    //const options=document.getElementById(qu)
    
    

    console.log(question);
}