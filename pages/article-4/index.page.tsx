import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

function Page(course_id: String) {

  const course_query = gql`
  query CourseQuery($id: ID!) {
    CourseById(id: $id) {
      Section {
        Lesson {
          Pages {
            id
          }
        }
      }
    }
  }`

  const { data: course_data } = useQuery(course_query, {
    variables: { id: course_id }
  })

  if (course_data) {
    let page_id = course_data.CourseById.some_other_stuff
  }

  const query = gql`
    query {
        Pages(identifiers: [""]) {
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
  

  return (
      <div>   
        <h1>I am an article</h1>
      </div>
  );
}

export { Page };