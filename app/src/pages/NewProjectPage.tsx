import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../App";
import { Project } from "../types";
import { client, supacontent } from "../utils";

const NewProjectPage = () => {
  const appContext = useAppContext();
  const navigate = useNavigate();
  return (
    <>
      <form
        className="mx-auto container my-auto max-w-md flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const { data } = await supacontent
            .from<Project>("projects")
            .insert(
              {
                name: (e.target as any).name.value,
                user_id: appContext.user.id,
              },
              { returning: "representation" }
            );
          navigate(`/projects/${data[0].id}`);
        }}
      >
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text  text-xl">
              What is this project called?
            </span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="My Cool Project"
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex flex-row justify-between w-full">
          <Link to="/" className="btn btn-ghost">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default NewProjectPage;
