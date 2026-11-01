import { URLStatus } from "../../Constants.js";
const StatusCell = (props) => {
  const { value } = props;
  const isActive = value === URLStatus.ACTIVE;
  return (
    <div className="flex items-center justify-center">
      <span
        className={`text-[13px] font-medium ${
          isActive ? "text-green-400" : "text-yellow-400"
        }`}
      >
        {value || URLStatus.ACTIVE}
      </span>
    </div>
  );
};
export default StatusCell;
