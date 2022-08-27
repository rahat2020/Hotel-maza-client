import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { useNavigate } from "react-router-dom";
import './Reserve.css';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';

const Reserve = ({ setOpen, hotelId }) => {
    // console.log(hotelId)
    const [data, setData] = useState([])
    // console.log(data)

    // fetch hotel data from db
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/hotel/room/${hotelId}`)
                setData(res.data)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
    }, [hotelId])
    // get dates
    const { dates } = useContext(SearchContext);
    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        const dates = [];
        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }

        return dates;
    };
    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    // room select
    const [selectedRooms, setSelectedRooms] = useState([]);
    console.log(selectedRooms)
    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked
                ? [...selectedRooms, value]
                : selectedRooms.filter((item) => item !== value)
        );
    }
    // is room available 
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            alldates.includes(new Date(date).getTime())
        );

        return !isFound;
    };
    // reserve room with preferable dates
    const {user} = useContext(AuthContext)
    const [booked, setBooked] = useState([])
    console.log(booked)
    const navigate = useNavigate()
    const handleClickReserve = async () => {
        try {
          const list =  await Promise.all(
                selectedRooms.map((roomId) => {
                    const res = axios.put(`http://localhost:5000/room/availability/${roomId}`, {
                        dates: alldates,
                    });
                    setBooked(res.data)
                    return  res.data;
                   
                })
            );
            // setProduct(list)
            console.log(list)

            // const bookObj ={
            //     email: user.email,
            //     product:booked,
            // }
            // const res = await axios.post('http://localhost:5000/order/add', bookObj)
            // console.log(res)
            setOpen(false);
            navigate("/booked");
            
            Swal.fire({
                icon: 'success',
                title: "Room has been booked",
            })
        } catch (err) { }
    };
    return (
        <div className="r">
            <div className="reserve">
                <div className="rContainer">
                    <i className="fa-solid fa-xmark rClose" onClick={() => setOpen(false)}></i>
                    <span className="slroom">Select your rooms:</span>
                    {data.map((item, index) => (
                        <div className="rItem" key={index}>
                            <div className="rInfo">
                                <div className="rTitle">{item?.title}</div>
                                <div className="rDesc">{item?.desc}</div>
                                <div className="rMax">
                                    Max people: <b>{item?.maxPeople}</b>
                                </div>
                                <div className="rPrice">{item?.price}</div>
                            </div>
                            <div className="rSelectRooms">
                                {item?.roomNumbers.map((roomNumber) => (
                                    <div className="room" key={roomNumber._id}>
                                        <label className="rlabel">{roomNumber?.number}</label>
                                        <input
                                            type="checkbox"
                                            onChange={handleSelect}
                                            value={roomNumber._id}
                                            disabled={!isAvailable(roomNumber)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button onClick={handleClickReserve} className="rButton">
                        Reserve Now!
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Reserve