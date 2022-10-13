import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

function Page() { 
  const create_mutation = gql`
  mutation CreateComment($commentableId: ID!, $body: String!) {
    CreateComment(
      commentableId: $commentableId,
      commentableType: discussionBoard,
      notificationsEnabled: false,
      body: $body
    ) {
      id
    }
  }`

  const [createComment, { data, error, loading }] = useMutation(create_mutation);

  if (error) {
    console.log(error)
  }


  const [comment, setComment] = useState('');
  const [commentableId, setCommentableId] = useState("fe13ed2c-5ab3-498a-9714-88f51393543d");

  return (
    <div className='m-10'>
      <input
        className='p-4 w-96'
        type="text"
        value={comment}
        placeholder="Enter comment here"
        onChange={e => setComment(e.target.value)}
       />
      <h1
          className='hover:cursor-pointer hover:bg-slate-100 bg-slate-400 mt-2 ml-6 w-40 text-center rounded-md'
          onClick={() => {
            createComment({ variables: { commentableId: commentableId, body: comment } })
            setComment("")
          }}
          >Create comment</h1>
    </div>
  );
}

export { Page };