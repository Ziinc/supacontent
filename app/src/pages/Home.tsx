import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { useAppContext } from "../App";
import ToggleEdit from "../components/ToggleEdit";
import { client } from "../utils";
import UsageStats from "./home/UsageStats";

const Home = () => {
  const [counts, setCounts] = useState({
    content: 0,
    contentTypes: 0,
  });
  const { user, refreshProjects, projects } = useAppContext();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const { count: contentCount } = await client
      .from("supacontent_content")
      .select("*", { count: "exact" });

    const { count: contentTypesCount } = await client
      .from("supacontent_content_types")
      .select("*", { count: "exact" });
    setCounts({
      content: contentCount,
      contentTypes: contentTypesCount,
    });
  };

  const currentProject = (projects || []).find(
    (project) => project.id === Number(params.project_id)
  );
  if (!currentProject) return null;

  return (
    <div className="flex flex-col mx-auto container p-8 gap-4 items-center">
      {/* title */}

      <ToggleEdit
        className="self-start"
        onSave={async (name) => {
          await client
            .from("supacontent_projects")
            .update({
              name,
            })
            .match({ id: currentProject.id });

          refreshProjects();
        }}
        tag="h2"
        tagClassName="text-3xl font-bold m-0"
        value={currentProject.name}
      />

      {/* stats */}
      <UsageStats counts={counts} />

      {/* Actions */}
      <section className="w-full flex flex-col gap-8 items-center">
        <OnboardingCard
          enabled={counts.contentTypes >= 0}
          completed={counts.contentTypes > 0}
          title="Create a Content Type!"
          description="Define what your content will look like."
          actions={[
            {
              text: "Create Now",
              onClick: () =>
                navigate(`/projects/${params.project_id}/content-types/new`),
            },
          ]}
        />
        <OnboardingCard
          enabled={counts.contentTypes > 0}
          completed={counts.content > 0}
          title="Write Some Content!"
          description="Fill in your content."
          actions={[
            {
              text: "Write Now",
              onClick: () => navigate(`/projects/${params.project_id}/content`),
            },
          ]}
        />
        <OnboardingCard
          enabled={counts.content > 0}
          completed={counts.content > 0}
          title="Use Your Content!"
          description="Export or query your content directly."
          actions={[
            {
              text: "Export Now",
              onClick: () =>
                window.location.replace("https://github.com/Ziinc/supacontent#exporting"),
            },
            {
              text: "Query Now",
              onClick: () =>
              window.location.replace("https://github.com/Ziinc/supacontent#querying"),
            },
          ]}
        />
      </section>
    </div>
  );
};

interface OnboardingCardProps {
  enabled: boolean;
  completed: boolean;
  title: string;
  description: string;
  actions: {
    text: string;
    onClick: () => void;
  }[];
}
const OnboardingCard: React.FC<OnboardingCardProps> = ({
  enabled,
  completed,
  title,
  description,
  actions,
}) => (
  <div
    className={`card w-full ${
      completed ? "bg-success" : "bg-base-100"
    } shadow-xl max-w-4xl`}
  >
    <div className="card-body flex flex-row gap-4 items-center justify-center">
      <input type="checkbox" checked={completed} className="checkbox" />
      <div>
        <h3 className="card-title flex justify-between">{title}</h3>
        <p>{description}</p>
      </div>
      <div className="card-actions ml-auto">
        {actions.map((action) => (
          <button
            disabled={!enabled}
            className="btn btn-primary"
            onClick={action.onClick}
          >
            {action.text}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default Home;
