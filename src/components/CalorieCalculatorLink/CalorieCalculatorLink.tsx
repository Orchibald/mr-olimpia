// CalorieCalculatorLink.tsx
import React, { useState } from 'react';
import { FaCalculator } from 'react-icons/fa';
import './CalorieCalculatorLink.scss';
import { CalorieCalculatorModal } from '../CalorieCalculatorModal/CalorieCalculatorModal';

export const CalorieCalculatorLink: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <a
        onClick={handleOpenModal}
        className="calorie-calculator-link"
        title="Калькулятор калорій"
      >
        <FaCalculator size={24} />
      </a>
      {isModalOpen && <CalorieCalculatorModal close={handleCloseModal} />}
    </>
  );
};

export default CalorieCalculatorLink;
