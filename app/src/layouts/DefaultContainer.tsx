interface Props {
  children: React.ReactNode;
}

const DefaultContainer: React.FC<Props> = ({ children }) => (
  <div className="p-8 mx-auto">{children}</div>
);

export default DefaultContainer;
