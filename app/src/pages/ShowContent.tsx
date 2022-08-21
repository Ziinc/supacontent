import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import LongTextEditor from "../components/editors/LongTextEditor";
import Editor from "../components/editors/RichTextEditor";
import ShortTextEditor from "../components/editors/ShortTextEditor";
import FeatherIcon from "../components/Icon";
import { Content, ContentType } from "../types";
import { client } from "../utils";
const ShowContent = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [contentType, setContentType] = useState<ContentType>(null);
  const [content, setContent] = useState<Content>(null);
  const { content_id, content_type_id } = useParams();
  useEffect(() => {
    fetchData();
  }, [params.content_type_id]);
  const fetchData = async () => {
    const { data } = await client
      .from("supacontent_content")
      .select("*")
      .filter("id", "eq", content_id)
      .single();
    setContent(data);

    const { data: contentTypeData } = await client
      .from("supacontent_content_types")
      .select("*")
      .filter("id", "eq", content_type_id)
      .single();
    setContentType(contentTypeData);
  };

  if (!content) return null;
  return (
    <section className="flex flex-col p-4 w-full gap-4 container max-w-4xl">
      <div className="flex flex-row justify-between w-full">
        <Link
          to={`/projects/${params.project_id}/content/type/${params.content_type_id}`}
        >
          <button className="btn btn-ghost">
            <FeatherIcon variant="chevron-left" />
            Back
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-warning  w-64"
          onClick={async () => {
            await client.from("supacontent_content").delete().eq("id", content.id);
            navigate(
              `/projects/${params.project_id}/content/type/${content_type_id}`
            );
          }}
        >
          Delete Content Item
        </button>
      </div>
      {contentType &&
        contentType.fields.map((field) => {
          const handleSave = async (saved) => {
            const { data } = await client
              .from("supacontent_content")
              .update(
                {
                  data: { ...content.data, [field.name]: saved },
                },
                { returning: "representation" }
              )
              .eq("id", content.id);
            setContent(data[0]);
          };
          return (
            <div>
              <h4>{field.name}</h4>
              {field.type === "short-text" && (
                <ShortTextEditor
                  field={field}
                  value={content.data[field.name]}
                  onSave={handleSave}
                />
              )}
              {field.type === "long-text" && (
                <LongTextEditor
                  field={field}
                  value={content.data[field.name]}
                  onSave={handleSave}
                />
              )}
              {field.type === "rich-text" && (
                <Editor
                  field={field}
                  value={content.data[field.name]}
                  onSave={async (saved) => {
                    const { data } = await client
                      .from("supacontent_content")
                      .update(
                        {
                          data: { ...content.data, [field.name]: saved },
                        },
                        { returning: "representation" }
                      )
                      .eq("id", content.id);
                    setContent(data[0]);
                  }}
                />
              )}
            </div>
          );
        })}
    </section>
  );
};

export default ShowContent;
