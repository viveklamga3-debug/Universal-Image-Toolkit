"use client";

import ToolShell from '@/components/tool-shell';
import { Tags } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function MetadataViewerTool() {
  return (
    <ToolShell
      title="Metadata Viewer"
      description="This tool is under construction."
      icon={Tags}
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
