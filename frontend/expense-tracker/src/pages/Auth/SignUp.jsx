import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({ email: "", password: "", fullName: "" });

  const navigate = useNavigate();

  // Handle Sign up from submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    let emailError = "";
    let passwordError = "";
    let fullNameError = "";
    // let profileImageUrl = "";

    if (!validateEmail(email)) {
      emailError = "Please enter a valid email address.";
    }

    if (!password) {
      passwordError = "Please enter the password.";
    }

    if (!fullName) {
      fullNameError = "Please enter your full name.";
    }

    // Update the error object
    setError({
      email: emailError,
      password: passwordError,
      fullName: fullNameError,
    });

    // Stop execution if there are any errors
    if (emailError || passwordError || fullNameError) return;
  };
  return (
    <AuthLayout>
      <div className="lg:w-full h-2/3 md:h-full mt-0 md:mt-0 flex flex-col justify-center">
        <div className="text-4xl font-extrabold text-black">
          Create an Account
        </div>
        <p className="text-sm text-slate-400 mt-1.5 mb-6">
          Join us today by entering your deatils below.
        </p>

        <form action="" onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Input
                value={fullName}
                onChange={({ target }) => {
                  setFullName(target.value);
                  if (error.fullName) setError({ ...error, fullName: "" }); // Fixed typo here
                }}
                label="Full Name"
                placeholder="John Wick"
                type="text"
              />
              {error.fullName && (
                <p className="text-red-500 text-xs mt-1 mb-2">
                  {error.fullName}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <Input
                value={email}
                onChange={({ target }) => {
                  setEmail(target.value);
                  if (error.email) setError({ ...error, email: "" });
                }}
                label="Email Address"
                placeholder="john@example.com"
                type="text"
              />
              {error.email && (
                <p className="text-red-500 text-xs mt-1 mb-2">{error.email}</p>
              )}
            </div>

            <div className="col-span-1 md:col-span-2 flex flex-col">
              <Input
                value={password}
                onChange={({ target }) => {
                  setPassword(target.value);
                  if (error.password) setError({ ...error, password: "" });
                }}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
              />
              {error.password && (
                <p className="text-red-500 text-xs mt-1 mb-2">
                  {error.password}
                </p>
              )}
            </div>
          </div>

          <button type="submit" className="btn-primary">
            REGISTER
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
