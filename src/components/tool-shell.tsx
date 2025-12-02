import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface ToolShellProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
}

export default function ToolShell({ title, description, icon: Icon, children }: ToolShellProps) {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </header>
      <div className="space-y-8">
        {children}
      </div>
    </div>
  );
}
