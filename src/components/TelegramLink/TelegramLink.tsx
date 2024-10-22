import { FaTelegramPlane } from 'react-icons/fa';
import './TelegramLink.scss';

export const TelegramLink = () => {
  return (
    <a href="https://t.me/orchibald" target="_blank" rel="noopener noreferrer" className="telegram-link">
      <FaTelegramPlane size={24} />
    </a>
  );
}
