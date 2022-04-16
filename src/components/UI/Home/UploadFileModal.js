/* eslint-disable  */

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import classes from "./Projects.module.css";
import { Fragment, useState } from "react";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
import PdfIcon from "../../../assets/icons/pdficon.png";
import { useData } from "../../../context-store/data-context";
import axios from "axios";
import { CircularProgress } from "@mui/material";
const PDFJS = require("pdfjs-dist/webpack");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  minHeight: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UploadFileModal(props) {
  const [open, setOpen] = useState(false);
  const dataCtx = useData();
  const [responseError, setResponseError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  // for submit event
  const [uploadedFile, setUploadedFile] = useState(null);
  // onchange event
  const fileType = ["application/pdf"];
  const handlePdfFileChange = selectedFile => {
    setUploadedFile(selectedFile);
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        const reader = new FileReader();

        reader.readAsDataURL(selectedFile);
        reader.onloadend = e => {
          setPdfFile(e.target.result);
          setPdfFileError("");
        };
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };

  // form submit

  //param: file -> the input file (e.g. event.target.files[0])
  //return: images -> an array of images encoded in base64
  const convertPdfToImages = async data => {
    const images = [];
    const pdf = await PDFJS.getDocument(data).promise;
    const canvas = document.createElement("canvas");
    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const viewport = page.getViewport({ scale: 1 });
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport: viewport }).promise;
      images.push(canvas.toDataURL());
    }
    canvas.remove();
    return images;
  };
  const handlePdfFileSubmit = e => {
    e.preventDefault();
    setResponseError(false);
    setLoading(true);
    if (pdfFile !== null) {
      convertPdfToImages(pdfFile).then(images => {
        setPdfFile(null);
        dataCtx.uploadProject({ file: pdfFile, name: projectName, images: images });
        handleClose();
        // const data = new FormData();
        // data.append("\\hive\\", uploadedFile, "file");
        // axios
        //   .post(
        //     "http://localhost:8080/api/projects/1/import",
        //     { data },
        //     {
        //       Authorization: "Token 09c6d4ca72ccdd9ed9881454d284009501c4bad3",
        //       Cookie:
        //         "csrftoken=ThnyoB5v7yT9V064yaKSN18U0JYcBCQ5FxSebZWtFItGxH87xkDc0U9DBJdi17r7; sessionid=eyJ1aWQiOiJhMzkyNmMxMS1mNzdhLTRhZjAtODc4Mi00Mjg3NDE2MGJmOGIiLCJvcmdhbml6YXRpb25fcGsiOjF9:1ndbB6:AsvvjKxboDQ123lVaAT8ndA-X-QtSUK427TTEtRFi4U",
        //     },
        //   )
        //   .then(() => {
        //     dataCtx.uploadProject({ file: pdfFile, name: projectName, images: images });
        //     handleClose();
        //   })
        //   .catch(error => {
        //     setLoading(false);
        //     console.log(error);
        //     setResponseError("Something went wrong :(");
        //   });
      });
    } else {
      handleClose();
      setLoading(false);
      setPdfFile(null);
    }
  };
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const dropHandler = event => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handlePdfFileChange(file);
  };

  const chooseFileHandler = event => {
    const file = event.target.files[0];
    handlePdfFileChange(file);
  };

  const dragOverHandler = event => {
    event.preventDefault();
  };

  return (
    <div style={{ margin: "0 10px 1px 0", display: "flex", alignItems: "center" }}>
      <Button className={classes.button} onClick={handleOpen}>
        Upload File
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload File
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              onChange={e => {
                setProjectName(e.target.value);
              }}
              variant="standard"
              sx={{ mb: 2 }}
              label="Enter project name"
              fullWidth
            />
            <form className="form-group" onSubmit={handlePdfFileSubmit}>
              {/* <input className={classes.fileUpload} type="file" required onChange={handlePdfFileChange} />
              <Box sx={{ width: "100%", height: "400px", overflow: "hidden" }}>
                {pdfFile && (
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                    <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
                  </Worker>
                )}
              </Box>
              {pdfFileError && <div className="error-msg">{pdfFileError}</div>}
              <br></br>
            */}
              {pdfFile ? (
                <Box className={classes.uploadFile__container}>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                    <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
                  </Worker>
                  {pdfFileError && <div className="error-msg">{pdfFileError}</div>}
                </Box>
              ) : (
                <div className={classes.uploadFile__uploadWrapper}>
                  <label
                    className={classes.uploadFile__uploadContainer}
                    style={{ cursor: "pointer" }}
                    onDrop={dropHandler}
                    onDragOver={dragOverHandler}
                    htmlFor="file"
                  >
                    <div className={classes.uploadFile__chooseFile}>
                      <div className={classes.uploadFile__pdfIcon}>
                        <img src={PdfIcon} alt="" />
                      </div>
                      <input onChange={chooseFileHandler} id="file" type="file" accept=".pdf" />
                      <div className={classes.uploadFile__chooseFileDesc}>or drop excel files here</div>
                    </div>
                  </label>
                </div>
              )}

              <Button className={classes.button} type="submit">
                {loading ? (
                  <CircularProgress sx={{ width: "25px!important", height: "25px!important" }} color="inherit" />
                ) : (
                  "UPLOAD"
                )}
              </Button>
              {responseError ? <div className={classes.responseError}>{responseError}</div> : null}
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
