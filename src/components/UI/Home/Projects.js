/* eslint-disable  */

import classes from "./Projects.module.css";
import UploadFileModal from "./UploadFileModal";

import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
import { useState } from "react";
import { useData } from "../../../context-store/data-context";

const ProjectCard = ({ name, image }) => {
  const dataCtx = useData();
  return (
    <div
      onClick={() => {
        dataCtx.changeRoute("/projects/annotate");
      }}
      className={classes.projectCard}
    >
      <div className={classes.projectCardImage}>
        <img src={image} alt="" />
      </div>
      <div className={classes.projectCardDesc}>
        <div className={classes.projectCardHeader}>{name}</div>
        <div className={classes.projectCardInfo}>09 Mar ’22, 20:12</div>
      </div>
    </div>
  );
};

const Projects = () => {
  const dataCtx = useData();
  return (
    <div className={classes.container}>
      {dataCtx.uploadedProjects.map((project, index) => (
        <ProjectCard name={project.name} image={project.images[0]} key={index} />
      ))}
    </div>
  );
};

export default Projects;
