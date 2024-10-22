import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/hooks';
import { Loader } from '../../components/Loader/Loader';
import Comment from '../../components/Comment/Comment';
import CommentForm from '../../components/CommentForm/CommentForm'; 
import { fetchComments } from '../../store/slices/commentSlice';
import { addComment } from '../../store/slices/commentSlice';
import './CommentsPage.scss'; 

const CommentsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.comments.comments);
  const status = useAppSelector((state) => state.comments.status);
  const error = useAppSelector((state) => state.comments.error);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchComments());
    }
  }, [status, dispatch]);

  const handleCommentSubmit = (nickname: string, text: string) => {
    dispatch(addComment({ nickname, text })); 
  };

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error loading comments: {error}</div>;
  }

  return (
    <div className="coaches">
      <div className="coaches__header">
        <h1>КОМЕНТАРІ</h1>
      </div>
      <CommentForm onSubmit={handleCommentSubmit} />
      <div className="comments-page__list">
        {comments.map((comment) => (
          <Comment
            key={comment.id} 
            id={comment.id} 
            nickname={comment.nickname}
            text={comment.text}
            likes={comment.likes}
            date={comment.date}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsPage;
