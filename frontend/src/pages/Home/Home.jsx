import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Home.css'
import logo from './logo.png'
const Home = () => {
  return (
    <>
      <nav className='navbar'>
        <div className='logo'>
          <img src={logo} alt='EduTech Logo' className='logo-img' />
          <span>Pencil Connect</span>
        </div>
        <div className='nav-links'>
          <div className='auth-buttons'>
            <a href='login' className='auth-btn'>Log In</a>
            <a href='/role' className='auth-btn'>Sign Up</a>
          </div>
        </div>
      </nav>

      <section className='features-section'>
        <h2 className='section-title'>Features</h2>
        <div className='features-grid'>
          <div className='feature-card'>
            <i className='fas fa-laptop-code'></i>
            <h3>Online Learning</h3>
            <p>Access courses anytime, anywhere with our flexible learning platform.</p>
          </div>
          <div className='feature-card'>
            <i className='fas fa-users'></i>
            <h3>Community Support</h3>
            <p>Join a vibrant community of learners and educators.</p>
          </div>
          <div className='feature-card'>
            <i className='fas fa-certificate'></i>
            <h3>Certifications</h3>
            <p>Earn recognized certificates upon course completion.</p>
          </div>
          <div className='feature-card'>
            <i className='fas fa-clock'></i>
            <h3>Self-Paced</h3>
            <p>Learn at your own pace with lifetime access to courses.</p>
          </div>
        </div>
      </section>

      <section className='who-can-join'>
        <h2 className='section-title'>Who Can Join</h2>
        <div className='cards-container'>
          <div className='join-card'>
            <div className='card-icon'>
              <i className='fas fa-user-graduate'></i>
            </div>
            <h3>Students</h3>
            <p>Access quality education, connect with peers, and enhance your learning journey with interactive resources.</p>
          </div>
          <div className='join-card'>
            <div className='card-icon'>
              <i className='fas fa-chalkboard-teacher'></i>
            </div>
            <h3>Alumni</h3>
            <p>Share your knowledge, create engaging content, and make a difference in students' educational experience.</p>
          </div>
        </div>
      </section>

      <footer>
        <div className='left-links'>
          <a href='#'>Privacy Policy</a> | 
          <a href='#'>Terms of use</a>
        </div>
        <div className='copyright'>
          Copyright © 2025 Pencil Connect All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Home;
