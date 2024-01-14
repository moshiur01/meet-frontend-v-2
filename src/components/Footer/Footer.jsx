// import {RiLinkedinFill} from 'react-icons/ri'
// import {AiFillYoutube,AiFillInstragram } from 'react-icons/ai'
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="font-[700]  p-4">
      <div className="container mx-auto text-center">
        <p>&copy; {year} Meet your doctor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
