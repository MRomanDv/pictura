const questionsArray = [
    {
        question:'¿This famous Dutch artist was famous for painting sunflowers and "Starry Night", what is his name?',
        choices : ['Van Gogh','Monet','Rembrandt','Da Vinci'],
        answer: 'Van Gogh'
    },
    {
        question:'Famous for his "abstract" paintings, this Spanish painter was known for his melting clocks in "The Persistence of Time."',
        choices : ['Salvador Dali','Jackson Pollock','Pablo Picasso','Any Warhol'],
        answer: 'Salvador Dali'
    },
    {
        question:'The epic ceiling of the Sistine Chapel in Vatican City was painted by which Italian Renaissance painter?',
        choices : ['Leonardo','Raphael','Michaelangelo','Donatello'],
        answer: 'Michaelangelo'
    },
    {
        question:'¿The Mona Lisa is famous for her secretive smile, but do you know who painted her??',
        choices : ['Caravaggio','Modigliani','Michaelangelo','Da Vinci'],
        answer: 'Da Vinci'
    },
    {
        question:'This female American painter was famous for her large flowers, do you know who she is?',
        choices : ['Georgia O Keefe','Tamara de Lempicka','Leonora Carrington','Frida Kahlo'],
        answer: 'Georgia O Keefe'
    },
    {
        question:'This "abstract" American painter was known for his large "drip" style paintings, can you name him?',
        choices : ['Bob Ross','Diego Rivera','Andy Warhol','Jackson Pollock'],
        answer: 'Jackson Pollock'
    },
    {
        question:'¿This Spanish painter was known for his "blue" period and for "cubism," what is his name?',
        choices : ['Vincent Van Gogh','Pablo Picasso','Leonardo Da Vinci','Diego Rivera'],
        answer: 'Pablo Picasso'
    },
    {
        question:'¿A book and movie were based on this famous painting by Johannes Vermeer, do you know its name?',
        choices : ['The Girl by the Window','The Girl with the Pearl Earring','The Girl with the Blue Head Scarf','The Girl with the Dragon Tattoo'],
        answer: 'The Girl with the Pearl Earring'
    },
    {
        question:'¿The Luncheon of the Boating Party was painted by which French Impressionist painter?',
        choices : ['Degas','Renoir','Monet','Manet'],
        answer: 'Renoir'
    },
    {
        question:'¿Can you name the Norwegian painter who created "The Scream?',
        choices : ['Edvard Munch','Frida Kahlo','Frida Kahlo','Mucha','Gustav Klimt'],
        answer: 'Edvard Munch'
    },
    {
        question:'Michelangelo Caravaggio birth place',
        choices : ['Roma','Milán','Florencia'],
        answer: 'Milán'
    },
    {
        question:'¿Diego Velazquez Caravaggio birth place?',
        choices : ['Madrid','Andorra','Sevilla'],
        answer: 'Sevilla'
    }
]

//SORT RANDOMLY
questionsArray.sort(()=> Math.random() - .5)


//question class object

class Question {
    constructor(text,choices,answer) {
        this.text = text 
        this.choices = choices
        this.answer = answer
    }
    correctAnswer(guessAnswer){
      return  guessAnswer == this.answer
    }
}

//maping array though the Question object

const questions = questionsArray.map(element => new Question(element.question,element.choices,element.answer)) 
console.log(questions)

// Logic Functionality class

class Functionality {
    index = 0
    score = 0
    constructor(questions){
        this.questions = questions
    }
    getIndex(){
        return this.questions[this.index]
    }
    chooseAnswer(answer){
        if(this.getIndex().correctAnswer(answer)){
            this.score ++
        }
        this.index ++
    }
    quizEnd(){
       return this.questions.length == this.index
    }
    

}

//UX/UI

class UxUi {
    constructor(){}

    showQuestions(questionElement) {
        const paintQuestion = document.querySelector('.question')
        paintQuestion.innerHTML = questionElement
    }
    showChoices(choices , callback) {
        const choicesContainer = document.querySelector('.choices-container')
        
        choicesContainer.innerHTML = ''
        for(let i = 0; i < choices.length; i++) {
            const button = document.createElement('button')
            button.className = 'button'
            button.innerText = choices[i]
            button.addEventListener('click',()=> callback(choices[i]))
            choicesContainer.append(button)
        }
    }
    showQnumber(questionIndex){
        const questionNumber = document.querySelector('.number')
        questionNumber.innerText ='Question no.' + questionIndex
    }
    showScore(scoreNumber){
        const scoreContainer = document.querySelector('.score')
        scoreContainer.innerText = scoreNumber 
    }
    showFinalScore(finalScore){
        const quizContainer = document.querySelector('.quiz-container')
        quizContainer.classList.add('font')
        quizContainer.innerText = 'You have finish the Quiz! you final score is ' + finalScore
    }
}


//APP 
const ui = new UxUi
const functionality = new Functionality(questions)

const quiz = (ui,functionality)=> {
    if(functionality.quizEnd()){
        ui.showFinalScore(functionality.score)
    }else {
        ui.showQuestions(functionality.getIndex().text)
        ui.showQnumber(functionality.index + 1)
        ui.showScore(functionality.score)
        ui.showChoices(functionality.getIndex().choices, (choice)=>{
            functionality.chooseAnswer(choice) 
            quiz(ui,functionality)
        })

    }
}

quiz(ui,functionality)
