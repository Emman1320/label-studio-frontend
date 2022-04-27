import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, useSearchParams } from "react-router-dom";
import { useData } from "../../context-store/data-context";
import App from "../App/App";
import NavBar from "../NavBar/NavBar";
import Projects from "./Home/Projects";
import ProjectOverview from "./ProjectOverview/ProjectOverview";

const Main = ({ store, panels }) => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/:fileId" element={<ProjectOverview />} />
        <Route path=":fileId/annotate" element={<App {...{ store, panels }} />} />
      </Routes>
    </div>
  );
};

export default Main;
