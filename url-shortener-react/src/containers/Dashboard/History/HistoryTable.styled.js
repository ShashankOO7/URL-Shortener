import styled from "@emotion/styled";
export const HistoryTableStyle = styled.div`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  /* ===== DARK THEME ===== */
  &.theme-dark {
    .ag-root-wrapper {
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 12px;
      background-color: #141928;
    }
    .ag-header {
      background-color: #1a2036;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .ag-header-cell {
      color: #e2e8f0;
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 0.02em;
    }
    .ag-header-cell-label {
      justify-content: center;
    }
    .ag-body-viewport {
      background-color: #141928;
    }
    .ag-row {
      background-color: #141928;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: #cbd5e1;
      font-size: 13px;
    }
    .ag-cell-wrapper {
      justify-content: center;
    }
    .ag-row-hover {
      background-color: #1c2340 !important;
    }
    .ag-row-even {
      background-color: #141928;
    }
    .ag-row-odd {
      background-color: #161c30;
    }
    .ag-cell {
      border: none;
      line-height: 1.6;
    }
    .ag-cell-focus {
      border: none !important;
    }
    .ag-paging-panel,
    .ag-status-bar {
      background-color: #141928;
      color: #94a3b8;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }
    .ag-icon {
      color: #94a3b8;
    }
    .ag-filter {
      background-color: #1e2642;
      color: #e2e8f0;
    }
    .ag-filter input {
      background-color: #141928;
      color: #e2e8f0;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .ag-popup-child {
      background-color: #1e2642;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
    }
    .ag-overlay-no-rows-wrapper {
      color: #94a3b8;
    }
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #141928;
    }
    ::-webkit-scrollbar-thumb {
      background: #334155;
      border-radius: 3px;
    }
  }
  /* ===== LIGHT THEME ===== */
  &.theme-light {
    .ag-root-wrapper {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      background-color: #ffffff;
    }
    .ag-header {
      background-color: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
    }
    .ag-header-cell {
      color: #334155;
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 0.02em;
    }
    .ag-header-cell-label {
      justify-content: center;
    }
    .ag-body-viewport {
      background-color: #ffffff;
    }
    .ag-row {
      background-color: #ffffff;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
      font-size: 13px;
    }
    .ag-cell-wrapper {
      justify-content: center;
    }
    .ag-row-hover {
      background-color: #f8fafc !important;
    }
    .ag-row-even {
      background-color: #ffffff;
    }
    .ag-row-odd {
      background-color: #fafbfd;
    }
    .ag-cell {
      border: none;
      line-height: 1.6;
    }
    .ag-cell-focus {
      border: none !important;
    }
    .ag-icon {
      color: #64748b;
    }
    .ag-filter {
      background-color: #ffffff;
      color: #334155;
    }
    .ag-popup-child {
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
    }
    .ag-overlay-no-rows-wrapper {
      color: #64748b;
    }
  }
`;
