import React, { useState } from 'react';
import './Comment.scss';

interface CommentProps {
  id: string;  
  nickname: string;
  text: string;
  likes: number;
  date: string;
}

const Comment: React.FC<CommentProps> = ({ nickname, text, likes: initialLikes, date }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLikeToggle = () => {
    setLiked((prevLiked) => {
      if (prevLiked) {
        setLikes((prevLikes) => prevLikes - 1);
      } else {
        setLikes((prevLikes) => prevLikes + 1);
      }
      return !prevLiked;
    });
  };

  return (
    <div className="comment-card">
      <div className="comment-card__nickname">{nickname}</div>
      <div className="comment-card__text">{text}</div>
      <div className="comment-card__footer">
        <div className="comment-card__likes" onClick={handleLikeToggle}>
          <span style={{ color: liked ? 'red' : 'white' }}>♥</span> {likes}
        </div>
        <div className="comment-card__date">{new Date(date).toLocaleDateString()}</div>
      </div>
    </div>
  );
};

export default Comment;
