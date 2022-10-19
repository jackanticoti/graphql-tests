import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

function Page() {

  let questionInputOne = {
    body: "<p>What state is Boston in?</p>",
    choices: [
      {
        valueArray: ["MA"]
      }
    ]
  }

  let questionInputTwo = {
    body: "<p>What sports team plays in Boston?</p>",
    choices: [
      {
        valueArray: ["Patriots"]
      }
    ]
  }

  let questionInputThree = {
    body: "<p>Is Harvard in Boston?</p>",
    choices: [
      {
        valueArray: ["Yes"]
      }
    ]
  }

  let questionInputs = [questionInputOne, questionInputTwo, questionInputThree]

  const mutation = gql`
  mutation CreateAssessmentAttemptMutation($courseId: ID!, $topicId: ID!, $questions: [QuestionInput!]!) {
      CreateAssessmentAttempt(courseId: $courseId, topicId: $topicId, questions: $questions) {
        id
      }
  }`

  const [submitQuiz, { data, loading, error }] = useMutation(mutation, {
    variables: {
      courseId: 'a09f9562-1150-45f4-95da-8c0b644ffa7e',
      topicId: '872bfd0a-aeec-4b97-b7f1-24878f55323f',
      questions: [...questionInputs]
    }
  });

  if (data) {
    console.log("We got data")
  }

  if (error) {
    console.log(error)
  }

  return (
      <div>   
        <h1
            className='hover:bg-slate-300 bg-slate-400 rounded-lg 
            m-2 px-3 hover:cursor-pointer w-72 text-xl text-center'
            onClick={() => {
                console.log("You clicked submit!")
                submitQuiz()
            }}
          >Submit Quiz</h1>
      </div>
  );
}

export { Page };