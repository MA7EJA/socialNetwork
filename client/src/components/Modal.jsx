import React from 'react'
import { AiFillCloseSquare } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Modal = ({ value, title, setShow }) => {
  return (
    <>
        <div className='fixed z-[999] bg-black bg-opacity-40 flex justify-center items-center w-full min-h-screen p-4'>
            <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{title}</h5>
                <button onClick={() => setShow(false)} className="text-2xl font-medium text-blue-600 hover:underline dark:text-blue-500">
                    <AiFillCloseSquare />
                </button>
        </div>
        <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 max-h-64 overflow-y-auto">
                    {
                        value && value.map((e) => (
                            <li className="py-3 sm:py-4">
                                <Link onClick={() => setShow(false)} to={`/user/${e._id}`}>
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={e.profilePicture.url} alt="Neil image"/>
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {e.name}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {e.email}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                                            View
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
        </div>
        </div>
        </div>
    </>
  )
}

export default Modal