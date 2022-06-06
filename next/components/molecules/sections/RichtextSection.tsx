import React from 'react';
import CityGalleryMarkdown from '../../atoms/CityGalleryMarkdown';
import Section from './Section';

interface IRichtextSectionProps {
  content: string | null | undefined;
  anchor?: string;
  accentColor?: string;
  className?: string;
}

const RichtextSection = ({
  content,
  anchor,
  accentColor,
  className,
}: IRichtextSectionProps) => {
  return (
    <Section anchor={anchor}>
      <CityGalleryMarkdown
        content={content}
        className={className}
        accentColor={accentColor}
      />
    </Section>
  );
};

export default RichtextSection;
