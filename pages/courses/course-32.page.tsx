import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { GlobalTypes } from '@thoughtindustries/content'
import { Lesson, Section } from '@thoughtindustries/content/src/graphql/global-types';
import { use } from 'i18next';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Text } from '../../components/Pages/Text';
import { Quiz } from '../../components/Pages/Quiz';

function Page() {  
    
    // Once we update CourseById we can remove this hardcode
    let bostonPages = [
        "b564574c-947c-492c-9823-e94447c35c0b", 
        "6208f17f-ea8b-4564-9df0-14e334903ca4", 
        "4c46d7d3-92e1-42e5-baac-de79f181af36", 
        "3e8dbb99-e5fe-43fa-beda-f004550bddfd",
        //"1fee20ce-5c5a-492f-a1a6-5214ad918929" //this is the scorm file
    ]
    let bostonNames = ["About Boston", "Boston Quiz", "History of Boston", "Boston Today"]
    let phillyNames = ["About Philly", "Philly Quiz"]
    let phillyPages = [
        "ddaa89c9-6b13-47a1-aec2-cd91309be505",
        "beb5fe44-11ca-4e1a-aa73-8c1610d9cd13"
    ]

    let pages = [bostonPages, phillyPages]
    let pageNames = [bostonNames, phillyNames]
    
    const [sections, setSections] = useState<Section[]>([]);
    const [selectedPage, setSelectedPage] = useState("b564574c-947c-492c-9823-e94447c35c0b")
    const [firstName, setFirstName] = useState("");

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
    } else if (error) {
        console.log("There was an error calling CourseByID")
    }

    // const user_query = gql`
    // query CurrentUser {
    //     CurrentUser {
    //         id
    //         firstName
    //     }
    // }`

    // const { data: user_data } = useQuery(user_query);

    // if (data) {
    //     useEffect(() => {
    //         setFirstName(user_data.CurrentUser.firstName)
    //     }, [])
    // }

    

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
                        onClick={() => {
                            setSelectedPage(page)
                        }}>
                        <CheckCircleIcon className='h-6 w-6 mr-2'/>
                        <h1>{pageNames[index2][index3]}</h1>
                    </div>
                })

                return <div 
                    key={`key${index2}`}
                    className='bg-purple-600 rounded-lg p-5 mt-3'>
                    <h1 className='font-bold text-xl'> {lesson.title} </h1>
                    { pageItems }
                </div>
            })
    
            return <div 
                key={`key${index}`}
                className='p-5 w-96'>
                <h1
                    className='text-2xl text-center'>
                         Welcome to {section.title}
                </h1>
                {lessonItems}
            </div>
        }
    })

    // I need to add a scorm and a video

    const page_query = gql`
    query Pages($identifiers: [String!]!) {
        Pages(identifiers: $identifiers) {
            __typename
            ... on QuizPage {
                id
                title
                questions {
                choices {
                    correct
                    value
                }
                body
                }
            }
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

        // If text
        if (page_data.Pages[0].__typename == "TextPage") {
            pageItems = <Text 
                title={page_data.Pages[0].title}
                body={page_data.Pages[0].body}/>
        } 
        
        // If quiz
        else if (page_data.Pages[0].__typename == "QuizPage") {
            pageItems = <Quiz
                    id={page_data.Pages[0].id}/>
        }
        
    } else if (page_error) {
        console.log("There was an error calling Pages")
        console.log(`selected page is: ${selectedPage}`)
        console.log(page_error)
    }

    let page = <div 
        className='w-4/5 mx-20 mt-8'>
        {pageItems}
    </div>

    return (
        <div className='min-h-screen bg-slate-300'>
            <div className='flex flex-row justify-between'>
                {sectionItems}
                {page}
            </div>
        </div>
    );

}

export { Page };