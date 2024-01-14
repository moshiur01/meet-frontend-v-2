import { MdTableChart } from "react-icons/md";
import appointmentImg from "../../assets/images/appointment-date-pic.png";

const Feature = () => {
  return (
    <div className="lg:flex items-center">
      <div className="lg:flex-none w-full lg:w-8/12 mb-8 lg:mb-0">
        <img src={appointmentImg} alt="" className="w-full h-auto" />
      </div>
      <div className="lg:flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-5xl font-bold leading-6 text-gray-800 mb-4 ">
            The Best Online <br />
            <span className="block sm:mt-5">Appointment</span>
          </h1>
          <p className="text-base font-normal text-gray-500 mb-4">
            When choosing the best platform for your needs, consider factors
            like your business size, budget, specific requirements ease of use,
            and any unique features that stand out to you
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="mb-8">
            <MdTableChart className="w-10 h-10" />
            <h2 className="text-lg lg:text-xl font-semibold mt-2">
              Seamless User Experience
            </h2>
            <p>Booking SaaS System offers a seamless user experience</p>
          </div>
          <div className="mb-8">
            <MdTableChart className="w-10 h-10" />
            <h2 className="text-lg lg:text-xl font-semibold mt-2">
              Customisable & Scalable
            </h2>
            <p>
              We pride a highly customisable and scalable online appointment
            </p>
          </div>
          <div className="mb-8">
            <MdTableChart className="w-10 h-10" />
            <h2 className="text-lg lg:text-xl font-semibold mt-2">
              Robust Feature Set
            </h2>
            <p>Set of features designed to streamline appointment management</p>
          </div>
          <div className="mb-8">
            <MdTableChart className="w-10 h-10" />
            <h2 className="text-lg lg:text-xl font-semibold mt-2">
              Security & Support
            </h2>
            <p>
              Security and customer support are at the forefront of our
              priorities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
