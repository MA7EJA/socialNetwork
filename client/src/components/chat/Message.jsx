import React, { useEffect, useState } from 'react'
import { formatDistanceToNow, subDays } from 'date-fns';

const Message = ({ ownMessage, message, sender, timestamp }) => {

    const [imageUrl, setImageUrl] = useState('');

    const date = new Date(timestamp);
    const formattedDate = formatDistanceToNow(date, { addSuffix: true });

    useEffect(() => {
        const loadImage = async () => {
            const image = await sender.profilePicture.url;
            setImageUrl(image);
        };
        loadImage();
    }, [sender]);

  return (
    <>
        {ownMessage ? 
            <div className="flex items-center gap-2.5 mb-4 justify-center w-[520px]">
                <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-tl-lg rounded-tr-none rounded-bl-lg rounded-br-lg dark:bg-gray-700">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{sender.name}</span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{formattedDate}</span>
                    </div>
                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message}</p>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                </div>
                <img className="min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px] rounded-full" src={imageUrl}  alt="Jese image"/>
            </div> : 

            <div className="flex items-center gap-2.5 mb-4 justify-center w-[520px]">
            <img className="min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px] rounded-full" src={imageUrl} alt="Jese image"/>
            <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{sender.name}</span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                </div>
                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message}</p>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb">Delivered</span>
            </div>
        </div>
        }
    </>
  )
}

export default Message