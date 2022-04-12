export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "CHANGE_ROUTE":
      return { ...state, currentPath: action.route };
    case "UPLOAD_PROJECT":
      const updatedUploadedProjects = [...state.uploadedProjects, action.project];
      return { ...state, uploadedProjects: updatedUploadedProjects };
    default:
      return state;
  }
};
