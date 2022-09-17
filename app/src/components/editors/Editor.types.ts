import { Field } from "../../interfaces/ContentTypes/ContentType.types";

export interface EditorProps<T> {
    value: T;
    field: Field;
    onSave: (editorOutput: T) => void;
}