import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import {
  columnDefs,
  defaultColDef,
  frameworkComponents,
} from "../../../utils.js";
import { HistoryTableStyle } from "../../../HistoryTable.styled.js";
import { useThemeContext } from "../../../../../../hooks/useThemeContext.js";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
ModuleRegistry.registerModules([AllCommunityModule]);
export const HistoryTable = ({
  rowData = [],
  onGridReady = () => {},
  onFilterChanged = () => {},
  onFirstDataRendered = () => {},
}) => {
  const { theme } = useThemeContext();
  return (
    <HistoryTableStyle
      id="history-grid"
      className={`ag-theme-balham theme-${theme}`}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        components={frameworkComponents}
        pagination={false}
        domLayout="autoHeight"
        suppressMultiSort
        rowHeight={56}
        headerHeight={48}
        onFilterChanged={onFilterChanged}
        suppressColumnVirtualisation
        onFirstDataRendered={onFirstDataRendered}
        onGridReady={onGridReady}
        suppressCellFocus
      />
    </HistoryTableStyle>
  );
};
export default HistoryTable;
