// GradientCard.jsx

import '../Css/cardGradient.css';

const Cards = ({ text }) => {
  return (
    <div className="flex justify-around">
      <div className="parentCard w-75 max-width-96 ">
        <div className="childCard">
          <h1 className="text-xl">
            {text}
            {/* {text.heading}
            {text.value} */}
          </h1>
          <div className="grandChildCard"></div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
