interface PageHeroProps {
  title: string;
  lead: string;
  index: string;
  aside?: React.ReactNode;
}

export default function PageHero({
  title,
  lead,
  index,
  aside,
}: PageHeroProps) {
  return (
    <header className="page-hero">
      <div className="page-hero-copy">
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>
      {aside}
      <span className="page-number" aria-hidden="true">
        {index}
      </span>
    </header>
  );
}
