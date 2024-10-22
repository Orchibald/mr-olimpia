import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/hooks';
import { fetchCoaches } from '../../store/slices/coachSlice';
import './CoachPage.scss';
import CoachItem from '../../components/CoachItem/CoachItem';
import { Loader } from '../../components/Loader/Loader';


const CoachPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const coaches = useAppSelector((state) => state.coaches.coaches);
  const status = useAppSelector((state) => state.coaches.status);
  const error = useAppSelector((state) => state.coaches.error);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCoaches());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error loading coaches  {error}</div>;
  }

  return (
    <div className="coaches">
      <div className="coaches__header">
        <h1>НАШІ ТРЕНЕРИ</h1>
      </div>
      <div>
        {coaches.map((coach) => {
          return <CoachItem key={coach.name} coach={coach} />;      
        })}
      </div>
      
    </div>
  );
};

export default CoachPage;