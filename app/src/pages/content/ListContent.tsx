import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import ContentSummary from "../../components/ContentSummary";
import { Content } from "../../types";
import { client } from "../../utils";

const ListContent = () => {
  const [content, setContent] = useState(null);
  const [contentType, setContentType] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    refresh();
  }, [params.content_type_id]);
  const refresh = async () => {
    const { data } = await client
      .from("supacontent_content")
      .select(
        `
      *,
      content_type:content_type_id (
        *
      )
      `
      )
      .filter("content_type_id", "eq", params.content_type_id)
      .filter("content_type.project_id", "eq", params.project_id);
    console.log(data);
    setContent(data);

    const { data: contentTypeData } = await client
      .from("supacontent_content_types")
      .select("*")
      .filter("id", "eq", params.content_type_id)
      .single();
    setContentType(contentTypeData);
  };

  if (!content) return null;
  return (
    <div className="flex flex-col gap-8 mx-auto container p-4 md:p-8">
      <section>
        <button
          className="btn btn-primary btn-sm"
          onClick={async () => {
            const { data } = await client.from("supacontent_content").insert(
              {
                content_type_id: params.content_type_id,
                data: {},
              },
              { returning: "representation" }
            );
            navigate(
              `/projects/${params.project_id}/content/type/${params.content_type_id}/edit/${data[0].id}`
            );

            refresh();
          }}
        >
          New
        </button>
      </section>
      <section className="flex flex-col gap-4">
        {content.map((item: Content) => (
          <Link to={location.pathname + "/edit/" + item.id}>
            <ContentSummary content={item} contentType={contentType} />
           
          </Link>
        ))}
      </section>
    </div>
  );
};

export default ListContent;
