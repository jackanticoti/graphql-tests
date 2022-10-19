import React, { useState, useEffect } from 'react';

type TextProps = {
    title: string;
    body: string;
}

function Text(props: TextProps) {

    return (
        <div>
            <h1
                className='text-4xl'
                >{props.title}</h1>
            <h1>{props.body}</h1>
        </div>
    );
}

export { Text };