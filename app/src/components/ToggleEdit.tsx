import React, { useState } from "react";
import FeatherIcon from "./Icon";

interface Props {
  onSave: (value: string) => void;
  value: string;
  tag?: string | any;
  tagClassName?: string;
  className?: string;
}

const ToggleEdit: React.FC<Props> = ({
  onSave,
  value,
  tag: Tag = "span",
  tagClassName,
  className,
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className={className + " flex flex-row gap-3 items-baseline    "}>
      {editing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave((e.target as any).text.value);
            setEditing(false);
          }}
        >
          <input
            name="text"
            type="text"
            defaultValue={value}
            className="input input-bordered input-primary w-full max-w-lg w-content"
            onBlur={(e) => {
              onSave((e.target as any).value);
              setEditing(false);
            }}
          />
        </form>
      ) : (
        <Tag className={tagClassName}>{value}</Tag>
      )}
      {editing ? (
        <button
          type="submit"
          title="Save"
          className="btn btn-icon btn-sm btn-ghost btn-square"
        >
          <FeatherIcon variant="save" size="sm" />
        </button>
      ) : (
        <button
          onClick={() => setEditing(true)}
          title="Edit"
          className="btn btn-icon btn-sm btn-ghost btn-square"
        >
          <FeatherIcon variant="edit" size="sm" />
        </button>
      )}
    </div>
  );
};

export default ToggleEdit;
