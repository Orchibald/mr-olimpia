import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/hooks';
import MapItem from '../../components/MapItem/MapItem';
import { fetchLocations } from '../../store/slices/locationSlice';
import { Loader } from '../../components/Loader/Loader';
import './AboutPage.scss';

const AboutPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { locations, status, error } = useAppSelector((state) => state.locations);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLocations());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Помилка завантаження: {error}</div>;
  }

  return (
    <div className='about'>
      <div className="coaches__header">
        <h1>ПРО НАС</h1>
      </div>
      <p className='about__desc'>Наші спортзали у Львові розташовані у трьох основних районах міста, щоб забезпечити максимальну доступність для наших клієнтів. Кожен зал обладнаний сучасним обладнанням та професійними тренерами.</p>
      {locations.length > 0 && <MapItem locations={locations} />}
    </div>
  );
};

export default AboutPage;
