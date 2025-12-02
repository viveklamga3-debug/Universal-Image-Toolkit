"use client";

import ToolShell from '@/components/tool-shell';
import { Maximize } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ImageResizerTool() {
  return (
    <ToolShell
      title="Image Resizer"
      description="This tool is under construction."
      icon={Maximize}
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
