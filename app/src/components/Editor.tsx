import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef } from "react";
const Editor = () => {
  let editor = useRef(null).current;
  useEffect(() => {
    editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        console.log("Editor.js is ready to work!");
      },
      onChange: (api, event) => {
        console.log("Now I know that Editor's content changed!", event);
      },

      placeholder: "Let`s write an awesome story!",
      autofocus: true,
    });
  }, []);
  return <div id="editorjs" />;
};
export default Editor;
