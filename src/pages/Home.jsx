import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import bannerImg from "../assets/images/banner-image-1.png";
import faqImg from "../assets/images/faq-v2.jpg";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import About from "../components/About/About";
import DoctorList from "../components/Doctors/DoctorList";
import FaqList from "../components/Faq/FaqList";
import Feature from "../components/Feature/Feature";
import ServiceList from "../components/Services/ServiceList";
import UserReviewHomeList from "../components/userReviewHome/UserReviewHomeList";

const Home = () => {
  return (
    <>
      {/* hero area start  */}

      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* hero content  */}
            <div>
              <div className="lg:w-[570px] ">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                  We motivate our patients to live a healthy, longer life
                </h1>
                <p className="text__pera">
                  Inspire individuals to embrace wellness, make positive
                  choices, and adopt habits that foster a vibrant, enduring life
                  filled with vitality.
                </p>

                <Link to="/doctors">
                  <button className="btn ">Request An Appointment</button>
                </Link>
              </div>

              {/* hero counter  */}
              <div className=" mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px] ">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    3+
                  </h2>
                  <span className="w-[60px] h-2 bg-yellowColor rounded-full block mt-[-14px] "></span>
                  <p className="text__pera">Years of Experience</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    15+
                  </h2>
                  <span className="w-[60px] h-2 bg-purpleColor rounded-full block mt-[-14px] "></span>
                  <p className="text__pera">Clinic Location</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    100%
                  </h2>
                  <span className="w-[120px] h-2 bg-irisBlueColor rounded-full block mt-[-14px] "></span>
                  <p className="text__pera">Patient Satisfaction</p>
                </div>
              </div>
            </div>

            {/* hero content  */}

            <div className="flex gap-[30px] justify-end">
              <div>
                <img className="w-full" src={bannerImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* hero area end  */}

      <section>
        <div className="container">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center">
              Providing the best Appointment Booking Services
            </h2>
            <p className="text__pera text-center">
              world class care for everyone. Our health System offers unmatched,
              expert health care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            {/* one  */}

            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon01} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find a Doctor
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  World class care for everyone. Our health System offers
                  unmatched, expert health care. From the lab to the hospital
                </p>

                <Link
                  to="/doctors"
                  className="w-[44px]  h-[44px] rounded-full border border-solid border-[#121213] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor"
                >
                  <BsArrowRight className="group-hover:text-white w-9 h-8" />
                </Link>
              </div>
            </div>

            {/* two  */}

            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon02} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find a Location
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Discover our convenient locations, bringing quality healthcare
                  closer to you. Locate the nearest facility for accessible and
                  reliable services.
                </p>

                <Link
                  to="/doctors"
                  className="w-[44px]  h-[44px] rounded-full border border-solid border-[#121213] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor"
                >
                  <BsArrowRight className="group-hover:text-white w-9 h-8" />
                </Link>
              </div>
            </div>

            {/* three */}
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon03} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Book Appointment
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Schedule your appointment now for personalized care,
                  prioritizing your health and well-being. Take the first step
                  towards a healthier life.
                </p>

                <Link
                  to="/doctors"
                  className="w-[44px]  h-[44px] rounded-full border border-solid border-[#121213] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor"
                >
                  <BsArrowRight className="group-hover:text-white w-9 h-8" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* service section start */}

      <section id="services">
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our Medical Services</h2>
            <p className="text__pera text-center">
              World class care for everyone. Our health system offers unmatched
              expert health care
            </p>
          </div>

          <ServiceList />
        </div>
      </section>
      {/* service section  end */}

      {/* about us  section  start */}
      <About />
      {/* about us  section  end */}

      {/* our doctors start */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our Doctors</h2>
            <p className="text__pera text-center">
              World class care for everyone. Our health system offers unmatched
              expert health care
            </p>
          </div>

          <DoctorList />
        </div>
      </section>
      {/* our doctors end */}

      {/* feature section start  */}

      <section>
        <div className="container">
          <Feature />
        </div>
      </section>

      {/* feature section end  */}

      {/* faq area start  */}

      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <img src={faqImg} alt="" />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="heading mb-5">
                Most questions by our beloved patients
              </h2>

              <FaqList />
            </div>
          </div>
        </div>
      </section>
      {/* faq area end  */}

      {/* user review  start */}

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center ">What our patient say</h2>
            <p className="text__pera text-center">
              See what our patients think about us
            </p>
          </div>
          <UserReviewHomeList />
        </div>
      </section>

      {/* user review  end */}
    </>
  );
};

export default Home;
