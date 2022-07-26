import React from 'react';
import './Featured.css';

const Featured = () => {
  return (
    <div className="featured container mt-5  pt-4">
    <div className="featuredItem">
      <img
        src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
        alt=""
        className="featuredImg"
      />
      <div className="featuredTitles">
        <h2>Dublin</h2>
        <h3>123 properties</h3>
      </div>
    </div>
    
    <div className="featuredItem">
      <img
        src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
        alt=""
        className="featuredImg"
      />
      <div className="featuredTitles">
        <h2>Reno</h2>
        <h3>533 properties</h3>
      </div>
    </div>
    <div className="featuredItem">
      <img
        src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
        alt=""
        className="featuredImg"
      />
      <div className="featuredTitles">
        <h2>Austin</h2>
        <h3>532 properties</h3>
      </div>
    </div>
  </div>
  )
}

export default Featured