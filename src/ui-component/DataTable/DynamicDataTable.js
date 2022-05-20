import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

/**
 * Simulates server data loading
 */
const loadServerRows = (page, pageSize, allRows) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(allRows.slice(page * pageSize, (page + 1) * pageSize));
    }, Math.random() * 200 + 100); // simulate network latency
  });

const useQuery = (page, pageSize, allRows) => {
  const [rowCount, setRowCount] = React.useState(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    let active = true;

    setIsLoading(true);
    setRowCount(undefined);
    loadServerRows(page, pageSize, allRows).then((newRows) => {
      if (!active) {
        return;
      }
      setData(newRows);
      setIsLoading(false);
      setRowCount(allRows.length);
    });

    return () => {
      active = false;
    };
  }, [page, pageSize, allRows]);

  return { isLoading, data, rowCount };
};

/**
 * TODO: Improve `useDemoData` to move the fake pagination inside it instead of "fetching" everything of slicing in the component
 */
export default function DynamicDataTable() {
  const [rowsState, setRowsState] = React.useState({
    page: 0,
    pageSize: 5,
  });

  const { isLoading, data, rowCount } = useQuery(
    rowsState.page,
    rowsState.pageSize,
    rows
  );

  // Some api client return undefine while loading
  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = React.useState(rowCount || 0);
  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rowCount !== undefined ? rowCount : prevRowCountState
    );
  }, [rowCount, setRowCountState]);

  return (
    <div
      style={{
        height: 400,
        width: "100%",
        backgroundColor: "#fff",
        padding: 10,
      }}
    >
      <DataGrid
        columns={columns}
        rows={data}
        rowCount={rowCountState}
        loading={isLoading}
        pagination
        {...rowsState}
        paginationMode="server"
        onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
        onPageSizeChange={(pageSize) =>
          setRowsState((prev) => ({ ...prev, pageSize }))
        }
        checkboxSelection
        rowsPerPageOptions={[5, 10, 20]}
      />
    </div>
  );
}

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 5, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 6, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 7, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 8, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 9, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 10, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 11, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 12, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 13, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 14, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 15, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 16, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 17, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 18, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 19, lastName: "Lannister", firstName: "Tyron", age: 45 },
];
