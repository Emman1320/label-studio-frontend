/* eslint-disable  */

import classes from "./Projects.module.css";
import UploadFileModal from "./UploadFileModal";
import { useState } from "react";
import { useData } from "../../../context-store/data-context";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ name, image, id }) => {
  const dataCtx = useData();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`${id}`);
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
  console.log(dataCtx.uploadedProjects);
  return (
    <div className={classes.container}>
      {dataCtx.uploadedProjects.map((project, index) => (
        <ProjectCard name={project.name} id={index} image={project.images[0]} key={index} />
      ))}
    </div>
  );
};

export default Projects;
