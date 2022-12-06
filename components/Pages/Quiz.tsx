import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

type QuizProps = {
    id: string;
}

type Choice = {
  text: string;
  correct: boolean;
}

type Question = {
  text: string;
  choices: Choice[];
}

// type QuestionInput = {
//   body: string,
//   mustSelectAllCorrectChoices: boolean,
//   choices: [

//   ]
// }

function Quiz(props: QuizProps) {

    const [title, setTitle] = useState("")
    const [questions, setQuestions] = useState<Question[]>([]);

    const [answers, setAnswers] = useState<number[]>([]);

    const get_quiz_query = gql`
    query {
        Pages(identifiers: ["${props.id}"]) {
            __typename
            ... on QuizPage {
                title
                questions {
                    body
                    choices {
                        value
                        correct
                    }
                }
            }
        }
      }
    `

    const { data: quiz_data } = useQuery(get_quiz_query, {
        variables: { identifiers: props.id }
    });

    if (quiz_data) {
        
        const response = quiz_data.Pages[0].questions
        let questionsData: Question[] = []
        let newQuestion: Question;
        for (let i = 0; i < response.length; i++) {
            let choicesData: Choice[] = []
            let newChoice: Choice;
            for (let i2 = 0; i2 < response[i].choices.length; i2++) {
                newChoice = {
                    text: response[i].choices[i2].value,
                    correct: response[i].choices[i2].correct
                }
                choicesData.push(newChoice)
            }
            newQuestion = {
                text: response[i].body,
                choices: choicesData
            }
            questionsData.push(newQuestion)
        }
        
        useEffect(() => {
            setTitle(quiz_data.Pages[0].title)
            setQuestions(questionsData)
            let answersData: number[] = []
            for (let i = 0; i < quiz_data.Pages[0].questions.length; i++) {
              answersData.push(-1)
            }
            setAnswers(answersData)
        }, [])
    } 

    let answerItems;

    const questionItems = questions.map((question, index) => {
      // let answersData
      answerItems = question.choices.map((answer, index_2) => {
        return <h2
          key={`key-${index_2}`}
          className={`hover:bg-slate-100 rounded-lg m-2 px-3 hover:cursor-pointer
          ${ answers[index] === index_2 ? 'bg-green-200' : 'bg-slate-200'}`}
          onClick={() => {
            let oldAnswers = answers
            oldAnswers[index] = index_2
            setAnswers([...oldAnswers])
          }}
          >{answer.text}</h2>
      })
      return <div className='p-4' key={`key-${index}`}>
        <h1
          className='text-xl'>{question.text}</h1>
        {answerItems}
      </div>
    })

    let questionInputs = [];
    //console.log(questions)
    if (questions.length != 0 && answers.length != 0) {
      for (let i = 0; i < questions.length; i++) {

        let choices
        if (answers[i] == -1) {
          choices = [{
            valueArray: [questions[i].choices[0].text],
            correct: questions[i].choices[0].correct
          }]
        } else {
          choices = [{
            valueArray: [questions[i].choices[answers[i]].text],
            correct: questions[i].choices[answers[i]].correct
          }]
        }

        let questionInput = {
          body: questions[i].text,
          mustSelectAllCorrectChoices: true,
          choices: choices
        }
        questionInputs.push(questionInput)
      }
    }

    const submit_quiz_mutation = gql`
    mutation {
        CreateAssessmentAttempt(
          courseId: "b6c00977-99b4-4663-9d0e-7c39385cfc49"
          topicId: "872bfd0a-aeec-4b97-b7f1-24878f55323f", 
          questions: []
        )
    }`

    const [submitQuiz, { data: submitData }] = useMutation(submit_quiz_mutation);

    return (
        <div>
            <h1
              className='t text-xl'
              >{title}</h1>
            {questionItems}
            <div className='flex flex-row justify-center'>
              <h1
                className='hover:bg-slate-100 bg-slate-400 rounded-lg 
                m-2 px-3 hover:cursor-pointer w-72 text-xl text-center'
                onClick={() => {
                  // console.log(questionInputs)
                  // submitQuiz({ variables: { id: props.id } })
                  let newAnswers = []
                  for (let i = 0; i < answers.length; i++) {
                    newAnswers.push(-1)
                  }
                  setAnswers(newAnswers)
                }}
                >Submit Quiz</h1>
            </div>
        </div>
    );
}

export { Quiz };