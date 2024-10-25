import React, { useState } from 'react';
import './CalorieCalculatorModal.scss';
import { Button } from '../Button/Button';
import { ButtonType } from '../../helpers/types/button';

type Props = {
  close: () => void;
};

export const CalorieCalculatorModal: React.FC<Props> = ({ close }) => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [calories, setCalories] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    const result = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    setCalories(result);
    setAge('');
    setHeight('');
    setWeight('');
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <span className="modal__close" onClick={close}>
          &times;
        </span>
        <form onSubmit={handleSubmit} className="modal__form">
          <h1 className="modal__title">Калькулятор калорій</h1>
          
          <input
            type="number"
            className="modal__form-input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Вік"
            required
          />
          
          <input
            type="number"
            className="modal__form-input"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Вага (кг)"
            required
          />
          
          <input
            type="number"
            className="modal__form-input"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Зріст (см)"
            required
          />
          
          <Button type={ButtonType.Submit} label='Розрахувати' />

          <div className="modal__result">
            {calories 
              ? `Потрібно ${calories.toFixed(2)} калорій на день.`
              : 'Заповніть форму'
            } 
          </div>

        </form>
      </div>
    </div>
  );
};
