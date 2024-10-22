/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import './ModalForm.scss';
import { ButtonType } from '../../helpers/types/button';
import { Button } from '../Button/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/hooks';
import { fetchCoaches } from '../../store/slices/coachSlice';
import { fetchSubscriptions } from '../../store/slices/subsSlice';

type Props = {
  close: () => void;
  coachName?: string;
  subscriptionName?: string;
  title: string;
};

type CategoryType = 'regular' | 'student' | 'youth';

export const ModalForm: React.FC<Props> = ({ close, coachName, subscriptionName, title }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+380');
  const [category, setCategory] = useState<CategoryType>('regular'); // Використано тип CategoryType
  const [selectedCoach, setSelectedCoach] = useState(coachName || '');
  const [selectedSubscription, setSelectedSubscription] = useState(subscriptionName || ''); 
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const coaches = useAppSelector((state) => state.coaches.coaches);
  const subscriptions = useAppSelector((state) => state.subs.subscriptions);
  
  useEffect(() => {
    if (!coachName) {
      dispatch(fetchCoaches());
    }
    if (!subscriptionName) {
      dispatch(fetchSubscriptions());
    }
  }, [dispatch, coachName, subscriptionName]);

  const validateName = (value: string) => /^[А-Яа-яЇїІіЄєҐґ]{2,}$/.test(value);
  const validatePhone = (value: string) => /^\+380\d{9}$/.test(value);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setNameError(!validateName(value));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    setPhoneError(!validatePhone(value));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as CategoryType); // Явно вказано тип
  };

  const handleCoachChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCoach(e.target.value);
  };

  const handleSubscriptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubscription(e.target.value);
  };

  const sendMessage = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateName(name)) {
      setNameError(true);
    }

    if (!validatePhone(phone)) {
      setPhoneError(true);
    }

    if (validateName(name) && validatePhone(phone)) {
      const token = '7211230865:AAFnmZFL1dhGxuzZyZmz7L7KOfZGiIG8PFY';
      const chatId = '869774726';
      let text = `Ім'я: ${name}\nНомер телефону: ${phone}\nКатегорія: ${category === 'regular' ? 'Дорослий' : category === 'student' ? 'Студент' : 'Дитина'}\n`;

      if (selectedCoach) {
        text += `Тренер: ${selectedCoach}\n`;
      } else {
        text += `Тренер: Без тренера\n`;
      }

      if (selectedSubscription) {
        text += `Абонемент: ${selectedSubscription}\n`;
        const subscription = subscriptions.find((sub) => sub.name === selectedSubscription);
        if (subscription) {
          text += `Ціна: ${subscription.price[category]} грн\n`; // Тепер TypeScript не повинен скаржитись
        }
      }

      const url = `https://api.telegram.org/bot${token}/sendMessage`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
          }),
        });

        if (response.ok) {
          toast.success('Дані успішно надіслано!');
          setName('');
          setPhone('+380');
          close();
        } else {
          throw new Error('Помилка при надсиланні повідомлення');
        }
      } catch (e) {
        toast.error('Помилка при надсиланні');
        console.error(e);
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <span className="modal__close" onClick={close}>
          &times;
        </span>
        <form onSubmit={sendMessage} className="modal__form">
          <h1 className="modal__title">{title}</h1>

          <div className="modal__form-input-wrapper">
            <input
              type="text"
              className={`modal__form-input ${nameError ? 'error' : ''}`}
              value={name}
              onChange={handleNameChange}
              placeholder="Ім'я"
              required
            />
            {nameError && <p className="modal__form-error">Введіть ім'я</p>}
          </div>

          <div className="modal__form-input-wrapper">
            <input
              type="tel"
              className={`modal__form-input ${phoneError ? 'error' : ''}`}
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Номер телефону"
              required
            />
            {phoneError && <p className="modal__form-error">Номер телефону має бути у форматі +380XXXXXXXXX</p>}
          </div>

          <div className="modal__form-input-wrapper">
            <select value={category} onChange={handleCategoryChange} className="modal__form-select">
              <option value="regular">Дорослий</option>
              <option value="student">Студент</option>
              <option value="youth">Дитина</option>
            </select>
          </div>

          {!coachName ? (
            <div className="modal__form-input-wrapper">
              <select value={selectedCoach} onChange={handleCoachChange} className="modal__form-select">
                <option value="">Без тренера</option>
                {coaches.map((coach) => (
                  <option key={coach.name} value={coach.name}>
                    {coach.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="modal__form-input-wrapper">
              <select
                value={selectedSubscription}
                onChange={handleSubscriptionChange}
                className="modal__form-select"
              >
                <option value="">Оберіть абонемент</option>
                {subscriptions.map((sub) => (
                  <option key={sub.name} value={sub.name}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Button type={ButtonType.Submit} label="Надіслати" />
        </form>
      </div>
    </div>
  );
};
