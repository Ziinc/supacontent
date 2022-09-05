import { useState } from "react";
import { ContentType, ContentTypeParams } from "../../types";
import { Field } from "./ContentType.types";

interface Props {
  onSubmit: (params: Field) => void;
  onCancel: () => void;
  defaultValue?: Field;
}
interface FormData {
  name: { value: string };
  type: { value: Field["type"] };
}
const ContentTypeFieldForm: React.FC<Props> = ({ onCancel, onSubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = e.target as typeof e.target & FormData;
        onSubmit({
          name: formData.name.value,
          type: formData.type.value,
        });
      }}
    >
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Field name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Data Type</span>
            </label>
            <select name="type" className="select select-bordered">
              <option value="short-text">Short text</option>
              <option value="long-text">Long text</option>
              <option value="rich-text">Rich text</option>
            </select>
          </div>

          <div className="card-actions justify-end gap-2">
            <button type="button" className="btn btn-ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContentTypeFieldForm;
