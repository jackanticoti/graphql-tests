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

    const destroy_mutation = gql`
    mutation DestroyBookmarkFolder($id: ID!) {
        DestroyBookmarkFolder(id: $id)
    }`

    const update_mutation = gql`
    mutation UpdateBookmarkFolder($id: ID!, $name: String!) {
        UpdateBookmarkFolder(
          id: $id,
          name: $name
        ) {
          name
        }
      }`
      
    const { data: queryData } = useQuery(query);

    if (queryData) {
        const response = queryData.UserBookmarks
        const bookmarksData: Bookmark[] = []
        for (let i = 0; i < response.length; i++) {
            const newBookmark: Bookmark = {name: "", id: ""};
            newBookmark.id = queryData.UserBookmarks[i].id
            newBookmark.name = queryData.UserBookmarks[i].name
            bookmarksData.push(newBookmark)
        }
        useEffect(() => {
          setBookmarks(bookmarksData)
        }, [])
    }

    const [destroyBookmarkFolder, { data: destroyData, loading: destroyLoading, error: errorLoading }] = useMutation(destroy_mutation);

    const [updateBookmarkFolder, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(update_mutation);

    const bookmarkItems = bookmarks.map((bookmark, index) => {
        return <div
            className='flex flex-col justify-between bg-slate-200 m-10 p-6'
            key={`key${index}`}>
            <h1
                className='ml-6 text-2xl'
                >{bookmark.name}</h1>
            <h1
                className='hover:cursor-pointer hover:bg-slate-100 bg-slate-400 mt-2 ml-6 w-40 text-center rounded-md'
                onClick={() => destroyBookmarkFolder({ variables: { id: bookmark.id } })}
                >Delete me</h1>
            <h1
                className='hover:cursor-pointer hover:bg-slate-100 bg-slate-400 mt-2 ml-6 w-40 text-center rounded-md'
                onClick={() => {
                    updateBookmarkFolder({ variables: { 
                        id: bookmark.id,
                        name: "Some bookmark name"
                    } })
                }}
                >Change name of folder</h1>
        </div>
    })

    return (
        <div>
            {bookmarkItems}
        </div>
    );
}

export { Page };