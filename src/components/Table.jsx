import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export default function Table({
  data,
  columns,
  rowHeight,
  pkey,
  handleCellEditCommit,
}) {
  console.log("table component triggered");

  return (
    <div className="dFlx jCntCenter">
      <Box>
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row[pkey]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          rowHeight={rowHeight}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          onCellEditStop={handleCellEditCommit}
        />
      </Box>
    </div>
  );
}
