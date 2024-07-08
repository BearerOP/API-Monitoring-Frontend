import React from 'react';
import '../Css/LandingPage.css';

const Cards = () => (
  <div className="cards card-container">
    <div className="card card-gradient">
      <h3>Customers</h3>
      <div className="value">1,553</div>
      <p>New customers in past 30 days</p>
    </div>
    <div className="card">
      <h3>Revenue</h3>
      <div className="value">$12,543</div>
      <p>Revenue in the past month</p>
    </div>
    <div className="card">
      <h3>Today</h3>
      <div className="event">
        <p>Design system meeting</p>
        <p>9 - 10 AM</p>
      </div>
      <div className="event">
        <p>Lunch</p>
        <p>1 - 2 PM</p>
      </div>
      <div className="event">
        <p>Design review</p>
        <p>3 - 4 PM</p>
      </div>
    </div>
  </div>
);

export default Cards;
