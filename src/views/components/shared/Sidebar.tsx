import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import logo from "/assets/logo.png";
import { IoSettings } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { PiMicrosoftTeamsLogoFill } from "react-icons/pi";
import { RiPagesLine, RiUserSearchFill } from "react-icons/ri";
import { FaServicestack } from "react-icons/fa";
import { useAuth } from "../../../contexts/AuthProvider";
import apiClient from "../../services/api-client";
import logout from "/assets/sidebar/logout.svg";
const Sidebar = ({ isOpen }: { isOpen: (bool: boolean) => void }) => {
  const { setAuth } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const [, setActiveIndex] = useState<number | null>(null); // State to track active div
  const { t } = useTranslation();

  // const handleAccordionClick = (index: number) => {
  //   setActiveIndex(index); // Set the clicked div as active
  // };

  const handleLogOutButton = async () => {
    try {
      setIsLoading(true);
      await apiClient.post("/api/auth/logout");
      localStorage.removeItem("bruAuthToken"); // Adjust based on your storage method
      setAuth(null);

      navigate("/login");
      setIsLoading(false);
      (document.getElementById("logout_modal") as HTMLDialogElement).close();
    } catch (err: any) {
      if (!err?.response) {
        setError("No Server Response!");
      }
      setError(err.message);
      setIsLoading(false);
      // (document.getElementById("logout_modal") as HTMLDialogElement).close();
    }
  };

  const handleLogoutClick = () => {
    (document.getElementById("logout_modal") as HTMLDialogElement).showModal();
  };

  const activeLink =
    "flex items-center gap-5 pl-2 pt-3 pb-2.5 rounded-2xl  hover:bg-bruColorLight3 hover:text-bruColor text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-2 pt-3 pb-2.5 rounded-2xl text-md m-2  hover:bg-bruColorLight3 hover:text-bruColor";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    isOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`min-h-screen bg-gray-500 shadow-inner border-2 overflow-y-auto max-h-screen pb-10 sm:mt-2 rounded-e-[30px] transition-width duration-300 ${
        isSidebarOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex justify-between items-center p-4">
        <Link to="/" className="mt-6">
          {isSidebarOpen && (
            <img
              src={logo}
              alt="logo"
              className="object-contain w-[120px] h-[50px] "
            />
          )}
        </Link>
        <button onClick={toggleSidebar} className="text-2xl">
          <MdMenu />
        </button>
      </div>

      {isSidebarOpen && (
        <div className="mt-8 mx-2 text-white ">
          <NavLink
            to={`/projects`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <RiPagesLine />
            <span className="capitalize ">Jobs</span>
          </NavLink>
          <NavLink
            to={`/blogs`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <PiMicrosoftTeamsLogoFill />
            <span className="capitalize ">Blogs</span>
          </NavLink>
          <NavLink
            to={`/packages`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <PiMicrosoftTeamsLogoFill />
            <span className="capitalize ">Packages</span>
          </NavLink>
          <NavLink
            to={`/pages`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <RiPagesLine />
            <span className="capitalize ">Pages</span>
          </NavLink>
          <NavLink
            to={`/services`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <FaServicestack />
            <span className="capitalize ">Services</span>
          </NavLink>
          {/* <NavLink
            to={`/sliders`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <FaSliders />
            <span className="capitalize ">Sliders</span>
          </NavLink> */}
          <NavLink
            to={`/clients`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <RiUserSearchFill />
            <span className="capitalize ">Sponsors</span>
          </NavLink>
          <NavLink
            to={`/reviews`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <IoSettings />
            <span className="capitalize ">Reviews</span>
          </NavLink>
          <NavLink
            to={`/settings`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <IoSettings />
            <span className="capitalize ">Settings</span>
          </NavLink>
          <div
            onClick={handleLogoutClick}
            className={`${normalLink} cursor-pointer`}
          >
            <img src={logout} alt="home" />
            <span>{t("sidebar:sidebar.logout")}</span>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <dialog id="logout_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {error && (
            <p className="bg-error p-2 rounded-md text-white mb-4">{error}</p>
          )}

          <p className="py-4">{t("logout:logout.sure")}</p>
          <div className="modal-action gap-4">
            <button
              className="btn"
              onClick={() => {
                (
                  document.getElementById("logout_modal") as HTMLDialogElement
                ).close();
                setError("");
              }}
            >
              {t("logout:logout.cancel")}
            </button>
            <button className="btn btn-error" onClick={handleLogOutButton}>
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                ` ${t("logout:logout.confirm")}`
              )}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Sidebar;
