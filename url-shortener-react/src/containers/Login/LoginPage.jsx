import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField/InputField"; // reused from Register
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../service/authService";
import toast from "react-hot-toast";
import { useAuthContext } from "../../hooks/useAuthContext";
import { globalConstants } from "../../constants/globalConstants";
import { notificationConstants } from "../../constants/notificationConstants";
import { endpoints } from "../../constants/apiConstants";
import { authConstants } from "../../constants/authConstants";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { SubmitButton } from "../../components/Button/SubmitButton";
export default function LoginPage() {
  const navigate = useNavigate();
  const { setToken, setUsername } = useAuthContext();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onTouched",
  });
  const loginHandler = async (data) => {
    setLoader(true);
    try {
      const { data: response } = await authService.login(data);
      // Extract token from nested response structure: { apiStatus: {...}, body: null, data: { token: "..." } }
      const token = response?.data?.token;
      if (!token) {
        throw new Error("Token not found in response");
      }
      setToken(token);
      localStorage.setItem("JWT_TOKEN", JSON.stringify(token));
      // Store username for display
      setUsername(data.username);
      localStorage.setItem("USERNAME", JSON.stringify(data.username));
      toast.success(notificationConstants.login.SUCCESS);
      reset();
      navigate(endpoints.dashboard.url);
    } catch {
      toast.error(notificationConstants.login.ERROR);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8 z-10">
        <h2 className="text-2xl font-bold text-center text-white h-15">
          Login
        </h2>
        <form
          onSubmit={handleSubmit(loginHandler)}
          className="flex flex-col gap-4"
        >
          <InputField
            label={globalConstants.inputField.userName.label}
            type={globalConstants.inputField.userName.type}
            id={globalConstants.inputField.userName.id}
            placeholder={globalConstants.inputField.userName.placeholder}
            register={register}
            errors={errors}
            required
            message={globalConstants.inputField.userName.message}
            min={globalConstants.inputField.userName.min}
            icon={FaEnvelope}
          />
          <InputField
            label={globalConstants.inputField.password.label}
            type={globalConstants.inputField.password.type}
            id={globalConstants.inputField.password.id}
            placeholder={globalConstants.inputField.password.placeholder}
            register={register}
            errors={errors}
            required
            message={globalConstants.inputField.password.message}
            min={globalConstants.inputField.password.min}
            icon={FaLock}
          />
          <SubmitButton loader={loader} name={authConstants.LOGIN} />
        </form>
        <p className="text-sm mt-4 text-center text-gray-600 dark:text-gray-300">
          {authConstants.loginConstants.NEW_ACCOUNT}{" "}
          <Link
            to={endpoints.auth.register}
            className="text-blue-600 hover:underline"
          >
            {authConstants.REGISTER}
          </Link>
        </p>
      </div>
    </div>
  );
}
