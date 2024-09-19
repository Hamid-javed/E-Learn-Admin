import './App.css'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from './layouts/mainLayout';
import NotFound from './pages/notFound';
import Login from './pages/login';
import UserPage from './pages/usersPage';
import MentorsPage from './pages/mentorsPage';
import AddMentor from './pages/addMentor';
import CoursePage from "./pages/coursePage"
import AddCourse from './pages/AddCourse';
import Videos from './pages/Videos';
import MentReviews from './pages/MentReviews';
import CourseReviews from './pages/CoursReviews';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import Catgories from './pages/Catgories';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/admin" element={<MainLayout />}>
          <Route path='users' element={<UserPage />} />
          <Route path='mentors' element={<MentorsPage />} />
          <Route path='add-mentor' element={<AddMentor />} />
          <Route path='mentor-reviews' element={<MentReviews />} />
          <Route path='courses' element={<CoursePage />} />
          <Route path='add-courses' element={<AddCourse />} />
          <Route path='course-reviews' element={<CourseReviews />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='settings' element={<Settings />} />
          <Route path='categories' element={<Catgories />} />
          <Route path='videos' element={<Videos />} />

          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='/' element={<Login />} />


       
      </>
    )
  );

  return (
    <RouterProvider router={router} />
  )
}

export default App
