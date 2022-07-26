import React from 'react'
import FavouriteRooms from '../../components/FavouriteRooms/FavouriteRooms';
import Featured from '../../components/Featured/Featured';
import FeaturedProperties from '../../components/featuredProperties/featuredProperties';
import Footer from '../../components/Footer/Footer';
import HeadeMain from '../../components/HeadeMain/HeadeMain';
import HotelDetails from '../../components/HotelDetails/HotelDetails';
import MailList from '../../components/mailList/mailList';
import PropertyList from '../../components/propertyList/propertyList';
import Services from '../../components/Services/Services';
import './Home.css';

const Home = () => {
  return (
    <>
      <HeadeMain />
      <HotelDetails />
      <Featured />
      <h3 className="homeTitle container mt-5  pt-4 text-center">Browse by property type</h3>
      <PropertyList />
      <h3 className="homeTitle container mt-5  pt-4 text-center">Homes guests love</h3>
      <FeaturedProperties />
      <h3 className="homeTitle container mt-5  pt-4 text-center">our deluxe room</h3>
      <FavouriteRooms />
      <h3 className="homeTitle container mt-5  pt-4 text-center">our awesome services</h3>
      <Services/>
      <MailList />
      <Footer />
    </>
  )
}

export default Home