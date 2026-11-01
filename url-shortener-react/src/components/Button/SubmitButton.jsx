import React from "react";
import { Spinner } from "../Spinner/Spinner";
export const SubmitButton = ({ loader, name }) => {
  return (
    <div>
      <button
        type="submit"
        disabled={loader}
        className="w-full mt-2 h-10 bg-btn hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer relative flex items-center justify-center">

        {loader ? <Spinner /> : name}
      </button>
    </div>
  );
};
