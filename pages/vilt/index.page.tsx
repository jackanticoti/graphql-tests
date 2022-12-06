import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

function Page() {

    const query = gql`
    query {
        CourseById(id: "3c9c582b-6324-49b8-b1bf-d5aeff68c4ca") {
          title
          meetings {
            startDate
            location {
              name
            }
          }
        }
      }`

    const { data } = useQuery(query)

    

  return (
      <div>
        <h1>Hi</h1>
      </div>
  );
}

export { Page };