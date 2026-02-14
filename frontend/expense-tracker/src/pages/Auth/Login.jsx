import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "", general: "" });

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    let emailError = "";
    let passwordError = "";

    if (!validateEmail(email)) {
      emailError = "Please enter a valid email address.";
    }

    if (!password) {
      passwordError = "Please enter the password.";
    }

    // Update the error object
    setError({ email: emailError, password: passwordError });

    // Stop execution if there are any errors
    if (emailError || passwordError) return;

    // Proceed with Login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        // Keep existing field errors, update 'general'
        setError({
          email: "",
          password: "",
          general: error.response.data.message,
        });
      } else {
        setError({
          email: "",
          password: "",
          general: "Something went wrong, Please try again.",
        });
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-4xl font-extrabold text-black">Welcome Back!</h3>
        <p className="text-sm text-slate-400 mt-1.5 mb-6">
          Please enter your details to log in
        </p>

        <form action="" onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
              if (error.email) setError({ ...error, email: "", general: "" }); // Clear error on type
            }}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          {error.email && (
            <p className="text-red-500 text-xs pb-2.5">{error.email}</p>
          )}

          <Input
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
              if (error.password)
                setError({ ...error, password: "", general: "" }); // Clear error on type
            }}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error.password && (
            <p className="text-red-500 text-xs pb-2.5">{error.password}</p>
          )}

          {error.general && (
            <p className="text-red-500 text-sm pb-3 text-center bg-red-50 py-2 mb-4 rounded border border-red-200">
              {error.general}
            </p>
          )}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
