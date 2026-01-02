import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">✨ BlogSpace</Link>
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                {user ? (
                    <>
                        <Link to="/create" className="btn-primary">Write Post</Link>
                        <span className="user-greeting">Hi, {user.name}</span>
                        <button onClick={logout} className="btn-text">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register" className="btn-primary">Get Started</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
