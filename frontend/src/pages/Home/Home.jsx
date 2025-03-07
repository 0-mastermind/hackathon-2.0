import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Home.css';
import logo from './logo.png';

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

      <section className='hero'>
        <div className='hero-content'>
          <h1>Empowering Your Learning Journey</h1>
          <p>Join thousands of students and educators in a vibrant community dedicated to lifelong learning.</p>
        </div>
        <div className='hero-stats'>
          <div className='stat-box'>
            <span className='stat-number'>Connect</span>
            <span className='stat-label'>Build meaningful relationships</span>
          </div>
          <div className='stat-box'>
            <span className='stat-number'>Learn</span>
            <span className='stat-label'>Access top-notch resources</span>
          </div>
          <div className='stat-box'>
            <span className='stat-number'>Grow</span>
            <span className='stat-label'>Achieve your full potential</span>
          </div>
        </div>
      </section>

      <section className='features-section'>
  <h2 className='section-title'>Features</h2>
  <div className='features-grid'>
    <div className='feature-card'>
      <i className='fas fa-handshake'></i>
      <h3>Connect</h3>
      <p>Build meaningful relationships with alumni and students to expand your network.</p>
    </div>
    <div className='feature-card'>
      <i className='fas fa-users'></i>
      <h3>Community Support</h3>
      <p>Join a vibrant community of learners and educators for collaboration and growth.</p>
    </div>
    <div className='feature-card'>
      <i className='fas fa-briefcase'></i>
      <h3>Job Opportunities</h3>
      <p>Access exclusive job opportunities and career resources to advance your professional journey.</p>
    </div>
    <div className='feature-card'>
      <i className='fas fa-network-wired'></i>
      <h3>Networking</h3>
      <p>Enhance your professional network through events, mentorship, and industry connections.</p>
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