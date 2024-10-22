import React from 'react';
import { ButtonType } from '../../helpers/types/button';
import { Link } from 'react-router-dom';
import './Button.scss';

type Props = {
  type: ButtonType;
  onClick?: () => void;
  label: string;
  href?: string;
  to?: string;
}

export const Button: React.FC<Props> = ({
  type,
  onClick,
  label,
  href,
  to
}) => {

  if (type === ButtonType.RouteLink && to) {
    return (
      <Link to={to} className="action-button">
        {label}
      </Link>
    );
  }

  if (type === ButtonType.Link && href) {
    return (
      <a 
        href={href} 
        className="action-button" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  if (type === ButtonType.Default) {
    return (
      <button
        className="action-button" 
        onClick={onClick}
      >
        {label}
      </button>
    );
  }

  if (type === ButtonType.Submit) {
    return (
      <button
        type="submit"
        className="action-button"
      >
        {label}
      </button>
    );
  }

  return null; 
};