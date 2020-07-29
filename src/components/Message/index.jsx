import React from 'react';
import './index.css';

export default ({
    messageItem,
    currentAuthor
}) => {
    const { author, message, timestamp } = messageItem;
    const dateString = new Date(timestamp).toDateString();
    const timeString = new Date(timestamp).toLocaleTimeString();
    const isCurrentAuthor = currentAuthor === author;
    return (
        <div style={{ textAlign: isCurrentAuthor ? 'right' : 'left' }}>
            <div className={`message ${isCurrentAuthor ? 'message-current-author' : ''}`}>
                <p className="message-meta">{!isCurrentAuthor ? author : ''}</p>
                <p className="message-body">{message}</p>
                <p className="message-meta">{dateString} {timeString}</p>
            </div>
        </div>
    )
}