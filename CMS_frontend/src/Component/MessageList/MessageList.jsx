/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const MessageList = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Sample messages data - in real app, this would come from an API
    const messages = [
        {
            id: 1,
            sender: 'John Doe',
            subject: 'Paper Submission Query',
            preview: 'Hello, I have a question regarding the paper submission process...',
            timestamp: new Date('2024-01-15T10:30:00'),
            unread: true
        },
        {
            id: 2,
            sender: 'Sarah Smith',
            subject: 'Registration Confirmation',
            preview: 'Thank you for confirming my registration for the conference...',
            timestamp: new Date('2024-01-14T15:45:00'),
            unread: false
        },
        {
            id: 3,
            sender: 'Prof. Zhang',
            subject: 'Workshop Registration',
            preview: 'I would like to register for the "Advanced Machine Learning" workshop...',
            timestamp: new Date('2024-01-13T09:15:00'),
            unread: true
        }
    ];

    return (
        <div className="relative">
            {/* Dropdown Menu */}

                <div className="absolute right-0 w-80 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200 transform transition-all duration-300 ease-in-out">
                    <div className="px-4 py-2 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">Messages</h3>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {messages.map(message => (
                            <div
                                key={message.id}
                                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${message.unread ? 'bg-blue-50' : ''}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`font-medium ${message.unread ? 'text-blue-600' : 'text-gray-800'}`}>
                                        {message.sender}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {format(message.timestamp, 'MMM d, h:mm a')}
                                    </span>
                                </div>
                                <div className={`text-sm ${message.unread ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                                    {message.subject}
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                    {message.preview}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="px-4 py-2 border-t border-gray-200">
                        <Link
                            to="/admin/messages"
                            className="block text-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                        >
                            View All Messages
                        </Link>
                    </div>
                </div>
  
        </div>
    );
};

export default MessageList;