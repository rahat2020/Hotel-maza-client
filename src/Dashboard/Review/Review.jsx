import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar';
import jwt_decode from "jwt-decode";

const Review = () => {
    const [data, setData] = useState([])
    const [text, setText] = useState('')


    const { user } = useContext(AuthContext)

    const token = JSON.parse(localStorage.getItem('token'))
    const decodedToken = jwt_decode(token)

    // FORM SUBMIT 
    const config = {
        headers: { token: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userObj = {
                username: user.username,
                email: user.email,
                img: user.img,
                text,
            }
            console.log(userObj)

            const res = await axios.post("http://localhost:5000/review/addReview", userObj, config)
            res && Swal.fire({
                icon: 'success',
                title: 'Review added',
                text: 'Your review added successfully',
            })

        } catch (e) {
            console.log(e)
        }
    }

    //GET ALL REVIEW
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/review/getReview')
                console.log(res)
                setData(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])
    return (
        <div className="ad">
            <Topbar />
            <Sidebar />
            <div className="admin">
                <div className="adminDash">
                    <div className="titleContainer">
                        <h3 className="title">Welcome {user.username}!</h3>
                        <strong className="firstTitle">Dashboard / <span className="text-muted fw-bold">Others reviews</span></strong>

                        <div className="adDash">
                            <div className="tableWrapprer">
                                <p className="starTitle">All Review lists</p>
                                <table className="table border">
                                    <thead>
                                        <tr className="text-center">
                                            <th className="thead" scope="col">NAME</th>
                                            <th className="thead" scope="col">EMAIL</th>
                                            <th className="thead" scope="col">IMAGE</th>
                                            <th className="thead" scope="col">REVIEW</th>
                                        </tr>
                                    </thead>
                                    {
                                        data.map(item => (
                                            <tbody className="tbody" key={item._id}>
                                                <tr className="trow">
                                                    <td data-title="NAME" className="tdata">{item.username}</td>
                                                    <td data-title="EMAIL" className="tdata">{item.email}</td>
                                                    <td data-title="IMAGE" className="tdata">
                                                        <img src={item.img} alt="" className="regImg d-flex justify-content-center align-items-center" />
                                                    </td>
                                                    <td data-title="REVIEW" className="tdata">{item.text}</td>
                                                </tr>
                                            </tbody>
                                        ))
                                    }
                                </table>
                            </div>


                            {/* ADD ADMIN */}
                            <div className="TeacherAdd">
                                <div className="teacherTitle">
                                    <div className="colLeft">
                                        <h3 className="title">Add Review</h3>
                                        <strong className="firstTitle">Dashboard / <span className="scndTitle">add review</span></strong>
                                    </div>
                                </div>

                                {/* Teacher add forms */}
                                <div className="mt-3">
                                    <div className="Tadd">
                                        {/* basic details */}
                                        <>
                                            <div className="bdtails">
                                                <h3>Write Details</h3>
                                                <div className="line" />
                                            </div>
                                            <form className="row g-3" onSubmit={handleSubmit}>
                                                <div className="col-md-12">
                                                    <label htmlFor="inputZip" className="form-label">User Image</label>
                                                    <div className="d-flex justify-content-start align-items-start">
                                                        <img src={user.img} alt="user-img" className="img-fluid" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <label htmlFor="inputEmail4" className="form-label">Name</label>
                                                    <input type="text" className="form-control" id="inputEmail4" placeholder="name" defaultValue={user.username} />
                                                </div>
                                                <div className="col-md-12">
                                                    <label htmlFor="inputPassword4" className="form-label">Email</label>
                                                    <input type="text" className="form-control" id="inputPassword4" placeholder="email" defaultValue={user.email} />
                                                </div>
                                                <div className="col-md-12">
                                                    <label htmlFor="inputPassword4" className="form-label">Text</label>
                                                    <textarea type="text" className="form-control" id="inputPassword4" onChange={(e) => setText(e.target.value)} placeholder="your review text" />
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

export default Review



