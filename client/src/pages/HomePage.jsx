import React from 'react'
import AddPost from '../components/AddPost'
import PostCard from '../components/PostCard'
import { PostData } from '../context/PostContext'
import {Loading} from '../components/Loading'

const HomePage = () => {

  const { posts, loading } = PostData()

  return (
    <>
    {
      loading ? <Loading/> : <div className='lg:ml-64 p-2'>
      <AddPost type="post"/>
      {posts && posts.length > 0 ? (
        posts.map(e => (
          <PostCard value={e} key={e._id} type={'post'}/>
        ))
      ) : <p>No Post Available</p>}
    </div>
    }
    </>
  )
}

export default HomePage