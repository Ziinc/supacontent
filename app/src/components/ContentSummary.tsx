import { isEmpty } from "lodash";
import { Content, ContentType } from "../types";
import FeatherIcon from "./Icon";
import RichTextViewer from "./viewers/RichTextViewer";

interface Props {
  content: Content;
  contentType: ContentType;
}
const ContentSummary: React.FC<Props> = ({ content, contentType }) => {
  if (!contentType || !contentType.fields) return null;
  return (
    <div className="group relative card-compact card  card-bordered border-base-200 bg-base-100 shadow-xl w-full ">
      <div
        className="card-body max-h-48 overflow-none"
        style={{
          maskImage: isEmpty(content.data)
            ? ""
            : "linear-gradient(to top, transparent 1%, black 100%)",
        }}
      >
        {!isEmpty(content.data) &&
          contentType.fields.map((field) => {
            const value = content.data[field.name];
            return (
              <div>
                <div>
                  {["short-text", "long-text"].includes(field.type) && (
                    <div>
                      <p className="text-base-content">{value}</p>
                    </div>
                  )}
                  {field.type === "rich-text" && (
                    <RichTextViewer value={value} />
                  )}
                  {field.type === "boolean" && (
                    <div>
                      <div className="flex flex-row gap-10 align-center">
                        <span>{field.name}</span>
                        {value ? (
                          <FeatherIcon variant="check-square" />
                        ) : (
                          <FeatherIcon variant="x-square" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

        {isEmpty(content.data) && <p className="text-grey-300">No data yet.</p>}
      </div>
      <div className="absolute bottom-0 right-0 group-hover:opacity-100 opacity-0 transition mr-4 mb-4 flex flex-row w-full justify-end">
        <span>Edit</span>
      </div>
    </div>
  );
};

export default ContentSummary;
