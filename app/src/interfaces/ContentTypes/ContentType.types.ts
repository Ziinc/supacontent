export interface ContentTypeDatum {
  id: number;
  project_id: number;
  tyoe: "single" | "collection";
  name: string;
  fields: Field[];
  inserted_at: string;
}

export interface Field {
  name: string;
  type: "short-text" | "long-text";
}
