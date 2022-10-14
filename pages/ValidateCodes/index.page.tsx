import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

function Page() {   
    
    const [code, setCode] = useState('');

    const validate_redemption_mutation = gql`
    mutation ValidateRedemptionCode($code: String!) {
        ValidateRedemptionCode(code: $code) {
          alreadyRedeemed
          codeExpired
          valid
        }
    }`

    const validate_registration_mutation = gql`
    mutation ValidateRegistrationCode($code: String!) {
        ValidateRegistrationCode(code: $code) {
          alreadyRedeemed
          valid
        }
    }`

    return (
        <div>
            <input
                className='p-4 w-96'
                type="text"
                value={code}
                placeholder="Enter code here"
                onChange={e => setCode(e.target.value)}
            />
            <h1
                className='hover:cursor-pointer hover:bg-slate-100 bg-slate-400 mt-2 ml-6 w-40 text-center rounded-md'
                onClick={() => {
                    console.log("hey")
                }}
                >Validate redemption code</h1>
            <h1
                className='hover:cursor-pointer hover:bg-slate-100 bg-slate-400 mt-2 ml-6 w-40 text-center rounded-md'
                onClick={() => {
                    console.log("hey")
                }}
                >Validate registration code</h1>
        </div>
    );
}

export { Page };