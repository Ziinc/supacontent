import { useNavigate, useParams } from "react-router";
import { useAppContext } from "../App";
import { client, supacontent } from "../utils";

const ProjectSettingsPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const appContext = useAppContext();
  return (
    <div className="p-4">
      <button
        className="btn btn-warning"
        onClick={async () => {
          await supacontent
            .from("projects")
            .delete()
            .eq("id", params.project_id);
          await appContext.refreshProjects();
          navigate("/");
        }}
      >
        Delete Project
      </button>
    </div>
  );
};

export default ProjectSettingsPage;
