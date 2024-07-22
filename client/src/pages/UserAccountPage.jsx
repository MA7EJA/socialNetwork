import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PostData } from '../context/PostContext';
import PostCard from '../components/PostCard';
import { Loading } from '../components/Loading';
import axios from 'axios';
import { UserData } from '../context/UserContext';

const UserAccountPage = ({ user: loggedInUser }) => {

    const navigate = useNavigate()

    const [user, setUser] = useState([])

    const [loading, setLoading] = useState(true)

    const params = useParams()

    async function fetchUser(){
        try {
            const { data } = await axios.get('/api/user/' + params.id)

            setUser(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const { posts, reels } = PostData()
    let myPosts;

    if(posts){
        myPosts = posts.filter((post) => post.owner._id === user._id);
    }

    let myReels;
    if(reels){
        myReels = reels.filter((reel) => reel.owner._id === user._id)
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const [type, setType] = useState('post')

    const [followed, setFollowed] = useState(false)

    const { followUser } = UserData()

    const followHandler = async () => {
        setFollowed(!followed)
        await followUser(user._id)
        await fetchUser()
    }

    const followers = user.followers
    useEffect(() => {
        if(followers && followers.includes(loggedInUser._id)) setFollowed(true)
    }, [user])

  return (
    <>
    { loading ? <Loading/> : <div className='lg:ml-[248px] p-2'>
        <div className="mb-4 mx-auto w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4">
                <button onClick={toggleDropdown} id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                    <span className="sr-only">Open dropdown</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                    </svg>
                </button>
               {isDropdownOpen ?  <div id="dropdown" className="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-11">

                </div> : ''}
            </div>
            <div className="flex flex-col items-center">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover" src={ user.profilePicture.url || 'https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-512x512-0mhn1054.png'} alt={user.profilePicture.url || 'Avatar'}/>
                <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
            </div>
            <div className=" bg-white rounded-lg dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
            <dl className="grid max-w-screen-xl grid-cols-2 gap-16 p-4 mx-auto text-gray-900 dark:text-white sm:p-8">
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-2xl font-extrabold">{user.followers.length}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Followers</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-2xl font-extrabold">{user.followings.length}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Following</dd>
                </div>
            </dl>
            { user._id === loggedInUser._id ? "" : <div className='flex flex-col items-center justify-start w-full mb-2'>
                <button onClick={followHandler} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-40 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                    {followed ? 'UnFollow' : 'Follow'}
                </button>
            </div>}
            </div>
        </div>
        <div className='mx-auto w-full max-w-lg flex justify-around mb-6'>
            <button onClick={() => setType('post')} className='text-gray-600 dark:text-gray-200 w-32 border-b-[1px] pb-4 text-lg border-b-wid'>Posts</button>
            <button onClick={() => setType('reel')} className='text-gray-600 dark:text-gray-200 w-32 border-b-[1px] pb-4 text-lg border-b-wid'>Reels</button>
        </div>
        {
            type === "post" && (
                <>
                    {
                        myPosts && myPosts.length > 0 ? myPosts.map((e) => (
                            <PostCard type={'post'} value={e} key={e._id}/>
                        )) : <p>No Post Available</p>
                    }
                </>
            )
        }
        {
            type === "reel" && (
                <>
                    {
                        myReels && myReels.length > 0 ? myReels.map((e) => (
                            <PostCard key={myReels[0]._id} value={myReels[0]} type={'reel'}/>
                        )) : <p>No Reel Available</p>
                    }
                </>
            )
        }
    </div>}
    </>
  )
}

export default UserAccountPage






