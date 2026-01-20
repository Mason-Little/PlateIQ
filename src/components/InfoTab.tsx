import React from 'react';

type InfoStat = {
  label: string;
  value: string;
  helper?: string;
};

type InfoSection = {
  id: string;
  title: string;
  description?: string;
  stats?: InfoStat[];
  footer?: React.ReactNode;
};

type InfoTabProps = {
  heading: string;
  subheading?: string;
  sections: InfoSection[];
  emptyMessage?: string;
  className?: string;
};

const SectionHeader = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? (
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      ) : null}
    </div>
  );
};

const StatItem = ({ label, value, helper }: InfoStat) => {
  return (
    <div className="rounded-lg border border-slate-200 px-4 py-3">
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-xl font-semibold text-slate-900">{value}</div>
      {helper ? (
        <div className="mt-1 text-xs text-slate-500">{helper}</div>
      ) : null}
    </div>
  );
};

const InfoTab = ({
  heading,
  subheading,
  sections,
  emptyMessage = 'No info available yet.',
  className,
}: InfoTabProps) => {
  const hasSections = sections.length > 0;

  return (
    <section className={className} aria-label="Info tab">
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold text-slate-900">{heading}</h2>
        {subheading ? (
          <p className="text-sm text-slate-500">{subheading}</p>
        ) : null}
      </header>

      <div className="mt-6 space-y-6">
        {!hasSections ? (
          <div className="rounded-lg border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
            {emptyMessage}
          </div>
        ) : null}

        {sections.map((section) => (
          <article
            key={section.id}
            className="space-y-4 rounded-xl border border-slate-200 p-5"
          >
            <SectionHeader
              title={section.title}
              description={section.description}
            />

            {section.stats && section.stats.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {section.stats.map((stat) => (
                  <StatItem
                    key={`${section.id}-${stat.label}`}
                    label={stat.label}
                    value={stat.value}
                    helper={stat.helper}
                  />
                ))}
              </div>
            ) : null}

            {section.footer ? (
              <div className="text-sm text-slate-500">{section.footer}</div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
};

export default InfoTab;
