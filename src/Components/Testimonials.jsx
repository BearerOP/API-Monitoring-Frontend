import React from 'react';

const testimonials = [
  { id: 1, text: 'This platform has transformed how we monitor our APIs.', author: 'Alex Johnson, CTO at TechCorp' },
  { id: 2, text: 'Invaluable insights and seamless integrations!', author: 'Maria Garcia, Lead Developer at DevSolutions' },
  { id: 3, text: 'Our API performance has improved significantly since using this tool.', author: 'John Doe, CEO at InnovateX' },
];

const Testimonials = () => (
  <div className="testimonials">
    <div className="container">
      <h2>What Our Customers Say</h2>
      {testimonials.map(testimonial => (
        <div key={testimonial.id} className="testimonial">
          <p>"{testimonial.text}"</p>
          <p>- {testimonial.author}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Testimonials;
