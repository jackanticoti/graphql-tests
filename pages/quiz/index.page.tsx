import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { GlobalTypes,  } from '@thoughtindustries/content'

type Choice = {
  text: string;
  correct: boolean;
}

type Question = {
  text: string;
  choices: Choice[];
}

function Page() {

    const [questions, setQuestions] = useState<Question[]>([]);

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

        LoadAssesmentAttemptWithQuestions(
          courseId
        ) {

        }

      }`;

      // This is "This is a sample quiz" of Course 1
      // What is your favorite color
      // Blue Red Green
      // What is the capital of Connecticut
      // Hartford, New Haven, NYC
      // Was 1999 a leap year
      // True, False

      // I want to make a mutation that represents the following quiz attempt
      // Red, Incorrect
      // Hartford, Correct
      // False, Correct

      const questionInputOne = {
        body: "What is your favorite color?",
        choices: [
          {value: "Red", correct: false},
          {value: "Red", correct: false},
          {value: "Red", correct: false},
        ]
      }

      const questionInputTwo = {
        body: "What is the capital of connecticut?",
        choices: [
          {value: "Hartford", correct: false},
          {value: "New Haven", correct: false},
          {value: "NYC", correct: false},
        ]
      }

      const questionInputThree = {
        body: "Was 1999 a leap year?",
        choices: [
          {value: "Red", correct: false
        }]
      }

      const questionInputs = [questionInputOne, questionInputTwo, questionInputThree]
      
      const mutation = gql`
      mutation {
          CreateAssessmentAttempt(
            courseId: "b6c00977-99b4-4663-9d0e-7c39385cfc49"
            topicId: "872bfd0a-aeec-4b97-b7f1-24878f55323f", 
            questions: [${questionInputOne}]
          }
      }`
  
      const { data } = useQuery(query);

      if (data) {
        const response = data.LoadSuperQuizInfo.questions
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
          setQuestions(questionsData)
        }, [])
      } 

    let answerItems;

    const questionItems = questions.map((question, index) => {
      answerItems = question.choices.map((answer, index_2) => {
        return <h2
          key={`key-${index_2}`}
          className='hover:bg-slate-100 rounded-lg bg-slate-200 m-2 px-3'
          >{answer.text}</h2>
      })
      return <div className='p-4' key={`key-${index}`}>
        <h1
          className=''>{question.text}</h1>
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