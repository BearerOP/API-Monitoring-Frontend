const features = [
  {
    id: 1,
    imgSrc: 'https://via.placeholder.com/400',
    description: 'Real-time API monitoring and alerts',
  },
  {
    id: 2,
    imgSrc: 'https://via.placeholder.com/400',
    description: 'Detailed analytics and reports',
  },
  {
    id: 3,
    imgSrc: 'https://via.placeholder.com/400',
    description: 'Seamless integration with your tech stack',
  },
];

const Features = () => (
  <div className="features">
    <div className="container">
      <h2>Key Features</h2>
      {features.map((feature) => (
        <div key={feature.id} className="feature">
          <img src={feature.imgSrc} alt={`Feature ${feature.id}`} />
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Features;
