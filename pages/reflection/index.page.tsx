import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

function Page() {

    const query = gql`
    query {
        Pages(id: "ef8ca9f4-9925-4dd8-bb3b-22cf3a433fe4") {
            
        }
    }`

    const { data } = useQuery(query)

    

  return (
      <div>
        <h1>H!</h1>
      </div>
  );
}

export { Page };