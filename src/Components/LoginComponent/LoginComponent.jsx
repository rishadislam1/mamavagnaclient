import "./LoginComponent.css";
import loginimg from "../../assets/image/login.jpg";
import { useEffect, useState } from "react";
import { LoginApi } from "../../apiRequest/LoginApi.jsx";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loginData, setLoginData] = useState({});
  const [message, setMessage] = useState("");
  useEffect(() => {
    const login = async () => {
      const logData = await LoginApi(data);

      setLoginData(logData);
    };
    login();
  }, [data]);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setData({ email: email, password: password });
    form.reset();
  };
  useEffect(() => {
    if (loginData?.status === false) {
      setMessage(loginData.message);
    } else if (loginData?.status === true) {
      localStorage.setItem("user", JSON.stringify(loginData));
      navigate("/user/dashboard");
      setMessage("");
    }
  }, [loginData, navigate]);

  return (
    <div>
      <div className="loginbg h-screen flex justify-center items-center">
        <div className="loginformbg grid grid-cos-1 md:grid-cols-2 gap-5 justify-center items-center">
          <div>
            <img
              src={loginimg}
              style={{
                objectFit: "cover",
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
              }}
              className="h-[500px] w-full rounded-xl"
            />
          </div>
          <div>
            <div>
              <div className=" flex items-center justify-center">
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold text-white text-center">
                    Login
                  </h2>
                  <p className="mt-2 text-center text-gray-400">
                    Access your account
                  </p>
                  <form className="mt-4" onSubmit={handleLogin}>
                    <div className="flex flex-col mb-4">
                      <label className="text-gray-300" htmlFor="login">
                        Email
                      </label>
                      <input
                        className="px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        id="login"
                        placeholder="Enter your login"
                        required
                        type="email"
                        name="email"
                        onChange={() => setMessage("")}
                      />
                    </div>
                    <div className="flex flex-col mb-6">
                      <label className="text-gray-300" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        id="password"
                        placeholder="Enter your password"
                        required
                        type="password"
                        name="password"
                        onChange={() => setMessage("")}
                      />
                    </div>
                    <button
                      className="w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                      type="submit"
                    >
                      <span className="flex items-center justify-center">
                        <span>Sign in</span>
                        <span className="ml-2 animate-spin h-5 w-5 text-white"></span>
                      </span>
                    </button>
                  </form>
                  <p className="text-red-500 mt-5">{message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
