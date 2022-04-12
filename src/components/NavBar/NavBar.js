import UploadFileModal from "../UI/Home/UploadFileModal";
import classes from "./NavBar.module.css";
import { useData } from "../../context-store/data-context";

const NavBar = () => {
  const { currentPath, changeRoute } = useData();
  return (
    <div id="header">
      <div
        id="logo"
        onClick={() => {
          changeRoute("/projects");
        }}
      >
        <img src="/images/ls_logo.svg" alt="label studio logo" />
      </div>
      <ul id="nav">
        {currentPath === "/projects" && <UploadFileModal />}
        <li>
          <a href="https://labelstud.io/guide">Docs</a>
        </li>
        <li>
          <a
            className="github-button"
            href="https://github.com/heartexlabs/label-studio"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star heartexlabs/label-studio on GitHub"
          >
            <img src="./images/GitHub-Mark-64px.png" height="25" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
