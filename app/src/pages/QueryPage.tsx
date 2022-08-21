import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import LongTextEditor from "../components/editors/LongTextEditor";
import Editor from "../components/editors/RichTextEditor";
import ShortTextEditor from "../components/editors/ShortTextEditor";
import FeatherIcon from "../components/Icon";
import { Content, ContentType } from "../types";
import { client } from "../utils";
const QueryPage = () => {
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

  const example = `
import { createClient } from "@supabase/supabase-js";
const API_URL = "...."
const API_KEY = "...."

const {data, error} = await createClient(API_URL, API_KEY).from("supacontent_content).select();
`;
  return (
    <section className="flex flex-col p-4 w-full gap-4 container max-w-4xl">
      <pre></pre>
    </section>
  );
};

export default QueryPage;
