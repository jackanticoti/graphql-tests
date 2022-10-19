// Use login query

import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

function Page() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const query = gql`
    query {
        CurrentUser {
            id
        }
    }
    `

    const { data } = useQuery(query)

    let loggedInMessage;
    if (data) {
        loggedInMessage = <div>
            <h1>User is already logged in!</h1>
        </div>
    }


  const mutation = gql`
  mutation Login(
    $email: String!,
    $password: String!
  ) {
    Login(
      email: $email,
      password: $password
    ) 
  }`

  const [login, { data: login_data, loading, error }] = useMutation(mutation, {
    variables: {
      email: email,
      password: password
    }
  });

  let errorMessage;

  if (error) {
    console.log(error)
    errorMessage = <div>
        <h1>Sorry there was an error, please try again!</h1>
    </div>
  }

  return (
      <div>
            {/* { loggedInMessage } */}
            <h1>Username:</h1>
            <input
                className='p-4 w-96'
                type="text"
                value={email}
                placeholder="Enter email here"
                onChange={e => setEmail(e.target.value)}
            />
            <h1>Password:</h1>
            <input
                className='p-4 w-96'
                type="text"
                value={password}
                placeholder="Enter password here"
                onChange={e => setPassword(e.target.value)}
            />
            <h1
                className='hover:bg-slate-300 bg-slate-400 rounded-lg 
                m-2 px-3 hover:cursor-pointer w-72 text-xl text-center'
                onClick={() => {
                    console.log("Login clicked")
                    login()
                    setEmail("")
                    setPassword("")
                }}
                >Login</h1>
            { errorMessage }
      </div>
  );
}

export { Page };