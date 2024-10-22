import React, { useState } from 'react';
import { Coach } from '../../helpers/types/coach';
import './CoachItem.scss';
import { FaInstagram } from 'react-icons/fa';
import { Button } from '../Button/Button';
import { ButtonType } from '../../helpers/types/button';
import { ModalForm } from '../ModalForm/ModalForm';

type Props = {
  coach: Coach,
};

const CoachItem: React.FC<Props> = ({ coach }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleOpenModal = () => {
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div key={coach.name} className='coach'>
      <div className='coach__text'>
        <div className='coach__title'>
          <h3 className='coach__name'>{coach.name}</h3>
          <a href={coach.instagramLink} target="_blank" rel="noopener noreferrer" className='coach__link'>
            <span className='coach__link-title'>Instagram</span>
            <FaInstagram size={24} />
          </a>
        </div>
        <p className='coach__specialization'>{coach.specialization.toUpperCase()}</p>
        <ul className='coach__fact'>
          Факти:
          {coach.facts.map((fact, index) => (
            <li className='coach__fact-item' key={index}>⭐{fact}</li>
          ))}
        </ul>
        <Button 
          type={ButtonType.Default} 
          onClick={handleOpenModal} 
          label='Записатись'
        />
      </div>
      <img src={coach.imageSrc} alt={coach.name} className='coach__image' />

      {isModalOpen && ( 
        <ModalForm 
          close={handleCloseModal} 
          coachName={coach.name}
          title='Заповніть анкету'
        />
      )}
    </div>
  );
};

export default CoachItem;