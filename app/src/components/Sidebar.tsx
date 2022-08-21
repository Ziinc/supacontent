import { title } from "process";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../App";
import { Project } from "../types";
import FeatherIcon from "./Icon";

const Sidebar = () => {
  const params = useParams();
  const appContext = useAppContext();
  const mainMenu = [
    { title: "Content", path: `/projects/${params.project_id}/content` },
    {
      title: "Content Types",
      path: `/projects/${params.project_id}/content-types`,
    },
    {
      title: "Export",

      path: `https://github.com/Ziinc/supacontent#querying`,
      icon: <FeatherIcon size="sm" variant="external-link" />,
    },
    {
      title: "Query",

      path: "https://github.com/Ziinc/supacontent#querying",
      icon: <FeatherIcon size="sm" variant="external-link" />,
    },
  ];
  const footerMenu = [{ title: "Settings", path: "/settings" }];

  const renderMenu = (menu) => (
    <ul className="menu w-48 bg-base-100 text-base-content">
      {menu.map((item) => (
        <li key={item.path} className="rounded">
          {item.path.includes("http") ? (
            <a href={item.path} title={item.title} target="_blank">
              {item.title}
              <span className="ml-auto">{item.icon}</span>
            </a>
          ) : (
            <Link to={item.path} title={item.title}>
              {item.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
  const currentProject: Project = (appContext.projects || []).find(
    (project) => project.id === Number(params.project_id)
  );
  if (!currentProject) return null;
  const otherProjects = (appContext.projects || []).filter(
    (project) => project.id !== Number(params.project_id)
  );
  return (
    <div className="flex flex-col overflow-visible">
      <div className="p-2  border-b-2 border-grey-600">
        {/* icon */}
        <Link to={`/`}>
          <button className="btn btn-lg btn-ghost btn-block normal-case justify-start">
            SupaContent
          </button>
        </Link>
      </div>

      <div className="border-b-2 border-grey-600">
        <div className="dropdown w-full p-2">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-block normal-case justify-start"
          >
            {currentProject.name}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-1 shadow bg-base-100 rounded-box w-full"
          >
            {otherProjects.length > 0 && (
              <>
                <li className="p-2 font-bold text-sm">Switch project</li>
                {otherProjects.map((project) => (
                  <li>
                    <Link
                      className="truncate w-40"
                      to={`/projects/${project.id}`}
                    >
                      {project.name}
                    </Link>
                  </li>
                ))}
              </>
            )}
            <li
              className={
                otherProjects.length > 0 ? "border-t-2 border-grey-800" : ""
              }
            >
              <Link to="/projects/new" className="">
                Create new project...
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-2 flex flex-col justify-between flex-grow">
        {renderMenu(mainMenu)}

        <div className="dropdown dropdown-right dropdown-end">
          <label tabIndex={1} className="btn btn-ghost m-1">
            Settings
          </label>
          <ul
            tabIndex={1}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={`/projects/${params.project_id}/settings`}>
                Project Settings
              </Link>
            </li>
            <li>
              <Link to="/settings">Client Settings</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
