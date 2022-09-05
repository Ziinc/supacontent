import EditorJS, { OutputData } from "@editorjs/editorjs";
import { useEffect, useRef } from "react";
import { randomString } from "../../utils";
import { EditorProps } from "./Editor.types";

const RichTextEditor: React.FC<EditorProps<OutputData>> = ({
  value,
  field,
  onSave,
}) => {
  let editor = useRef(null).current;
  let editorId = useRef(randomString()).current;
  useEffect(() => {
    editor = new EditorJS({
      data: value,
      holder: editorId,
      onChange: async (_api, _event) => {
        const output = await editor.save();
        onSave(output);
      },
      autofocus: true,
      minHeight: 80,
    });
  }, []);
  return (
    <div className=" w-full border border-primary rounded-lg p-3 focus-within:outline outline-offset-2 outline-2 outline-primary">
      <div id={editorId} className="max-w-2xl ml-10" />
    </div>
  );
};
export default RichTextEditor;
