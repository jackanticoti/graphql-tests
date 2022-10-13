import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

function Page() {    

    const mutation = gql`
    mutation {
        DestroyBookmarkFolder(
            id: "6331a88b-a0ac-4d7a-9127-7fdd4330b403"
        )
    }`

    return (
        <div>
            <h1>Sample mutations</h1>
            
        </div>
    );
}

export { Page };