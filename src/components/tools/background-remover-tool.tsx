"use client";

import ToolShell from '@/components/tool-shell';
import { Wand2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function BackgroundRemoverTool() {
  return (
    <ToolShell
      title="Background Remover"
      description="This tool is under construction."
      icon={Wand2}
    >
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Coming soon!
          </div>
        </CardContent>
      </Card>
    </ToolShell>
  );
}
