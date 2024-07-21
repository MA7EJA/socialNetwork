import React from 'react'
import AddPost from '../components/AddPost'
import PostCard from '../components/PostCard'
import { PostData } from '../context/PostContext'

const HomePage = () => {

  const { posts } = PostData()

  return (
    <div className='lg:ml-64 p-2'>
      <AddPost type="post"/>
      {posts && posts.length > 0 ? (
        posts.map(e => (
          <PostCard value={e} key={e._id} type={'post'}/>
        ))
      ) : (<p>Loading...</p>)}
    </div>
  )
}

export default HomePage