import { useScrollToTop } from "../../../hooks/useScrollToTop";
import HistoryTableWrapper from "./Components/HistoryTableWrapper/HistoryTableWrapper";
export const History = () => {
  useScrollToTop();
  return (
    <div className="lg:w-7/9 w-9/10">
      <HistoryTableWrapper />
    </div>
  );
};
