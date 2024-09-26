import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const [user, setUsers] = useState({
    name: "",
    username: "",
    email: "",
  });

  let navigate = useNavigate();

  const onInputChange = (e) => {
    setUsers({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const loadUser = async () => {
    await axios.get(`http://localhost:9494/user/${id}`).then((data) => {
      setUsers(data.data);
    });
  };

  const editUser = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:9494/user/${id}`, user)
      .then((data) => {
        console.log("Data", data);
        navigate("/");
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="d-flex justify-content-center vh-100 align-items-center text-center">
      <div className="container col-md-8">
        <div className="card shadow-lg">
          <div className="card-header display-6">Edit User</div>
          <div className="card-body">
            <form onSubmit={editUser}>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="nameField" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameField"
                    name="name"
                    value={user.name}
                    onChange={onInputChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="usernameField" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="usernameField"
                    name="username"
                    value={user.username}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group">
                  <label htmlFor="emailfield" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailField"
                    name="email"
                    value={user.email}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className="row mt-3 d-flex justify-content-center">
                <div className="col-md-6">
                  <input
                    type="submit"
                    className="btn btn-outline-primary"
                    value="Edit User"
                  />
                  <Link className="btn btn-outline-danger ms-2" to="/">
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
