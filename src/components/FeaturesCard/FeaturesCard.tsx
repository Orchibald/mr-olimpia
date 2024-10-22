import React from 'react';

type Props = {
  icon: string,
  title: string,
  description: string | null
}

export const FeaturesCard: React.FC<Props> = ({ icon, title, description }) => {
  return (
    <div className="home__feature">
      <span className="home__feature-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
