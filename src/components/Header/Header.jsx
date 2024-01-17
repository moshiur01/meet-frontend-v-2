/* eslint-disable no-constant-condition */
import { useEffect, useRef } from "react";
import { BiMenu } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
// import avatar from "../../assets/images/tempUser.jpg";
import { getUserInfo } from "../../services/auth.service";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

function Header() {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const { id, name, role } = getUserInfo();

  // console.log(photo);
  // console.log(id, role, name);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  //scrolling behavior handle
  useEffect(() => {
    handleStickyHeader();

    return () => {
      window.removeEventListener("scroll", handleStickyHeader);
    };
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* logo  */}
          <Link to="/home">
            <div>
              <img src={logo} alt="" className="lg:w-40 sm:w-28" />
            </div>
          </Link>

          {/* navbar menu  */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link?.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link?.display}
                  </NavLink>
                </li>
              ))}

              {id && role === "patient" && (
                <li>
                  <NavLink
                    to="/user/profile"
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    Profile
                  </NavLink>
                </li>
              )}

              {id && role === "doctor" && (
                <li>
                  <NavLink
                    to="/doctors/profile"
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    Profile
                  </NavLink>
                </li>
              )}
              {id && role === "admin" && (
                <li>
                  <NavLink
                    to="/admin/profile"
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    Profile
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* avatar image  */}

          <div className="flex items-center gap-4 ">
            {id ? (
              <>
                <div className="">
                  <Link to="/home">
                    {/* <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                      <img src={photo} alt="" className="w-full rounded-full" />
                    </figure> */}

                    <h1 className="text-xl ">
                      {" "}
                      <span className="font-bold">Welcome: </span>
                      {name?.split(" ")[0]}
                    </h1>
                  </Link>
                </div>
              </>
            ) : (
              /* login button */
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            {/* mobile menu  */}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
