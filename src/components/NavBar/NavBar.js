import UploadFileModal from "../UI/Home/UploadFileModal";
import classes from "./NavBar.module.css";
import { useData } from "../../context-store/data-context";
import { useNavigate, useLocation, useParams, Link, useSearchParams } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
const removeSlash = path => {
  return path.split("/").filter(page => page !== "");
};

const NavBar = () => {
  const navigate = useNavigate();
  const dataCtx = useData();
  const { pathname } = useLocation();
  const pageNumber = removeSlash(pathname).length + 1;
  const fileId = removeSlash(pathname)[0];
  const fileName = dataCtx.uploadedProjects[fileId]?.name;

  const breadcrumbs = [
    { name: "Files", route: "/" },
    { name: fileName, route: `/${fileId}` },
    { name: "Labelling", route: pathname },
  ];
  return (
    <div id="header">
      <div>
        <div
          id="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src="/images/ls_logo.svg" alt="label studio logo" />
        </div>
        <div className={classes.breadcrumbs}>
          <Breadcrumbs>
            {breadcrumbs.slice(0, pageNumber - 1).map((page, index) => (
              <Link key={index} to={page.route}>
                {page.name}
              </Link>
            ))}
            <span className={classes.active}>{breadcrumbs[pageNumber - 1].name}</span>
          </Breadcrumbs>
        </div>
      </div>
      <ul id="nav">
        {pathname === "/" && <UploadFileModal />}
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
