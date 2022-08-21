import EditorJS, { OutputData } from "@editorjs/editorjs";
import { SavedData } from "@editorjs/editorjs/types/data-formats";
import { useEffect, useRef } from "react";
import { Field } from "../../interfaces/ContentTypes/ContentType.types";
import { Content } from "../../types";
import { randomString } from "../../utils";
import { EditorProps } from "./Editor.types";

const RichTextEditor: React.FC<EditorProps<OutputData>> = ({
  value,
  field,
  onSave,
}) => {
  let editor = useRef(null).current;
  let editorId = useRef(randomString()).current;
  console.log(value);
  const fieldType = field.type;
  useEffect(() => {
    editor = new EditorJS({
      data: value,
      holder: editorId,
      onReady: () => {
        console.log("Editor.js is ready to work!");
      },
      onChange: async (api, event) => {
        const output = await editor.save();
        console.log("output", output);
        onSave(output);
      },
      autofocus: true,
      minHeight: 80,
      // tools: {
      //   paragraph: ,
      //   list: List
      // },
    });
  }, []);
  return (
    <div className=" w-full border border-primary rounded-lg p-3 focus-within:outline outline-offset-2 outline-2 outline-primary">
      <div id={editorId} className="max-w-2xl ml-10" />
    </div>
  );
};
export default RichTextEditor;
