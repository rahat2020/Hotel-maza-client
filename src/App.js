import React, { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import AddArticles from './Dashboard/AddArticles/AddArticles';
import ArticleLists from './Dashboard/AddArticles/ArticleLists';
import AddHotel from './Dashboard/AddHotel/AddHotel';
import Hotelsadd from './Dashboard/AddHotel/Hotelsadd';
import AddAdmin from './Dashboard/Admin/AddAdmin';
import Admin from './Dashboard/Admin/Admin';
import DashHome from './Dashboard/DashHome/DashHome';
import HotelRoom from './Dashboard/NewRoom/HotelRoom';
import NewRoom from './Dashboard/NewRoom/NewRoom';
// import NewRoom from './Dashboard/NewRoom/NewRoom';
import Review from './Dashboard/Review/Review';
import ReviewManage from './Dashboard/ReviewManage/ReviewManage';
import SingleHotelView from './Dashboard/SingleHotelView/SingleHotelView';
import SingleUserView from './Dashboard/SingleUserView/SingleUserView';
import SingleRoomView from './Dashboard/SingleRoomView/SingleRoomView';
import Single from './Pages/Articles/Single';
import Home from './Pages/Home/Home';
import Hotels from './Pages/Hotels/Hotels';
import List from './Pages/List/List';
import Login from './Pages/Login/Login.jsx';
import Signup from './Pages/Signup/Signup';
import jwt_decode from "jwt-decode";
import Booked from './Dashboard/Booked/Booked';

const App = () => {

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const token = JSON.parse(localStorage.getItem('token'))
  const decodedToken = jwt_decode(token)
  // console.log(decodedToken);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotels />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/read/:id" element={<Single />} />
          <Route path="/dashboard/home" element={<ProtectedRoute>
            <DashHome />
          </ProtectedRoute>} />
          <Route path="/addreviews" element={
            <ProtectedRoute>
              <Review />
            </ProtectedRoute>}
          />
          <Route path="/singleUsers/:id" element={
            <ProtectedRoute>
              <SingleUserView />
            </ProtectedRoute>}
          />
          <Route path="/booked" element={
            <ProtectedRoute>
              <Booked />
            </ProtectedRoute>}
          />

          <Route path="/admin" element={
            decodedToken.isAdmin === true ?
              <Admin />
              :
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>}
          />
          <Route path="/addadmins" element={
            decodedToken.isAdmin === true ?
              <AddAdmin />
              :
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>}
          />
          <Route path="/addhotel" element={
            decodedToken.isAdmin === true ?
              <AddHotel />
              :
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>}
          />
          <Route path="/add" element={
            decodedToken.isAdmin === true ?
              <Hotelsadd />
              :
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>}
          />

          <Route path="/addRoom" element={
            decodedToken.isAdmin === true ?
              <NewRoom />
              :
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>}
          />
          <Route path="/adrooms" element={
            decodedToken.isAdmin === true ?
              <HotelRoom />
              :
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>}
          />
          <Route path="/singleHotel/:id" element={
            decodedToken.isAdmin === true ?
              <SingleHotelView />
              :
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>}
          />
          <Route path="/singeRoomView/:id" element={
            decodedToken.isAdmin === true ?
              <SingleRoomView/>
              :
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>}
          />

          <Route path="/reviewmanage" element={
            decodedToken.isAdmin === true ?
              <ReviewManage />
              :
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>}
          />
          <Route path="/artlists" element={
            <ProtectedRoute>
              <ArticleLists />
            </ProtectedRoute>}
          />
          <Route path="/addArticles" element={
            <ProtectedRoute>
              <AddArticles />
            </ProtectedRoute>}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App