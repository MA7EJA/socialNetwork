import React from 'react'
import AddPost from '../components/AddPost'
import PostCard from '../components/PostCard'

const HomePage = () => {
  return (
    <div className='lg:ml-64 p-2'>
      <AddPost type="post"/>
      <PostCard type="post"/>
    </div>
  )
}

export default HomePage