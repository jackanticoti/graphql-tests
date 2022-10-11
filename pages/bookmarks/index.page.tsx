import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

type Bookmark = {
    name: string;
    id: string;
  }

function Page() {

    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

    const query = gql`
    query {
        UserBookmarks {
            name
            id
            bookmarks {
                bookmarkFolder {
                    name
                }
            }
        }
    }`;
      
    const { data } = useQuery(query);

    if (data) {
        const response = data.UserBookmarks
        const bookmarksData: Bookmark[] = []
        let newBookmark: Bookmark = {id: "", name: ""};
        for (let i = 0; i < response.length; i++) {
            newBookmark.id = data.UserBookmarks[i].id
            newBookmark.name = data.UserBookmarks[i].name
            bookmarksData.push(newBookmark)
        }
        useEffect(() => {
          setBookmarks(bookmarksData)
        }, [])
    }

    function deleteMe(index: number) {
        const mutation = gql`
        mutation {
            DestroyBookmark(
            id: "${bookmarks[index].id}"
            )
        }`
        useEffect(() => {
            useMutation(mutation)
        }, [])
    }

    const bookmarkItems = bookmarks.map((bookmark, index) => {
        return <div
            className='flex flex-col justify-between bg-slate-200 m-10 p-6'
            key={`key${index}`}>
            <h1
                className='ml-6 text-2xl'
                >{bookmark.name}</h1>
            <h1
                className='hover:cursor-pointer hover:bg-slate-100 bg-slate-400 mt-2 ml-6 w-40 text-center rounded-md'
                onClick={() => {
                    const mutation = gql`
                    mutation {
                        DestroyBookmark(
                        id: "${bookmarks[index].id}"
                        )
                    }`
                    useMutation(mutation)
                }}
                >Delete me</h1>
        </div>
    })

    return (
        <div>
            {bookmarkItems}
        </div>
    );
}

export { Page };