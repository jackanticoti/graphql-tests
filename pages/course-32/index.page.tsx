import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { GlobalTypes } from '@thoughtindustries/content'
import { Lesson, Section } from '@thoughtindustries/content/src/graphql/global-types';
import { use } from 'i18next';
import { CheckCircleIcon } from '@heroicons/react/24/solid'

function Page() {  
    
    let bostonPages = [
        "b564574c-947c-492c-9823-e94447c35c0b", 
        "6208f17f-ea8b-4564-9df0-14e334903ca4", 
        "4c46d7d3-92e1-42e5-baac-de79f181af36", 
        "3e8dbb99-e5fe-43fa-beda-f004550bddfd"
    ]

    let phillyPages = [
        "ddaa89c9-6b13-47a1-aec2-cd91309be505",
        "beb5fe44-11ca-4e1a-aa73-8c1610d9cd13"
    ]

    let pages = [bostonPages, phillyPages]
    
    const [sections, setSections] = useState<Section[]>([]);
    const [selectedPage, setSelectedPage] = useState("b564574c-947c-492c-9823-e94447c35c0b")

    const query = gql`
    query CourseById($id: ID!) {
        CourseById(id: $id) {
            title
            sections {
               title
               lessons {
                title
               } 
            }
        }
    }`

    const { data, error, loading } = useQuery(query, {
        variables: { id: "b6fcaf64-fbdd-4aae-a781-c616321f314b" }
    });

    if (data) {
        useEffect(() => {
            setSections(data.CourseById.sections)
        }, [])
    }

    // Sections
    const sectionItems = sections.map((section, index) => {

        if (section.lessons) {

            // Lessons
            const lessonItems = section.lessons.map((lesson, index2) => {

                // Pages
                const pageItems = pages[index2].map((page, index3) => {

                    

                    return <div 
                        key={`key${index3}`}
                        className={`my-4 flex flex-row justify-start hover:cursor-pointer rounded-lg
                        ${selectedPage == page ? 'bg-slate-50 text-black': 'text-slate-50'}`}
                        onClick={() => setSelectedPage(page)}>
                        <CheckCircleIcon className='h-6 w-6 mr-2'/>
                        <h1>{page}</h1>
                    </div>
                })

                return <div 
                    key={`key${index2}`}
                    className='bg-purple-600 rounded-lg p-5 mt-3'>
                    <h1 className='font-bold'> {lesson.title} </h1>
                    { pageItems }
                </div>
            })
    
            return <div 
                key={`key${index}`}
                className='p-5 w-96'>
                <h1
                    className='text-2xl text-center'>
                        Section: {section.title}
                </h1>
                {lessonItems}
            </div>
        }
    })

    const page_query = gql`
    query Pages($identifiers: [String!]!) {
        Pages(identifiers: $identifiers) {
            __typename
            ... on TextPage {
                title
                body
            }
        }
    }`

    const { data: page_data, error: page_error } = useQuery(page_query, {
        variables: { identifiers: [selectedPage] }
    });

    let pageItems;

    if (page_data) {
        console.log(page_data.Pages)
        pageItems = <div>
            <h1>{page_data.Pages[0].title}</h1>
            <h1>{page_data.Pages[0].body}</h1>
        </div>
    }

    let page = <div>
        {pageItems}
    </div>

    return (
        <div className='flex bg-slate-300'>
            {sectionItems}
            {page}
        </div>
    );

}

export { Page };