// import aboutImg from "../../assets/images/about.png";
import { Link } from "react-router-dom";
import aboutImg from "../../assets/images/about-v2.jpg";
const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between  items-center  gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          {/* about img  */}

          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={aboutImg} alt="" />
          </div>

          {/* about content  */}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2 ">
            <h2 className="heading">
              Proud to be one of the nations best platform
            </h2>
            <p className="text__pera">
              Honored to stand among the nations premier platforms, offering
              unparalleled services and making a positive impact on individuals
              lives.
            </p>

            <p className="text__pera mt-[30px]">
              Our best us something we strive for each day, caring for our
              patients not looking back at what we accomplished but towards what
              we can do tomorrow. Providing the best.
            </p>

            <Link to="/doctors">
              <button className="btn">Book Appointment</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
