import dayjs from "dayjs";
const DateCell = (props) => {
  const { value } = props;
  if (!value) return <span className="text-[13px] opacity-50">?</span>;
  const formatted = dayjs(value).format("MMM-DD-YYYY");
  return (
    <div className="flex items-center justify-center">
      <span className="text-[13px]">{formatted}</span>
    </div>
  );
};
export default DateCell;
