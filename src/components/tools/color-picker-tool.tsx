"use client";

import ToolShell from '@/components/tool-shell';
import { Palette } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ColorPickerTool() {
  return (
    <ToolShell
      title="Color Picker"
      description="This tool is under construction."
      icon={Palette}
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
