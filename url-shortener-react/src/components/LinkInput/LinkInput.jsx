import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LinkIcon } from "@heroicons/react/24/outline";
import { FaArrowRight } from "react-icons/fa6";
import toast from "react-hot-toast";
import { landingPageConstants } from "../../constants/landingPageConstants";
import { useAuthContext } from "../../hooks/useAuthContext";
import { ClipLoader } from "react-spinners";
import { useQueryClient } from "@tanstack/react-query";
import api from "../../auth/api";
export default function LinkInput({ refetch }) {
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });
  const onSubmit = async (data) => {
    //console.log("Shortened URL input:", data);
    setLoading(true);
    try {
      const { data: res } = await api.post("/api/urls/shorten", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const shortenUrl = `${
        import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${res.shortUrl}`
      }`;
      navigator.clipboard.writeText(shortenUrl).then(() => {
        toast.success("Short URL Copied to Clipboard", {
          position: "bottom-center",
          className: "mb-5",
          duration: 3000,
        });
      });
      // Invalidate all URL-related queries to refresh paginated views
      await queryClient.invalidateQueries({ queryKey: ["my-shorten-urls"] });
      await queryClient.invalidateQueries({ queryKey: ["my-shorten-urls-infinite"] });
      if (refetch) await refetch();
      reset();
    } catch {
      toast.error("Failed to create short URL.");
    } finally {
      setLoading(false);
    }
  };
  const onError = (formErrors) => {
    if (formErrors?.originalUrl) {
      toast.error(formErrors.originalUrl.message, { id: "url-error" });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col gap-2 w-full"
    >
      {/* Input + Button */}
      <div className="flex items-center bg-[#181e29] rounded-full px-0.5 py-0.5 shadow-lg outline-4 outline-offset-2 outline-gray-700">
        <LinkIcon className="w-5 h-5 ml-4 text-gray-400" />
        <input
          type="text"
          placeholder={landingPageConstants.inputPlaceholder}
          className={
            "flex-1 bg-transparent px-3 outline-none text-white placeholder-gray-400"
          }
          {...register("originalUrl", {
            required: {
              value: true,
              message: landingPageConstants.inputError.REQUIRED,
            },
            pattern: {
              value:
                /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
              message: landingPageConstants.inputError.INVALID,
            },
          })}
        />
        <button
          type="submit"
          className="px-2 py-2 md:px-9 md:py-4 rounded-full cursor-pointer bg-btn hover:bg-blue-600 text-white flex items-center justify-center">

          {loading ? (
            <ClipLoader size={24} />
          ) : (
            <>
              {/* Show text on medium+ screens */}
              <span className="hidden md:block">
                {landingPageConstants.SHORTEN_NOW}
              </span>
              {/* Show icon on mobile screens */}
              <span className="block md:hidden">
                <FaArrowRight className="h-6 w-6" />
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
// import React from "react";
// import { LinkIcon } from "@heroicons/react/24/outline";
// import { FaArrowRight } from "react-icons/fa6";
// import { landingPageConstants } from "../../constants/landingPageConstants";
// export default function LinkInput() {
//   return (
//     <div className="flex items-center bg-gray-900 rounded-full px-0.5 py-0.5 shadow-lg outline-4 outline-offset-2 outline-gray-700">
//       <LinkIcon className="w-5 h-5 ml-4 text-gray-400" />
//       <input
//         type="text"
//         placeholder="Enter the link here"
//         className="flex-1 bg-transparent px-3 outline-none text-white placeholder-gray-400"
//       />
//       <button className="px-3.5 py-3 md:px-9 md:py-4 rounded-full cursor-pointer bg-btn hover:bg-blue-600 text-white flex items-center ju"
//         {/* Show text on medium+ screens */}
//         <span className="hidden md:block">{landingPageConstants.SHORTEN_NOW}</span>
//         {/* Show icon on mobile screens */}
//         <span className="block md:hidden">
//           <FaArrowRight />
//         </span>
//       </button>
//     </div>
//   );
// }
