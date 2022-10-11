import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

function Page() {    

    const mutation = gql`
    mutation {
        DestroyBookmark(
            id: ""
        )
    }`
    
    useEffect(() => {
        useMutation(mutation)
    }, [])


    return (
        <div>
            <h1>Sample mutations</h1>
            <h1>Mutate one</h1>
            <h1>Mutate two</h1>
            <h1>Mutate three</h1>
        </div>
    );
}

export { Page };