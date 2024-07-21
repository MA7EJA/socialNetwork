import React from 'react'
import AddPost from '../components/AddPost'
import { PostData } from '../context/PostContext'
import PostCard from '../components/PostCard'
import { Loading } from '../components/Loading'

const ReelsPage = () => {

  const { reels, loading } = PostData()

  return (
      <>
      {
        loading ? <Loading/> : <div className='lg:ml-64 p-2'>
        <AddPost type="reel"/>
        {reels && reels.length > 0 ? (
          reels.map(reel => (
            <PostCard key={reel._id} value={reel} type={'reel'} />
          ))
        ) : (
          <p>No Reels Available</p>
        )}
      </div>
      }
      </>
  )
}

export default ReelsPage