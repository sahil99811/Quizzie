
import { Route, Routes } from 'react-router-dom';
import './App.css';

import DashBoard from './pages/DashBoard';
import OpenRoute from './components/auth/OpenRoute';
import PrivateRoute from './components/auth/PrivateRoute';
import TrendingQuiz from './components/dashboard/TrendingQuiz';
import QuizsAnalytics from './components/dashboard/analytics/QuizsAnalytics';
import QuizAnalytics from './components/dashboard/analytics/quizwiseanalytics/QuizAnalytics';
import QuizTest from './pages/QuizTest';
import Homepage from './pages/Homepage';
import CreateQuiz from './components/dashboard/createquiz/CreateQuiz';

function App() {

  return (
    <div>
      <Routes>
        <Route 
          path='/'
          element={
            <OpenRoute>
              <Homepage/>
            </OpenRoute>
          }
        />
        <Route
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<TrendingQuiz />} />
          <Route path="/dashboard/quizzes" element={<QuizsAnalytics />} />
          <Route path="/dashboard/quizzes/:quizId" element={<QuizAnalytics/>} />
        </Route>
        <Route path="/quizTest/:quizId" element={<QuizTest/>}/>
      </Routes>
    </div>

  );
}

export default App;
