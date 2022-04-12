import { useState } from "react";
import { useData } from "../../context-store/data-context";
import App from "../App/App";
import NavBar from "../NavBar/NavBar";
import Projects from "./Home/Projects";

const Main = ({ store, panels }) => {
  const { currentPath } = useData();
  return (
    <div>
      <NavBar />
      {currentPath === "/projects" ? (
        <Projects />
      ) : currentPath === "/projects/annotate" ? (
        <App {...{ store, panels }} />
      ) : null} 
    </div>
  );
};

export default Main;

// <Projects changeRoute={changeRoute} />
