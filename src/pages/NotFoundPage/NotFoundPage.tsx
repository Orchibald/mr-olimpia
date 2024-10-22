import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="container notFoundPage">
      <h1>На жаль, ми не знайшли такої сторінки на нашому сайті.</h1>
      <p>
        Ви можете перейти на&nbsp;
        <Link to="/">
          головну сторінку
        </Link>
        .
      </p>
    </div>
  );
};