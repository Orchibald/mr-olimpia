import React, { useState } from 'react';
import { Subs } from '../../helpers/types/subs';
import { Button } from '../Button/Button';
import { ButtonType } from '../../helpers/types/button';
import { ModalForm } from '../ModalForm/ModalForm';
import './SubItem.scss';

type Props = {
  subscription: Subs;
};

const SubItem: React.FC<Props> = ({ subscription }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='subscription'>
      <div className='subscription__details'>
        <h3 className='subscription__name'>{subscription.name}</h3>
        <p className='subscription__time'>Час: {subscription.time}</p>
        <p className='subscription__price'>Ціна: {subscription.price.regular} грн</p>
        <p className='subscription__price'>Ціна для студентів: {subscription.price.student} грн</p>
        <p className='subscription__price'>Ціна для дітей від 14 років: {subscription.price.youth} грн</p>
      </div>
      <div className='subscription__actions'>
        <Button 
          type={ButtonType.Default} 
          onClick={handleOpenModal} 
          label='Оформити'
        />
        <Button
          type={ButtonType.Link}
          href="https://t.me/orchibald" 
          label='Допомога менеджера'
        />
      </div>

      {isModalOpen && (
        <ModalForm
          close={handleCloseModal} 
          title='Заповніть анкету'
          subscriptionName={subscription.name} 
        />
      )}
    </div>
  );
};

export default SubItem;
