import React from 'react';
import './index.css';

export default ({
    messageItem,
    currentAuthor
}) => {
    const { author, message, timestamp } = messageItem;
    const dateString = new Date(timestamp).toDateString();
    const timeString = new Date(timestamp).toLocaleTimeString();
    return (
        <div className={`message ${currentAuthor === author ? 'message-current-author' : ''}`}>
            <p>{author}</p>
            <p>{message}</p>
            <p>{dateString} / {timeString}</p>
        </div>
    )
}