import HistoryCard from "./HistoryCard";
const HistoryCards = ({ rowData }) => {
  return (
    <div className="space-y-4">
      {rowData.map((row) => (
        <HistoryCard key={row.id} row={row} />
      ))}
    </div>
  );
};
export default HistoryCards;
