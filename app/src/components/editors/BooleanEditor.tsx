import { debounce } from "lodash";
import { EditorProps } from "./Editor.types";

const BooleanEditor: React.FC<EditorProps<boolean>> = ({
  value,
  field,
  onSave,
}) => {
  const handleSave = debounce(onSave, 400);

  return (
    <div className="form-control max-w-sm">
      <label className="label cursor-pointer">
        <span className="label-text">{field.name}</span>
        <input
          type="checkbox"
          defaultChecked={value}
          className="checkbox"
          onChange={(e) => {
            handleSave(e.target.checked);
          }}
        />
      </label>
    </div>
  );
};

export default BooleanEditor;
