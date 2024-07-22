import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserData } from '../context/UserContext';
import { PostData } from '../context/PostContext';
import PostCard from '../components/PostCard';
import Modal from '../components/Modal';
import axios from 'axios';

const AccountPage = ({ user }) => {

    const navigate = useNavigate()

    const { logoutUser } = UserData()

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

    const logoutHandler = () => {
        logoutUser(navigate)
    }

    const [type, setType] = useState('post')

    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)

    const [followersData, setFollowersData] = useState([])
    const [followingsData, setFollowingsData] = useState([])

    async function followData(){
        try {
            const {data} = await axios.get('/api/user/follow/data/' + user._id);
            setFollowersData(data.followers)
            setFollowingsData(data.followings)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        followData()
    }, [user])

  return (
    <>
    { show && <Modal value={followersData} title={'Followers'} setShow={setShow}/>}
    { show1 && <Modal value={followingsData} title={'Followings'} setShow={setShow1}/>}
    <div className='lg:ml-[248px] p-2'>
        <div className="mb-4 mx-auto w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4">
                <button onClick={toggleDropdown} id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                    <span className="sr-only">Open dropdown</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                    </svg>
                </button>
               {isDropdownOpen ?  <div id="dropdown" className="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-11">
                    <ul className="py-2" aria-labelledby="dropdownButton">
                    <li>
                        <a onClick={logoutHandler} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</a>
                    </li>
                    </ul>
                </div> : ''}
            </div>
            <div className="flex flex-col items-center">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover" src={ user.profilePicture.url || 'https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-512x512-0mhn1054.png'} alt={user.profilePicture.url || 'Avatar'}/>
                <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
            </div>
            <div className=" bg-white rounded-lg dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
            <dl className="grid max-w-screen-xl grid-cols-2 gap-16 p-4 mx-auto text-gray-900 dark:text-white sm:p-8">
                <div className="flex flex-col items-center justify-center cursor-pointer" onClick={() => setShow(true)}>
                    <dt className="mb-2 text-2xl font-extrabold">{user.followers.length}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Followers</dd>
                </div>
                <div className="flex flex-col items-center justify-center cursor-pointer" onClick={() => setShow1(true)}>
                    <dt className="mb-2 text-2xl font-extrabold">{user.followings.length}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Following</dd>
                </div>
            </dl>
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
    </div>
    </>
  )
}

export default AccountPage






