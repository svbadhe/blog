import React from 'react'
import Header from '../Components/Header'
import Tiles from '../Components/Tiles'

function MyPosts() {
    return (
        <div>
            <Header />
            <h1>My Posts</h1>
            <Tiles type="personal" />
        </div>
    )
}

export default MyPosts
