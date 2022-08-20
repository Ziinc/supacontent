import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { ContentType } from "../types";
import { client } from "../utils";
import ContentTypesMenu from "./home/ContentTypesMenu";

const ContentPage: React.FC = () => {
  const [contentTypes, setContentTypes] = useState<ContentType[]>(null);
  useEffect(() => {
    refreshAll();
  }, []);

  const refreshAll = async () => {
    const { data } = await client.from("supacontent_content_types").select("*");
    setContentTypes(data);
  };

  return (
    <div className="flex h-full">
      {contentTypes && contentTypes.length > 0 ? (
        <>
          <section
            id="section-menu"
            className="flex flex-col border-r-2 border-grey-500 h-full"
          >
            <div className="border-b-2 border-grey-500 p-4">
              <h1 className="text-2xl font-bold">Content</h1>
            </div>

            <ContentTypesMenu
              showNewButton={false}
              contentTypes={contentTypes}
            />
          </section>
          <Outlet />
        </>
      ) : (
        <div className="flex flex-col items-center mx-auto my-auto prose">
          <h3>Lets get started!</h3>
          <p>You'll need to add a Content Type first to create new content.</p>
          <button
            className="btn btn-primary"
            onClick={async () => {
              const { data, error } = await client
                .from<ContentType>("supacontent_content_types")
                .insert(
                  {
                    name: "Untitled",
                    type: "collection",
                  },
                  { returning: "minimal" }
                );
              console.log(data);
              // navigate(`/content-types/${data.id}`)
            }}
          >
            New collection
          </button>
          <button className="btn btn-primary">New single</button>
        </div>
      )}
    </div>
  );
};

export default ContentPage;
