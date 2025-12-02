"use client";

import ToolShell from '@/components/tool-shell';
import { RotateCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ImageRotatorTool() {
  return (
    <ToolShell
      title="Image Rotator"
      description="This tool is under construction."
      icon={RotateCw}
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
