import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewUser = () => {
    const { id } = useParams();

    const loadUser = async () => {
        await axios.get(`http://localhost:9494/user/${id}`).then((data) => {
            setUser(data.data);
        }).catch((err) => {
            console.log('Error', err);
        })
    }

    useEffect(() => { loadUser() }, []);

    const [user, setUser] = useState({
        name:"",
        username:"",
        email:""
    });

    return (
        <div className="d-flex justify-content-center vh-100 align-items-center">
            <div className="col-md-6">
                <div className="card shadow rounded">
                    <div className="card-header display-6 text-center">View User Details</div>
                    <div className="card-body">
                        <div className="card">
                            <div className="card-header">
                                <table className="table table-striped table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th>Parameters</th>
                                            <th>Desc.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                            <td>#ID</td>
                                            <td>{user.id}</td>
                                        </tr>
                                        <tr>
                                            <td>Name</td>
                                            <td>{user.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Username</td>
                                            <td>{user.username}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{user?.email}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="3"><Link className="btn btn-outline-primary" to="/">Back to Home</Link></td>
                                        </tr>
                                    </tbody>
                                        
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewUser;