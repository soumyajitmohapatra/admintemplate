import React from "react";
import { useSelector } from "react-redux";
import DemoCard from "./DemoCard";
import Grid from "@mui/material/Grid";
import EventCalandar from "../../ui-component/Calandars/EventCalandar";
import DynamicDataTable from "../../ui-component/DataTable/DynamicDataTable";

function Dashboard() {
  const user = useSelector((state) => state.user);

  return (
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid
        item
        xs={12}
        md={8}
        style={{
          paddingBottom: "1rem",
        }}
      >
        <EventCalandar />
      </Grid>
      <Grid item xs={12} md={4}>
        <DemoCard />
        <DemoCard />
      </Grid>
      <Grid item xs={12} md={12}>
        <DynamicDataTable />
      </Grid>
      <Grid item xs={12} md={8}>
        <DemoCard />
      </Grid>
      <Grid item xs={12} md={4}>
        <DemoCard />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
