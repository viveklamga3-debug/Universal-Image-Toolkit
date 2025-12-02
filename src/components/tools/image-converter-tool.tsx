"use client";

import ToolShell from '@/components/tool-shell';
import { FileImage } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ImageConverterTool() {
  return (
    <ToolShell
      title="Image Converter"
      description="This tool is under construction."
      icon={FileImage}
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
