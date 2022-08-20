import { Link, NavLink, useParams } from "react-router-dom";
import FeatherIcon from "../../components/Icon";
import { ContentType } from "../../types";

interface Props {
  contentTypes: ContentType[];
  showNewButton: boolean;
  buildLink: (type: ContentType) => string;
}
const ContentTypesMenu: React.FC<Props> = ({
  buildLink,
  contentTypes,
  showNewButton,
}) => {
  const params = useParams();
  const collections = contentTypes.filter((ct) => ct.type === "collection");
  const singles = contentTypes.filter((ct) => ct.type === "single");
  return (
    <>
      <ul className="menu menu-compact bg-base-100 w-56 p-2 rounded-box  gap-1">
        <li className="menu-title  flex flex-row items-center justify-between w-full ">
          <span>Collections</span>
          {showNewButton && (
            <Link
              to={
                "/projects/" +
                params.project_id +
                "/content-types/new?type=collection"
              }
            >
              <button className="btn btn-square btn-ghost btn-xs  text-black">
                <FeatherIcon size="sm" variant="plus" />
              </button>
            </Link>
          )}
        </li>
        {collections.map((type) => (
          <li key={type.id}>
            <Link
              className={
                type.id === Number(params.content_type_id) ? "active" : ""
              }
              to={{
                pathname: buildLink(type),
              }}
            >
              {type.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="menu menu-compact bg-base-100 w-56 p-2 rounded-box gap-1">
        <li className="menu-title flex flex-row items-center justify-between w-full ">
          <span>Single</span>
          {showNewButton && (
            <Link
              to={
                "/projects/" +
                params.project_id +
                "/content-types/new?type=single"
              }
            >
              <button className="btn btn-square btn-ghost btn-xs  text-black">
                <FeatherIcon size="sm" variant="plus" />
              </button>
            </Link>
          )}
        </li>
        {singles.map((type) => (
          <li key={type.id}>
            <Link
              className={
                type.id === Number(params.content_type_id) ? "active" : ""
              }
              to={{
                pathname: buildLink(type),
              }}
            >
              {type.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContentTypesMenu;
