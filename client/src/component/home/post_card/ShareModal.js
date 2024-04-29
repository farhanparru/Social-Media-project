import React, { useState } from 'react';
import Send from '../../../images/send.svg';
import ShareModel from '../../ShareModel';
import { BASE_URL } from '../../../utlis/confige';
import { useSelector } from 'react-redux';

const ShareModal = ({ post }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [isShare, setIsShare] = useState(false);

    const { theme } = useSelector(state => state);

    const handleSendClick = () => {
        setShowModal(true);
        setIsShare(true); // Update isShare to true when send button is clicked
    };

    return (
        <>
            <img
                src={Send}
                alt='send'
                onClick={handleSendClick}
                className="cursor-pointer"
            />

            {showModal ? (
                <>
                    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 w-full sm:w-96">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">Share Post</h3>
                                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="mb-4">
                                {isShare && <ShareModel url={`${BASE_URL}/post/${post._id}`} theme={theme} />}
                            </div>
                            <div className="flex justify-end">
                                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg mr-2 focus:outline-none hover:bg-gray-300 transition duration-200">Close</button>
                                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg focus:outline-none hover:bg-blue-600 transition duration-200">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}

export default ShareModal;
