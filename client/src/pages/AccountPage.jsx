import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserData } from '../context/UserContext';

const AccountPage = ({ user }) => {

    const navigate = useNavigate()

    const { logoutUser } = UserData()

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const logoutHandler = () => {
        logoutUser(navigate)
    }

  return (
    <div className="lg:ml-64 flex justify-center items-center min-h-screen">
        <div className="w-[95%] max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-2xl font-extrabold">{user.followers.length}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Followers</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-2xl font-extrabold">{user.followings.length}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Following</dd>
                </div>
            </dl>
        </div>
        </div>
    </div>
  )
}

export default AccountPage






