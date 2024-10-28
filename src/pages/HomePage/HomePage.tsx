import './HomePage.scss';
import { FeaturesCard } from '../../components/FeaturesCard/FeaturesCard';
import { Button } from '../../components/Button/Button';
import { ButtonType } from '../../helpers/types/button';

const features = [
  {
    icon: "📍",
    title: "Зручне розташування",
    description: "3 локації у різних частинах твого міста"
  },
  {
    icon: "🏋️‍♂️",
    title: "3200 м² спортивного простору",
    description: "Забудьте про черги на тренажери та незручності"
  },
  {
    icon: "🅿️",
    title: "Власна безкоштовна парковка",
    description: null,
  },
  {
    icon: "🏃‍♂️",
    title: "Групові заняття",
    description: "Близько 15 видів; в окремих обладнаних залах; для дітей та дорослих"
  }
];


export const HomePage = () => {
  return (
    <div className="home">
      <div className="home__header">
        <h1>MR.OLIMPIA</h1>
        <p>Ставай кращою версією себе знову і знову</p>
      </div>
      <div className="home__features">
        {features.map(({ title, icon, description }) => (
          <FeaturesCard title={title} icon={icon} description={description}/> 
        ))}
      </div>
      <div className="home__actions">
        <Button type={ButtonType.RouteLink} to='/subscriptions' label='Придбати абонемент'/>
        <Button type={ButtonType.Link} href='https://t.me/orchibald' label='Допомога менеджера'/>
      </div>
    </div>
  );
};

  