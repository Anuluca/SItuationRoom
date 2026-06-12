interface SectionTitleProps {
  title: string;
  action?: React.ReactNode;
}

export default function SectionTitle({
  title,
  action,
}: SectionTitleProps) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}
