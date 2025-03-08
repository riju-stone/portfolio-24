import React from 'react'

function TagPostsPage({
    params
}: {
    params: {
        tag: string
    }
})
{
    return (
        <div>TagPostsPage: {params.tag}</div>
    )
}

export default TagPostsPage