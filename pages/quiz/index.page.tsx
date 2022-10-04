import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import internal from 'stream';

type Choice = {
  text: string;
  correct: boolean;
}

type Question = {
  text: string;
  choices: [string];
}

function Page() {

    const [questions, setQuestions] = useState([]);
    const [questionOne, setQuestionOne] = useState("");

    const query = gql`
    query {
        LoadSuperQuizInfo(
          quizzes: "872bfd0a-aeec-4b97-b7f1-24878f55323f", 
          courseId: "b6c00977-99b4-4663-9d0e-7c39385cfc49") {
          questions {
            body
            choices {
              value
              correct
            }
          }
        }
      }`;

    const { data } = useQuery(query);

    if (data) {
        const response = data.LoadSuperQuizInfo.questions
        console.log(data.LoadSuperQuizInfo.questions)
        let questionsText: string[] = []
        for (var i = 0; i < response.length; i++) { 
            questionsText.push(response[i].body)
        }
        useEffect(() => {
            setQuestions(data.LoadSuperQuizInfo.questions)
            setQuestionOne(data.LoadSuperQuizInfo.questions[0].body)

        })
    }

    let quiz;
    for (var i = 0; i < questions.length; i++) { 
        console.log(questions[i].body)
        console.log(questions[i].choices)
    }

    let questionsFake = ["What's your favorite color?", "Was 1999 a leap year?", 
    "What is the capital of CT?"]
    let answerItems

    let answers = [["Red", "Green", "Blue"], ["Yes", "No"], ["Hartford", "NYC", "Boston"]]
    const questionItems = questionsFake.map((question, index) => {
      answerItems = answers[index].map((answer) => {
        return <h2
          className='hover:bg-slate-100 rounded-lg bg-slate-200 m-2 px-3'
          >{answer}</h2>
      })
      return <div className='p-4'>
        <h1>{question}</h1>
        {answerItems}
      </div>
    })

    return (
        <div>
            {questionItems}
        </div>
    );
}

export { Page };