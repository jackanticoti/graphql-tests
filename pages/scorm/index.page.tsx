import React, {useState} from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

function Page() {

    const [url, setUrl] = useState("");

    const query = gql`
    query {
        RusticiLaunchScorm(
          id: "57132a89-89c0-4eaf-87e0-2f48da983562", 
          isPreview: false,
          type: course
        ) {
          url
        }
    }`

    const { data } = useQuery(query);

    console.log(data)

    if (data) {
        console.log(data)
        console.log(data.RusticiLaunchScorm.url)
        //window.open(data.RusticiLaunchScorm.url)
    }

    return (
        <div>
            <h1>Hey hey hey</h1>
        </div>
    );
}

export { Page };
