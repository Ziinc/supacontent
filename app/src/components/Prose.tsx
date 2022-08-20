interface Props {
  children: React.ReactNode;
}

const Prose: React.FC<Props> = ({ children }) => (
  <div className="prose">{children}</div>
);

export default Prose;
