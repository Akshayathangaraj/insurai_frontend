import React from 'react';
import { Link, useLocation } from 'react-router-dom';


export default function Navbar(){
const loc = useLocation();
return (
<header className="container">
<nav className="navbar">
<div className="brand">
<div className="logo">INSURAI</div>
<div className="small">Smarter Insurance</div>
</div>


<div className="navlinks">
<Link className={`btn ${loc.pathname==='/' ? 'btn-outline' : ''}`} to="/">Home</Link>
<Link className={`btn ${loc.pathname==='/login' ? 'btn-primary' : ''}`} to="/login">Login</Link>
<Link className={`btn ${loc.pathname==='/signup' ? 'btn-primary' : ''}`} to="/signup">Signup</Link>
</div>
</nav>
</header>
);
}