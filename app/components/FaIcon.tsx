// src/app/components/FaIcon.tsx
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface FaIconProps extends React.SVGProps<SVGSVGElement> {
  icon: IconDefinition;
  size?: number;
}

export default function FaIcon({ icon, size = 24, ...props }: FaIconProps) {
  const [width, height, , , path] = icon.icon;
  
  return (
    <svg 
      viewBox={`0 0 ${width} ${height}`} 
      width={size} 
      height={size} 
      fill="currentColor"
      {...props}
    >
      <path d={path as string} />
    </svg>
  );
}
