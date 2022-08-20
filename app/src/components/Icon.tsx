import feather from "feather-icons";
interface Props {
  variant: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const FeatherIcon: React.FC<Props> = ({
  variant,
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-14 h-14",
  }[size];
  const classes = [sizeClasses, className].join(" ");
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: feather.icons[variant].toSvg({
          class: classes,
        }),
      }}
    />
  );
};

export default FeatherIcon;
