import { FaLink } from "react-icons/fa";
const Placeholder = ({
  message = "You haven't created any short link yet",
  icon: Icon = FaLink,
}) => {
  return (
    <div className="flex justify-center pt-15">
      <div className="flex gap-2 items-center justify-center py-5 sm:px-8 px-5 rounded-md shadow-lg bg-gray-50">
        <h1 className="text-slate-800 font-montserrat sm:text-[18px] text-[14px] font-semibold mb-1">
          {message}
        </h1>
        <Icon className="text-blue-500 sm:text-xl text-sm" />
      </div>
    </div>
  );
};
export default Placeholder;
