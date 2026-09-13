import * as Icons from "lucide-react";

export function AppIcon({ name, size = 18 }) {
  const IconComponent = Icons[name] || Icons.Circle;
  return <IconComponent size={size} strokeWidth={1.7} />;
}
