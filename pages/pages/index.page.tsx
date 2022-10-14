import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

function Page() {   
    
    const [code, setCode] = useState('');

    const query = gql`
    query Pages($identifiers: [String!]!) {
        Pages(identifiers: $identifiers) {
            __typename
            ... on TextPage {
                title
                body
            }
        }
    }`

    const { data } = useQuery(query, {
        variables: { identifiers: ["1b52db0a-ebb7-452e-9954-07bca22bb935"] }
    });

    if (data) {
        console.log(data)
    }

    return (
        <div>
            <h1>Hey</h1>
        </div>
    );

}

export { Page };