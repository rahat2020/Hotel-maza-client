import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar';

const SingleUserView = () => {
    const { id } = useParams()
    const [updated, setUpdated] = useState(false)
    const [data, setData] = useState([])

    const {roomNumbers} = data
    console.log(roomNumbers? roomNumbers[0].unavailableDates : "undefined")

    const config = {
        headers: { token: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://hotel-server-beryl.vercel.app/room/getRoomByID/${id}`, config)
                setData(res.data)

            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [id])

    // UPDATE ROOM
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [maxPeople, setMaxPeople] = useState('')
    const [desc, setDesc] = useState('')

    const { user } = useContext(AuthContext)
    const handleUpdate = async () => {
        const roomObj = {
            title,
            price,
            maxPeople,
            desc,
            roomNumbers:data.roomNumbers,
        }
        console.log(roomObj)
        try {
            const res = await axios.put(`https://hotel-server-beryl.vercel.app/room/updateRoom/${id}`, roomObj, config)
            res && Swal.fire({
                icon: 'success',
                title: 'Room updated successfully'
            })
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="ad">
            <Topbar />
            <Sidebar />
            <div className="single">
                <div className="adminDash">
                    <div className="titleContainer">
                        <h3 className="title">Welcome {user.username}!</h3>
                        <div className="adDash">
                            <div className="TeacherAdd">
                                <div className="teacherTitle">
                                    <div className="colLeft">
                                        <strong className="firstTitle">Dashboard / <span className="scndTitle">single room view</span></strong>
                                    </div>
                                </div>


                                <div className="mt-3">
                                    <div className="Single__form">
                                        <div className="d-flex justify-content-between">
                                            <p className="starTitle">Hotel Details</p>
                                            <p>
                                                {

                                                    updated ? <button className="btnEdit" onClick={() => setUpdated(false)}><i className="fa-solid fa-close"></i></button>
                                                        :
                                                        <button className="btnEdit" onClick={() => setUpdated(true)}><i className="fa-solid fa-pen"></i></button>


                                                }
                                            </p>

                                        </div>
                                        <table className="table border">
                                            <thead>
                                                <tr className="text-center">
                                                    <th className="thead" scope="col">TITLE</th>
                                                    <th className="thead" scope="col">PRICE</th>
                                                    <th className="thead" scope="col">MAX PEOPLE</th>
                                                    <th className="thead" scope="col">DESCRIPTION</th>
                                                </tr>
                                            </thead>
                                            <tbody className="tbody">
                                                <tr className="trow">
                                                    <td data-title="TITLE" className="tdata">
                                                        {
                                                            updated ?
                                                                <input type="text" className="name" autoFocus defaultValue={data.title}
                                                                    onChange={(e) => setTitle(e.target.value)} />
                                                                :
                                                                `${data.title}`
                                                        }

                                                    </td>
                                                    <td data-title="PRICE" className="tdata">
                                                        {
                                                            updated ?
                                                                <input type="text" className="s__price" autoFocus defaultValue={data.price}
                                                                    onChange={(e) => setPrice(e.target.value)} />
                                                                :
                                                                `${data.pirce}`
                                                        }

                                                    </td>
                                                    <td data-title="MAX PEOPLE" className="tdata">
                                                        {
                                                            updated ?
                                                                <input type="text" className="s__price" autoFocus defaultValue={data.maxPeople}
                                                                    onChange={(e) => setMaxPeople(e.target.value)} />
                                                                :
                                                                `${data.maxPeople}`
                                                        }

                                                    </td>
                                                    <td data-title="DESCRIPTION" className="tdata">
                                                        {
                                                            updated ?
                                                                <input type="text" className="name" autoFocus defaultValue={data.desc}
                                                                    onChange={(e) => setDesc(e.target.value)} />
                                                                :
                                                                `${data.desc}`
                                                        }

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="singleRest__info mt-2">
                                            <strong className="border-bottom">Room Number object 1</strong>
                                            <p>{roomNumbers? roomNumbers[0].number : ""}</p>
                                            <p>{roomNumbers? roomNumbers[0].unavailableDates : "unavailableDates not fetched"}</p>

                                            {/* <strong className="border-bottom">Room Number object 2</strong>
                                            <p>{roomNumbers? roomNumbers[0].number : ""}</p>
                                            <p>{roomNumbers? roomNumbers[0].unavailableDates : "unavailableDates not fetched"}</p> */}

                                            {
                                                updated ?
                                                    <button className="btn btn-warning text-white" onClick={handleUpdate}>Update</button>
                                                    :
                                                    " "
                                            }
                                        </div>
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

export default SingleUserView;