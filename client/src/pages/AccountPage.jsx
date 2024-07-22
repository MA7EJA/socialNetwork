import React, { useEffect, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom';
import { UserData } from '../context/UserContext';
import { PostData } from '../context/PostContext';
import PostCard from '../components/PostCard';
import Modal from '../components/Modal';
import axios from 'axios';
import { MdModeEdit } from "react-icons/md";
import toast from 'react-hot-toast';


const AccountPage = ({ user }) => {

    const navigate = useNavigate()

    const { logoutUser, updateProfilePicture, updateProfileName } = UserData()

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

    const [file, setFile] = useState('')
    const [fileChanged, setFileChanged] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(user.profilePicture.url);

    const changeFileHandler = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setFile(selectedFile);
            setPreviewUrl(imageUrl);
            setFileChanged(true);
        }
    }

    const changeImageHandler = () => {
        const formdata = new FormData()

        formdata.append('file', file)
        updateProfilePicture(user._id, formdata)
        setFileChanged(false);
    }

    useEffect(() => {
        followData()
    }, [user])

    const [showInput, setShowInput] = useState(false)
    const [name, setName] = useState(user.name || '')

    const UpdateName = () => {
        updateProfileName(user._id, name, setName )
        setShowInput(false)
    }

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkStyle = {
      background: 'rgb(31 41 55)',
      color: '#fff',
    };

    const [showUpdatePassword, setShowUpdatePassword] = useState(false)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    async function updatePassword(e){
        e.preventDefault()
        const toastId = toast.loading("Processing...", { style: isDarkMode ? darkStyle : {} });
        try {
            const { data } = await axios.post('/api/user/' + user._id, {oldPassword, newPassword})

            toast.success(data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId });
            setOldPassword('')
            setNewPassword('')
            setShowUpdatePassword(false)
        } catch (err) {
             toast.error(err.response.data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId })
        }
    }

  return (
    <>
    {showUpdatePassword && <>
        <div className='z-[999] fixed w-full h-screen bg-black bg-opacity-50 flex justify-center items-center mx-auto'>
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="lg:ml-64 w-full max-w-md h-auto bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Change your Password
                        </h3>
                        <button onClick={() => setShowUpdatePassword(!showUpdatePassword)} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <form onSubmit={updatePassword} className="space-y-4" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                                <input value={oldPassword} onChange={e => setOldPassword(e.target.value)} type="password" name="oldPass" id="oldPass" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="••••••••" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                                <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div> 
    </>}
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
                        <button onClick={() => (setShowInput(true), setIsDropdownOpen(false))} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full">Edit</button>
                    </li>
                    <li>
                        <button onClick={() => setShowUpdatePassword(!showUpdatePassword)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full">Update Password</button>
                    </li>
                    <li>
                        <a onClick={logoutHandler} href="#" className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-200 dark:hover:text-white text-center">Logout</a>
                    </li>
                    </ul>
                </div> : ''}
            </div>
            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-24">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-26 rounded-lg cursor-pointer">
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover" src={previewUrl} alt={user.profilePicture.url || 'Avatar'}/>
                        <input id="dropzone-file" onChange={changeFileHandler} required type="file" className="hidden" />
                        <MdModeEdit className='absolute ml-20 mt-16 text-2xl text-gray-800 dark:text-gray-200 bg-blue-600 w-8 h-8 p-2 rounded-full'/>
                    </label>
                </div> 
                {fileChanged && (
                    <button onClick={changeImageHandler} className="py-2.5 px-5 me-2 ml-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Update Image</button>
                )}
                {showInput ? <>
                    <input 
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        type="text" 
                        className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Enter Name"
                        required
                    />
                    <div className='flex items-center ml-2'>
                        <button onClick={UpdateName} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Update Name</button>
                        <button onClick={() => setShowInput(false)} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-red-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-red-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</button>
                    </div>
                </> : <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">{user.name}</h5>}
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






