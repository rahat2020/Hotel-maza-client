import Swal from 'sweetalert2';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const HotelRoom = () => {
    // FETCH HOTEL DATA FROM DATABASE
    const [data, setData] = useState([{}])
    console.log(data)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://hotel-server-beryl.vercel.app/hotel/allhotels')
                // console.log(res)
                setData(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    // SUBMIT FORM DATA TO THE DATABASE
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [maxPeople, setMaxPeople] = useState('')
    const [desc, setDesc] = useState('')
    const [hotelId, setHotelId] = useState(undefined);
    console.log(hotelId)
    const [rooms, setRooms] = useState('')
    const navigate = useNavigate()
    const config = {
        headers: { token: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        const ro = rooms.split(",").map((room) => ({ number: room }));

        const roomsObj = {
            title,
            price,
            maxPeople,
            desc,
            roomNumbers: ro
        }
        console.log(roomsObj)
        try {
            const res = await axios.post(`https://hotel-server-beryl.vercel.app/room/createRoom/${hotelId}`, roomsObj, config)
            console.log(res)
            res && Swal.fire({
                icon: 'success',
                title: 'Room created'
            })
            setTimeout(() => {
                navigate("/addRoom")
            }, [1000])
            return clearTimeout(setTimeout())
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="ad">
            <Topbar />
            <Sidebar />
            <div className="admin">
                <div className="adminDash">
                    <div className="titleContainer">
                       

                        <div className="adDash">
                            {/* ADD ADMIN */}
                            <div className="TeacherAdd">
                                <div className="teacherTitle">
                                    <div className="colLeft">
                                        <strong className="firstTitle">Dashboard / <span className="scndTitle">add rooms</span></strong>
                                    </div>
                                </div>

                                {/* Teacher add forms */}
                                <div className="mt-3">
                                    <div className="Tadd">
                                        {/* basic details */}
                                        <>
                                            <div className="bdtails">
                                                <h3>Room Details</h3>
                                                <div className="line" />
                                            </div>
                                            <form className="row g-3" onSubmit={handleSubmit}>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputEmail4" className="form-label">Title</label>
                                                    <input type="text" className="form-control" id="inputEmail4" onChange={(e) => setTitle(e.target.value)} placeholder="title" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputPassword4" className="form-label">Price</label>
                                                    <input type="text" className="form-control" id="inputPassword4" onChange={(e) => setPrice(e.target.value)} placeholder="price" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputPassword4" className="form-label">Max People</label>
                                                    <input type="text" className="form-control" id="inputPassword4" onChange={(e) => setMaxPeople(e.target.value)} placeholder="maximum people" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputCity" className="form-label">Room Numbers</label>
                                                    <input type="text" className="form-control" id="inputCity" onChange={(e) => setRooms(e.target.value)} placeholder="room numbers" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputCity" className="form-label">Description</label>
                                                    <input type="text" className="form-control" id="inputCity" onChange={(e) => setDesc(e.target.value)} placeholder="room descriptions" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Choose a hotel</label>
                                                    <select
                                                        id="hotelId"
                                                        onChange={(e) => setHotelId(e.target.value)}
                                                        className="form-control"
                                                    >
                                                        {data &&
                                                            data.map((hotel,index) => (
                                                                <option onChange={(e) => setHotelId(e.target.value)} key={index} value={hotel._id} className="form-control">{hotel.name}</option>
                                                            ))}
                                                    </select>
                                                </div>
                                                <div className="col-12 mb-4">
                                                    <button type="submit" className="btn btn-warning text-white fw-bold">Submit</button>
                                                </div>
                                            </form>
                                        </>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelRoom