import contactImage from "../assets/images/contact-us.png";

const Contact = () => {
  return (
    <div className="container">
      <section className="flex flex-col lg:flex-row items-center justify-center">
        {/* Image for larger screens */}
        <div className="hidden lg:w-1/2 lg:flex justify-center items-center">
          <img
            src={contactImage}
            alt="Contact Us"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="px-4 mx-auto max-w-screen-md">
          <h2 className="heading text-center">Contact Us</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text__pera">
            Got a technical issue? Want to send feedback about a beta feature?
            Feel free to knock us
          </p>

          <form className="space-y-8">
            {/* email */}
            <div>
              <label htmlFor="email" className="form__label">
                Your Email
              </label>

              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className="form__input mt-1"
              />
            </div>

            {/* subject */}
            <div>
              <label htmlFor="subject" className="form__label">
                Subject
              </label>

              <input
                type="text"
                id="subject"
                placeholder="Let us know how we can help you"
                className="form__input mt-1"
              />
            </div>

            {/* subject */}
            <div className="sm:col-span-2">
              <label htmlFor="message" className="form__label">
                Your Message
              </label>

              <textarea
                rows="6"
                type="text"
                id="message"
                placeholder="Write your message briefly"
                className="form__input mt-1"
              />
            </div>

            <button type="submit" className="btn rounded sm:w-fit">
              Submit
            </button>
          </form>
        </div>

        {/* Image for mobile screens */}
        <div className="lg:hidden mt-8 w-full">
          <img
            src={contactImage}
            alt="Contact Us"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default Contact;
