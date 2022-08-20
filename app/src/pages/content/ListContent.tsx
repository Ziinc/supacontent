import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { client } from "../../utils";

const ListContent = () => {
  const [content, setContent] = useState(null);
  const params = useParams();

  useEffect(() => {
    refresh();
  }, [params.content_type_id]);
  const refresh = async () => {
    const { data } = await client
      .from("supacontent_content")
      .select()
      .filter("content_type_id", "eq", params.content_type_id);
    setContent(data);
  };

  if (!content) return null;
  return (
    <div className="flex flex-col gap-8 mx-auto container p-4 md:p-8">
      <section>
        <button
          className="btn btn-primary btn-sm"
          onClick={async () => {
            await client.from("supacontent_content").insert({
              content_type_id: params.content_type_id,
              data: {},
            });
            refresh()
          }}
        >
          New
        </button>
      </section>
      {content.map((item) => (
        <span>{JSON.stringify(item.data)}</span>
      ))}
    </div>
  );
};

export default ListContent;
