import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    axios
      .get("http://localhost:9494/users")
      .then((data) => {
        console.log("DATA", data);
        setUsers(data.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  useEffect(loadUsers, []);

  const deleteUser = async (user) => {
    console.log("USER", user);
    await axios.delete(`http://localhost:9494/user/${user.id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="d-flex justify-content-center">
          {users.length === 0 ? (
            <>
              <div className="display-6">
                Oops!! No User To Display :(... <br />
                Add Some Users
              </div>
            </>
          ) : (
            <table className="table table-striped table-dark table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, key) => (
                  <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td className="text-center">
                      <Link
                        className="btn btn-primary mx-2"
                        to={`/viewuser/${item.id}`}
                      >
                        View
                      </Link>
                      <Link
                        className="btn btn-outline-primary mx-2"
                        to={`/edituser/${item.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => {
                          deleteUser(item);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
