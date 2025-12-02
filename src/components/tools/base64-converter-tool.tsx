"use client";

import ToolShell from '@/components/tool-shell';
import { Code } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Base64ConverterTool() {
  return (
    <ToolShell
      title="Base64 Converter"
      description="This tool is under construction."
      icon={Code}
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
