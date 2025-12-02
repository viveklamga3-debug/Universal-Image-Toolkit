"use client";

import ToolShell from '@/components/tool-shell';
import { Crop } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ImageCropperTool() {
  return (
    <ToolShell
      title="Image Cropper"
      description="This tool is under construction."
      icon={Crop}
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
