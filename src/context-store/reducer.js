export const reducer = (state, action) => {
  switch (action.type) {
    case "UPLOAD_PROJECT":
      const updatedUploadedProjects = [...state.uploadedProjects, action.project];
      return { ...state, uploadedProjects: updatedUploadedProjects };
    default:
      return state;
  }
};
