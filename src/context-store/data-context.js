import { reducer } from "./reducer";

import { createContext, useReducer, useContext } from "react";

const initialState = {
  currentPath: "/projects",
  uploadedProjects: [],
};

const DataContext = createContext({
  currentPath: "",
  uploadedProjects: [],
  changeRoute: () => {},
  uploadProject: () => {},
});

const DataContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChangeRoute = route => {
    dispatch({ type: "CHANGE_ROUTE", route });
  };
  const onUploadProject = project => {
    dispatch({ type: "UPLOAD_PROJECT", project });
  };
  const DataContextValue = {
    currentPath: state.currentPath,
    uploadedProjects: state.uploadedProjects,
    changeRoute: onChangeRoute,
    uploadProject: onUploadProject,
  };

  return <DataContext.Provider value={DataContextValue}>{props.children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
export default DataContextProvider;
