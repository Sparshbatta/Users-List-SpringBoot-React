import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar bg-dark navbar-dark navbar-expand-lg sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Full Stack App</Link>
            <Link className="btn btn-outline-warning" to="/adduser">Add User</Link>
            </div>
        </nav>
    )
}

export default Navbar;