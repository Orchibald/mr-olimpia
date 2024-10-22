// src/components/CommentForm/CommentForm.tsx
import React, { useState } from 'react';
import './CommentForm.scss';
import { Button } from '../Button/Button';
import { ButtonType } from '../../helpers/types/button';

interface CommentFormProps {
  onSubmit: (nickname: string, text: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [nickname, setNickname] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim() && text.trim()) {
      onSubmit(nickname, text);
      setNickname('');
      setText('');
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ваш нікнейм"
        className="comment-form__input" 
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
      />
      <textarea
        className="comment-form__textarea"
        placeholder="Ваш коментар"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <Button type={ButtonType.Submit} label='Додати коментар'/>
    </form>
  );
};

export default CommentForm;
