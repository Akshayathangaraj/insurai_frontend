import React from 'react';


export default function Home(){
return (
<div className="container">
<section className="hero">
<div className="hero-left">
<h1 style={{fontFamily:'Montserrat, sans-serif', fontSize:36, margin:0}}>Welcome to <span style={{color:'#0b5cf6'}}>INSURAI</span></h1>
<p className="lead">Modern insurance solutions for teams and employees. Clean UI, future-ready integration with your Java backend.</p>


<div className="features" aria-hidden>
<div className="feature">Employee management</div>
<div className="feature">Policy tracking</div>
<div className="feature">Claims dashboard (planned)</div>
</div>


<p style={{marginTop:18}}>Useful features to add later: <strong>email verification, role-based access, JWT auth, profile pictures, password reset, admin panel</strong>.</p>
</div>


<div className="hero-right card">
<h3 style={{marginTop:0}}>Get started</h3>
<p className="small">Create an account to manage policies and employees.</p>


<div style={{display:'flex', gap:8, marginTop:12}}>
<a className="btn btn-primary" href="/signup">Create account</a>
<a className="btn" href="/login">Sign in</a>
</div>
</div>
</section>


<div className="footer">Insurai — frontend prototype. Backend integration coming later.</div>
</div>
);
}