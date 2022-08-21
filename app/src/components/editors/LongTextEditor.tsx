import { debounce } from "lodash";
import { EditorProps } from "./Editor.types";
const LongTextEditor: React.FC<EditorProps<string>> = ({
  value,
  field,
  onSave,
}) => {
  const handleSave = debounce(onSave, 400)
  return (
    <textarea
      defaultValue={value}
      className="textarea textarea-primary w-full max-w-md"
      onChange={(e) => {
        handleSave(e.target.value);
      }}
    />
  );
};

export default LongTextEditor;
