import { BiLogOut, BiMath, BiSolidReport, BiUser } from "react-icons/bi";
import { CiBoxList } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "./MainLayout.css";
import logo from "../assets/image/logo.png";

const MainLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const userName = JSON.parse(localStorage.getItem("user"));
  const position = userName?.data?.position;
  console.log(position)
  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Link to="/user/dashboard">
            <img src={logo} />
          </Link>
          <ul className="space-y-2 font-medium mt-10">
            <div className="mb-10">
              <li>
                <NavLink
                  to="/user/dashboard"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      : isActive
                      ? "active flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  }
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </NavLink>
              </li>
              {
                position ==='admin'&&  <li className="mt-5">
                <NavLink
                  to="/user/addUser"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      : isActive
                      ? "active flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  }
                >
                  <BiUser/>
                  <span className="ms-3">AddUser</span>
                </NavLink>
              </li>
              }
              <li>
                <NavLink
                  to="/user/profile"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      : isActive
                      ? "active flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  }
                >
                  <FaUser />

                  <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/buyer"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      : isActive
                      ? "active flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  }
                >
                  <CiBoxList />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Buyer List
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/ledger"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      : isActive
                      ? "active flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  }
                >
                  <BiMath />
                  <span className="flex-1 ms-3 whitespace-nowrap">Ledger</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/report"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      : isActive
                      ? "active flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  }
                >
                  <BiSolidReport />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    View Reports
                  </span>
                </NavLink>
              </li>
            </div>
            <div className="">
              <li>
                <div
                  onClick={handleLogout}
                  to=""
                  className="flex items-center p-2 text-white bg-red-500 rounded-lg hover:text-black hover:bg-transparent hover: border transition-all  group cursor-pointer"
                >
                  <button className="flex items-center ">
                    {" "}
                    <BiLogOut />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      LogOut
                    </span>
                  </button>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg dark:border-gray-700">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
