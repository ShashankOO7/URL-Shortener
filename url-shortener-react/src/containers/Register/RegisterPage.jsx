import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField/InputField";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../service/authService";
import toast from "react-hot-toast";
import { globalConstants } from "../../constants/globalConstants";
import { notificationConstants } from "../../constants/notificationConstants";
import { endpoints } from "../../constants/apiConstants";
import { authConstants } from "../../constants/authConstants";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { SubmitButton } from "../../components/Button/SubmitButton";
export default function RegisterPage() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });
  const registerHandler = async (data) => {
    //console.log(import.meta.env.VITE_BACKEND_URL);
    if (data.password !== data.confirmPassword) {
      toast.error(authConstants.registerConstants.PASSWORDS_DO_NOT_MATCH);
      return;
    }
    setLoader(true);
    try {
      await authService.register(data);
      reset();
      navigate(endpoints.auth.login);
      toast.success(notificationConstants.register.SUCCESS);
    } catch (error) {
      // Check if error response contains "Username already exists" message
      const errorMessage = error.response?.data?.body || error.response?.data?.message;
      if (errorMessage === "Username already exists") {
        toast.error("Username already exists");
      } else {
        toast.error(notificationConstants.register.ERROR);
      }
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8 z-10">
        <h2 className="text-2xl font-bold h-15 text-center text-white">
          {authConstants.registerConstants.CREATE_ACCOUNT}
        </h2>
        <form
          onSubmit={handleSubmit(registerHandler)}
          className="flex flex-col gap-4"
        >
          <InputField
            label={globalConstants.inputField.userName.label}
            id={globalConstants.inputField.userName.id}
            type={globalConstants.inputField.userName.type}
            placeholder={globalConstants.inputField.userName.placeholder}
            register={register}
            errors={errors}
            required
            message={globalConstants.inputField.userName.message}
            min={globalConstants.inputField.userName.min}
            icon={FaUser}
          />
          <InputField
            label={globalConstants.inputField.email.label}
            id={globalConstants.inputField.email.id}
            type={globalConstants.inputField.email.type}
            placeholder={globalConstants.inputField.email.placeholder}
            register={register}
            errors={errors}
            required
            message={globalConstants.inputField.email.message}
            icon={FaEnvelope}
          />
          <InputField
            label={globalConstants.inputField.password.label}
            id={globalConstants.inputField.password.id}
            type={globalConstants.inputField.password.type}
            placeholder={globalConstants.inputField.password.placeholder}
            register={register}
            errors={errors}
            required
            message={globalConstants.inputField.password.message}
            min={globalConstants.inputField.password.min}
            icon={FaLock}
          />
          <InputField
            label={globalConstants.inputField.confirmPassword.label}
            id={globalConstants.inputField.confirmPassword.id}
            type={globalConstants.inputField.confirmPassword.type}
            placeholder={globalConstants.inputField.confirmPassword.placeholder}
            register={register}
            errors={errors}
            required
            message={globalConstants.inputField.confirmPassword.message}
            min={globalConstants.inputField.confirmPassword.min}
            icon={FaLock}
          />
          <SubmitButton loader={loader} name={authConstants.REGISTER} />
        </form>
        <p className="text-sm mt-4 text-center text-gray-600 dark:text-gray-300">
          {authConstants.registerConstants.EXISTING_ACCOUNT}{" "}
          <Link
            to={endpoints.auth.login}
            className="text-blue-600 hover:underline"
          >
            {authConstants.loginConstants.LOGIN}
          </Link>
        </p>
      </div>
    </div>
  );
}
