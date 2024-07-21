import React, { useState } from 'react';
import { PostData } from '../context/PostContext';

const AddPost = ({ type }) => {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [filePrev, setFilePrev] = useState(null);

  const { addPost } = PostData(); 

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault()
    const formdata = new FormData()

    formdata.append('caption', caption)
    formdata.append('file', file)

    addPost(formdata, setCaption, setFile, setFilePrev, type)
  }

  return (
    <form onSubmit={submitHandler} className="mb-6 mt-4 max-w-lg mx-auto bg-gray-50 shadow dark:bg-gray-800 p-4 rounded-md">
      <input 
        value={caption} 
        onChange={e => setCaption(e.target.value)} 
        type="text" 
        id="caption-input" 
        aria-label="caption input" 
        className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder="Enter Caption"
      />
      <input 
        onChange={changeFileHandler} 
        className="mb-5 p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
        aria-describedby="file_help" 
        id="user_avatar" 
        type="file"
        accept={type === 'post' ? "image/*" : "video/*"}
      />
      <div className="relative w-full mb-5" style={file ? { paddingTop: '125%' } : {}}>
        {filePrev && (
          type === 'post' ? (
            <img 
              src={filePrev} 
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" 
              alt="Preview"
            />
          ) : (
            <video 
              src={filePrev} 
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" 
              controlsList='nodownload'
              controls
              alt="Preview"
            />
          )
        )}
      </div>
      <button 
        type="submit" 
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Add Post
      </button>
    </form>
  );
}

export default AddPost;
