import classes from "./ProjectOverview.module.css";
import Tooltip from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import QuestionIcon from "../../../assets/icons/question.svg";
import { Checkbox } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useData } from "../../../context-store/data-context";

function createData(id, completed, image) {
  return { id, completed, image };
}

const DataTable = props => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dataCtx = useData();
  const { fileId } = useParams();
  const rows = dataCtx.uploadedProjects[fileId]?.images.map((image, index) => createData(index + 1, null, image));
  const inAnnotationPage = pathname === `/${fileId}/annotate`;
  const tableAnnotationPageStyle = inAnnotationPage ? { height: "calc(100vh - 101px)", resize: "horizontal" } : null;
  return (
    <TableContainer component={Paper} sx={tableAnnotationPageStyle}>
      <Table size="small">
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <span>ID</span>
              {inAnnotationPage ? null : (
                <Tooltip title="Task ID" placement="top" arrow>
                  <img className={classes.questionIcon} src={QuestionIcon} alt="" />
                </Tooltip>
              )}
            </TableCell>
            {inAnnotationPage ? null : (
              <TableCell align="center">
                <span>Completed</span>
                <Tooltip title="Last annotation date" phlacement="top" arrow>
                  <img className={classes.questionIcon} src={QuestionIcon} alt="" />
                </Tooltip>
              </TableCell>
            )}
            <TableCell align="center">Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {rows?.map(row => (
            <TableRow
              onClick={() => {
                navigate(`/${fileId}/annotate?imageId=${row.id}`);
              }}
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
            >
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              {pathname === `/${fileId}/annotate` ? null : <TableCell align="center">{row.completed}</TableCell>}
              <TableCell align="center">
                <img src={row.image} alt="" className={classes.ocrImage} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
