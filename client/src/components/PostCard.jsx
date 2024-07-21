import React, { useEffect, useRef, useState } from 'react'
import { RiHeartLine } from "react-icons/ri";
import { RiHeartFill } from "react-icons/ri";
import { IoChatbox } from "react-icons/io5";
import { UserData } from '../context/UserContext';
import { PostData } from '../context/PostContext';
import { format } from 'date-fns'
import { Link } from 'react-router-dom';

const PostCard = ({ type, value }) => {

    const { user } = UserData();
    const { likePost, addComment } = PostData()

    const videoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const [isLike, setIsLike] = useState(false)
    const [show, setShow] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const formatDate = format(new Date(value.createdAt), "MMMM do")

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        for(let i = 0; i < value.likes.length; i++){
            if(value.likes[i] === user._id) setIsLike(true)
        }
    }, [value, user._id])

    useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoRef]);

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible]);

  const likeHandler = () => {
    setIsLike(!isLike)

    likePost(value._id)
  }

  const [comment, setComment] = useState('')

  const commentHandler = (e) => {
    e.preventDefault()
    addComment(value._id, comment, setComment)
  }

   const toggleShow = () => {
        setShow(!show);
    };

  return (
    <div>
        <div className='mx-auto w-full max-w-lg bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-8'>
            <div className="flex items-center m-4 justify-between">
                <Link className='flex items-center' to={`/user/${value.owner._id}`}>
                    <img className="w-11 h-11 rounded-full mr-4" src={ value.owner.profilePicture.url || 'https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-512x512-0mhn1054.png'} alt=""/>
                    <div className="font-medium dark:text-white">
                        <div className="text-md text-gray-700 dark:text-gray-50">{value.owner.name}</div>
                        <div className='text-gray-400 dark:text-gray-500 text-sm'>{formatDate}</div>
                    </div>
                </Link>
                <div className="flex items-center">
                    <button onClick={toggleDropdown} id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                        <span className="sr-only">Open dropdown</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                        </svg>
                    </button>
                    {isDropdownOpen ?  <div id="dropdown" className="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-28 -ml-36">
                        <ul className="py-2" aria-labelledby="dropdownButton">
                        <li>
                            <a href='#' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Link</a>
                        </li>
                        </ul>
                    </div> : ''}
                </div>
            </div>
            <div className='px-4 py-2'>
                <p className="tracking-tight text-gray-600 md:text-lg dark:text-gray-300">{value.caption}</p>
            </div>
            <div className="relative w-full mb-5" style={{ paddingTop: '125%' }}>
                {type === 'post' ? (
                    <img 
                    src={value.post.url} 
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" 
                    alt="View"
                    />
                ) : (
                    <video 
                    ref={videoRef}
                    src={value.post.url}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" 
                    controlsList='nodownload'
                    autoPlay={false}
                    autoFocus
                    controls
                    alt="View"
                    />
                )}
            </div>
            <div className='flex items-center justify-between text-gray-600 dark:text-gray-300'>
                <div className='flex items-center'>
                    <span onClick={likeHandler} className='p-3 text-red-500 text-2xl cursor-pointer'>
                        { isLike ? <RiHeartFill/> : <RiHeartLine/>}
                    </span>
                    <button>
                        {value.likes.length} Likes
                    </button>
                </div>
                <button className='flex justify-center items-center gap-2' onClick={toggleShow}>
                    <IoChatbox className='text-xl'/>
                    <span className='mr-4'>{value.comments.length} Comments</span>
                </button>
            </div>
            {
                show && <form className='flex gap-3' onSubmit={commentHandler}>
                    <input 
                        type="text" 
                        id="comment-input" 
                        className="ml-3 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[95%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Enter Comment"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <button 
                        type="submit" 
                        className="w-32 h-[42px] mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Add
                    </button>
                </form>
            }
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div className='my-4'>
                <div className='max-h-52 overflow-y-auto'>
                    { value.comments && value.comments.length > 0 ? value.comments.map((e) => (
                        <Comment value={e} key={e._id}/>
                    )) : <p className='text-gray-400 dark:text-gray-200 mx-4'>No Comments</p>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostCard

export const Comment = ({value}) => {
    return (
        <>
        <div className='flex items-center space-x-2 mt-2'>
            <Link className='mx-2'>
                <img className="w-10 h-10 rounded-full" src={value.avatar || 'https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-512x512-0mhn1054.png'} alt="Rounded avatar"></img>
            </Link>
            <div>
                <p className='text-gray-600 dark:text-gray-100 font-semibold'>{value.name}</p>
                <p className='text-gray-400 dark:text-gray-200 mr-2'>{value.comment}</p>
            </div>
        </div>
        <hr className="h-px my-4 mx-auto bg-gray-200 border-0 dark:bg-gray-700 max-w-[90%]"></hr>
        </>
    )
}