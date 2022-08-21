import EditorJS, { OutputData } from "@editorjs/editorjs";
import { SavedData } from "@editorjs/editorjs/types/data-formats";
import { useEffect, useRef } from "react";
import { Field } from "../../interfaces/ContentTypes/ContentType.types";
import { Content } from "../../types";
import { randomString } from "../../utils";

const RichTextViewer: React.FC<{ value: OutputData }> = ({ value }) => {
  let editor = useRef(null).current;
  let editorId = useRef(randomString()).current;
  useEffect(() => {
    editor = new EditorJS({
      data: value,
      holder: editorId,
      hideToolbar: true,
      readOnly: true,
      minHeight: 10,
    });
  }, []);
  return <div id={editorId} className="pb-0" />;
};
export default RichTextViewer;
