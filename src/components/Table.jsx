import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import { alpha, styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

export default function Table({
  data,
  columns,
  rowHeight,
  pkey,
  handleCellEditCommit,
}) {
  const dataObj = {
    rows: data,
    columns: columns,
    getRowId: (row) => row[pkey],
    initialState: {
      pagination: {
        paginationModel: {
          pageSize: 5,
        },
      },
    },
    rowHeight,
    pageSizeOptions: [5],
    disableRowSelectionOnClick: false,
    onCellEditStop: handleCellEditCommit,
  };
  return (
    <div className="dFlx jCntCenter">
      <Box>
        <StripedDataGrid
          loading={false}
          {...dataObj}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
        />
      </Box>
    </div>
  );
}
