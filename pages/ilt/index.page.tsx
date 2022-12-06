// Use login query

import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

function Page() {

    const query = gql`
    query {
      CourseById(id: "12f76c95-0e88-4837-8400-3a6a77a705d4") {
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
        <h1>HIIIIIIII!</h1>
      </div>
  );
}

export { Page };