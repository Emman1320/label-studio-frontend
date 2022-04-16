import classes from "./ProjectOverview.module.css";
import * as React from "react";
import { useData } from "../../../context-store/data-context";
import { useParams, useSearchParams } from "react-router-dom";
import ControlMenu from "./ControlMenu";
import DataTable from "./DataTable";

export default function ProjectOverview() {
  return (
    <React.Fragment>
      <div className={classes.topbar}>
        <ControlMenu />
      </div>
      <DataTable />
    </React.Fragment>
  );
}
