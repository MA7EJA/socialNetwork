import React from 'react'
import AddPost from '../components/AddPost'
import { PostData } from '../context/PostContext'
import PostCard from '../components/PostCard'

const ReelsPage = () => {

  const { reels } = PostData()

  return (
      <div className='lg:ml-64 p-2'>
        <AddPost type="reel"/>
        {reels && reels.length > 0 ? (
          reels.map(reel => (
            <PostCard key={reel._id} value={reel} type={'reel'} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
  )
}

export default ReelsPage