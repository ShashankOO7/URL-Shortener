import { MdOutlineAdsClick } from "react-icons/md";
const ClicksCell = (props) => {
  const { value } = props;
  return (
    <div className="flex items-center gap-1.5 justify-center">
      <MdOutlineAdsClick className="w-4 h-4 opacity-50" />
      <span className="text-[13px] font-medium">{value ?? 0}</span>
    </div>
  );
};
export default ClicksCell;
