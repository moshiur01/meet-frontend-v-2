import { Link } from "react-router-dom";
import notFoundImg from "../assets/images/error.png";

const NotFoundPage = () => {
  return (
    <div className="relative">
      <div className="logo sm:block sm:pt-0 sm:pb-0 sm:absolute sm:top-8 sm:left-10 flex items-center justify-center pt-20"></div>
      <main className="w-full sm:max-w-7xl sm:mx-auto text-center pt-20">
        <h3 className="text-4xl text-gray-600 font-medium">
          Page Not Found 🦇
        </h3>
        <p className="text-2xl text-gray-500 font-normal normal-case py-7">
          Oops! 😓 The requested URL was not found on this server.
        </p>
        <Link to="/home">
          <button className="bg-irisBlueColor text-white font-[600] rounded-lg px-5 py-4">
            Back to home
          </button>
        </Link>
        <img
          src={notFoundImg}
          alt="error"
          className="w-96 object-cover mt-4 mx-auto"
        />
      </main>
    </div>
  );
};

export default NotFoundPage;
