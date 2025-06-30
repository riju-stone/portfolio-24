import React, { use } from 'react'

function TagPostsPage({ params }: {
    params: Promise<{ tag: string }>
}) {
    const resolvedParams = use(params)
    return (
        <div>TagPostsPage: {resolvedParams.tag}</div>
    )
}

export default TagPostsPage