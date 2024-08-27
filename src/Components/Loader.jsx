import '../Css/Loader.css';
const Loader = () => {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: '535px' }}
    >
      <div className=" loader ">
        <span className="loader-text flex justify-center">Loading</span>
        <span className="load"></span>
      </div>
    </div>
  );
};
export default Loader;
