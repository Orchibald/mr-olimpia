import gymIcon from '../../images/icon-gym.png';

type Props = {
  className: string,
}

export const GymIcon: React.FC<Props> = ({ className }) => (
  <img
    src={gymIcon}
    className={className}
    alt="Mr.Olimpia"
  />
)