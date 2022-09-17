import FeatherIcon from "../../components/Icon";

interface Props {
  counts: {
    content: number;
    contentTypes: number;
  };
}

const UsageStats: React.FC<Props> = ({ counts }) => (
  <div className="stats shadow">
    <div className="stat w-56">
      <div className="stat-figure text-secondary">
        <FeatherIcon variant="folder" size="lg" />
      </div>
      <div className="stat-title">Content Types</div>
      <div className="stat-value">{counts.contentTypes}</div>
    </div>

    <div className="stat w-56">
      <div className="stat-figure text-secondary">
        <FeatherIcon variant="file-text" size="lg" />
      </div>
      <div className="stat-title">Content</div>
      <div className="stat-value">{counts.content}</div>
    </div>
  </div>
);

export default UsageStats;
