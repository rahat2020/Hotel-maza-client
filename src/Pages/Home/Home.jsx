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
import Articles from '../Articles/Articles';
import './Home.css';

const Home = () => {
  return (
    <>
      <HeadeMain />
      <HotelDetails />
      <Featured />
      <h3 className="homeTitle container mt-5  pt-4 text-center" data-aos="fade-left">Browse by property type</h3>
      <PropertyList />
      <h3 className="homeTitle container mt-5  pt-4 text-center" data-aos="fade-left">Homes guests love</h3>
      <FeaturedProperties />
      <h3 className="homeTitle container mt-5  pt-4 text-center" data-aos="fade-left">our deluxe room</h3>
      <FavouriteRooms />
      <h3 className="homeTitle container mt-5  pt-4 text-center" data-aos="fade-left">our awesome services</h3>
      <Services/>
      <h3 className="homeTitle container mt-5  pt-4 text-center" data-aos="fade-left">Get inspiration for your next trip</h3>
      <Articles/>
      <MailList />
      <Footer />
    </>
  )
}

export default Home