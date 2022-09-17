import { debounce } from "lodash";
import { EditorProps } from "./Editor.types";

const ShortTextEditor: React.FC<EditorProps<string>> = ({
  value,
  field,
  onSave,
}) => {
  const handleSave = debounce(onSave, 400);

  return (
    <>
      <h4>{field.name}</h4>
      <input
        type="text"
        defaultValue={value}
        className="input input-bordered input-primary w-full max-w-md"
        onChange={(e) => {
          handleSave(e.target.value);
        }}
      />
    </>
  );
};

export default ShortTextEditor;
