import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import GlobalNav from '../../components/GlobalNav/GlobalNav';
import './Single.css';

const Single = () => {
    const [data, setData] = useState([])
    const { id } = useParams()
    console.log(data)

    // GET DATA BY ID
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/article/get/${id}`)
                setData(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [id])

    return (
        <>
            <GlobalNav />
            <div className="single__container">
                <div className="Sbg__imgcontainer">
                    <img src={data.bgimg} alt="" className="Sbg__img" />
                </div>
                <div className="container overflow-hidden">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="S__body">
                                <div className="body__container">
                                    <small className="S__route">Articles {">"} Travel Tips {">"} {data.headline}</small>
                                    <h1 className="S__title">{data.headline}</h1>
                                    <button className="btn__travel">Travel Tips</button>
                                    <div className="S__imgContainer">
                                        <img src={data.img ? data.img[0] : ""} alt="" className="S__img" />
                                    </div>
                                    <h4 className="S__subtitle">{data.titleOne}</h4>
                                    <p className="S__para">{data.paraOne}</p>

                                    <div className="S__imgContainer">
                                        <img src={data.img ? data.img[1] : ""} alt="" className="S__img" />
                                    </div>
                                    <h4 className="S__subtitle">{data.titleFour}</h4>
                                    <p className="S__para">{data.paraFour}</p>

                                    <div className="S__imgContainer">
                                        <img src={data.img ? data.img[2] : ""} alt="" className="S__img" />
                                    </div>
                                    <h4 className="S__subtitle">{data.titleThree}</h4>
                                    <p className="S__para">{data.paraThree}</p>

                                    <div className="S__imgContainer">
                                        <img src={data.img ? data.img[3] : ""} alt="" className="S__img" />
                                    </div>
                                    <h4 className="S__subtitle">{data.titleTwo}</h4>
                                    <p className="S__para">{data.paraTwo}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="col__right">
                                <div className="col__rghtContainer">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Single