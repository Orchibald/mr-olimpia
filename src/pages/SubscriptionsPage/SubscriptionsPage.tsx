import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/hooks';
import { Loader } from '../../components/Loader/Loader';
import { fetchSubscriptions } from '../../store/slices/subsSlice';
import SubItem from '../../components/SubItem/SubItem';

const SubscriptionsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const subs = useAppSelector((state) => state.subs.subscriptions);
  const status = useAppSelector((state) => state.subs.status);
  const error = useAppSelector((state) => state.subs.error);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSubscriptions());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error loading subscriptions: {error}</div>;
  }

  return (
    <div className="coaches">
      <div className="coaches__header">
        <h1>АБОНЕМЕНТИ</h1>
      </div>
      <div className="subscriptions__list">
        {subs.map((sub, index) => (
          <SubItem key={index} subscription={sub}/>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
