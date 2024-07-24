import React, { useEffect, useState } from 'react'
import { formatDistanceToNow, subDays } from 'date-fns';
import axios from 'axios';

const Message = ({ ownMessage, message, sender, timestamp }) => {

    const [imageUrl, setImageUrl] = useState('');
    const [senderName, setSenderName] = useState('');
    const [formattedDate, setFormattedDate] = useState('');

    const fetchUserDetails = async (userId) => {
        try {
            const { data } = await axios.get(`/api/user/${userId}`);
            return data;
        } catch (error) {
            console.error(error);
            return {};
        }
    };

     useEffect(() => {
        if (sender) {
            if (typeof sender === 'string') {
                fetchUserDetails(sender).then(user => {
                    setSenderName(user.name);
                    setImageUrl(user.profilePicture.url);
                });
            } else {
                setSenderName(sender.name);
                setImageUrl(sender.profilePicture.url);
            }
        }
    }, [sender]);

    useEffect(() => {
        if (timestamp) {
            const date = new Date(timestamp);
            setFormattedDate(formatDistanceToNow(date, { addSuffix: true }));
        }
    }, [timestamp]);

  return (
    <>
         {ownMessage ? 
                <div className="flex items-start gap-2.5 mb-4 justify-start sm:justify-center w-full max-w-[520px] px-2 sm:px-0">
                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-tl-lg rounded-tr-none rounded-bl-lg rounded-br-lg dark:bg-gray-700">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{senderName}</span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{formattedDate}</span>
                        </div>
                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message}</p>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                    </div>
                    <img className="min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px] rounded-full" src={imageUrl} alt="Sender profile" />
                </div>
                : 
                <div className="flex items-start gap-2.5 mb-4 justify-start sm:justify-center w-full max-w-[520px] px-2 sm:px-0">
                    <img className="min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px] rounded-full" src={imageUrl} alt="Sender profile" />
                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{senderName}</span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{formattedDate}</span>
                        </div>
                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message}</p>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                    </div>
                </div>
            }
    </>
  )
}

export default Message