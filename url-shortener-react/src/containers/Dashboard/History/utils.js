import { FaPencilAlt, FaTrash, FaCopy } from "react-icons/fa";
import { ActionButtons, TableColumns } from "./Constants.js";
import ActionMenu from "./Components/ActionMenu/ActionMenu.jsx";
import ShortLinkCell from "./Components/CellRenderers/ShortLinkCell.jsx";
import OriginalLinkCell from "./Components/CellRenderers/OriginalLinkCell.jsx";
import QRCodeCell from "./Components/CellRenderers/QRCodeCell.jsx";
import ClicksCell from "./Components/CellRenderers/ClicksCell.jsx";
import StatusCell from "./Components/CellRenderers/StatusCell.jsx";
import DateCell from "./Components/CellRenderers/DateCell.jsx";
// Apply settings across all columns
const defaultColDef = {
  sortable: true,
  resizable: true,
  filter: true,
  cellStyle: { display: "flex", alignItems: "center", lineHeight: "normal" },
  minWidth: 100,
  flex: 1,
};
/* Framework Components */
const frameworkComponents = {
  Action: ActionMenu,
  ShortLinkCell,
  OriginalLinkCell,
  QRCodeCell,
  ClicksCell,
  StatusCell,
  DateCell,
};
/* History Table column config */
const columnDefs = [
  {
    headerName: TableColumns.SHORT_LINK,
    field: "shortLink",
    minWidth: 220,
    flex: 1.5,
    cellRenderer: "ShortLinkCell",
  },
  {
    headerName: TableColumns.ORIGINAL_LINK,
    field: "originalLink",
    minWidth: 250,
    flex: 2,
    cellRenderer: "OriginalLinkCell",
  },
  {
    headerName: TableColumns.QR_CODE,
    field: "qrCode",
    maxWidth: 100,
    minWidth: 80,
    sortable: false,
    filter: false,
    cellRenderer: "QRCodeCell",
    flex: 0.6,
  },
  {
    headerName: TableColumns.CLICKS,
    field: "clicks",
    maxWidth: 110,
    minWidth: 80,
    sortable: true,
    filter: false,
    cellRenderer: "ClicksCell",
    flex: 0.6,
  },
  {
    headerName: TableColumns.STATUS,
    field: "status",
    maxWidth: 110,
    minWidth: 80,
    filter: false,
    cellRenderer: "StatusCell",
    flex: 0.6,
  },
  {
    headerName: TableColumns.DATE,
    field: "date",
    maxWidth: 130,
    minWidth: 110,
    sortable: true,
    filter: false,
    cellRenderer: "DateCell",
    flex: 0.8,
  },
  {
    headerName: TableColumns.ACTION,
    field: "action",
    maxWidth: 100,
    minWidth: 80,
    sortable: false,
    filter: false,
    cellRenderer: "Action",
    flex: 0.7,
  },
];
/* Action config */
const URLActions = [
  {
    key: ActionButtons.EDIT,
    label: ActionButtons.EDIT,
    icon: FaPencilAlt,
  },
  {
    key: ActionButtons.COPY,
    label: ActionButtons.COPY,
    icon: FaCopy,
  },
  {
    key: ActionButtons.DELETE,
    label: ActionButtons.DELETE,
    icon: FaTrash,
  },
];
const urlListParams = {
  shortLink: [],
  originalLink: [],
  qrCode: [],
  clicks: [],
  status: [],
  date: [],
  action: [],
  page: 1,
  limit: 25,
};
export {
  defaultColDef,
  frameworkComponents,
  columnDefs,
  URLActions,
  urlListParams,
};
