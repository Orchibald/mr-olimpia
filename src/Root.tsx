import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import CoachPage from './pages/CoachPage/CoachPage';
import AboutPage from './pages/AboutPage/AboutPage';
import SubscriptionsPage from './pages/SubscriptionsPage/SubscriptionsPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import CommentsPage from './pages/CommentsPage/CommentsPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="coach" element={<CoachPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="subscriptions" element={<SubscriptionsPage />} />
          <Route path="comments" element={<CommentsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};