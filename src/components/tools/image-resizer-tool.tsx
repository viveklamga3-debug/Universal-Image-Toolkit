"use client";

import { useState, useRef, useEffect } from 'react';
import ToolShell from '@/components/tool-shell';
import { Maximize, Download, AspectRatio } from 'lucide-react';
import Dropzone from '@/components/dropzone';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function ImageResizerTool() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [resizedUrl, setResizedUrl] = useState<string>('');
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
  const [newSize, setNewSize] = useState({ width: 0, height: 0 });
  const [resizedFileSize, setResizedFileSize] = useState(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (file: File) => {
    setOriginalFile(file);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);

    const img = document.createElement('img');
    img.src = url;
    img.onload = () => {
      setOriginalSize({ width: img.width, height: img.height });
      setNewSize({ width: img.width, height: img.height });
      resizeImage(file, img.width, img.height);
    };
  };

  const resizeImage = (file: File, width: number, height: number) => {
    if (isProcessing || width <= 0 || height <= 0) return;
    setIsProcessing(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            toast({ title: "Error", description: "Could not get canvas context", variant: "destructive"});
            setIsProcessing(false);
            return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL(file.type);
        setResizedUrl(dataUrl);

        const byteString = atob(dataUrl.split(',')[1]);
        setResizedFileSize(byteString.length);
        setIsProcessing(false);
      };
      img.onerror = () => {
        toast({ title: "Error", description: "Could not load image", variant: "destructive" });
        setIsProcessing(false);
      }
    };
    reader.onerror = () => {
      toast({ title: "Error", description: "Could not read file", variant: "destructive" });
      setIsProcessing(false);
    }
  };
  
  useEffect(() => {
    if(originalFile) {
        resizeImage(originalFile, newSize.width, newSize.height);
    }
  }, [newSize]);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(e.target.value, 10);
    if (!isNaN(width)) {
      if (maintainAspectRatio && originalSize.width > 0) {
        const aspectRatio = originalSize.height / originalSize.width;
        setNewSize({ width, height: Math.round(width * aspectRatio) });
      } else {
        setNewSize({ ...newSize, width });
      }
    } else {
        setNewSize({ ...newSize, width: 0 });
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = parseInt(e.target.value, 10);
     if (!isNaN(height)) {
      if (maintainAspectRatio && originalSize.height > 0) {
        const aspectRatio = originalSize.width / originalSize.height;
        setNewSize({ height, width: Math.round(height * aspectRatio) });
      } else {
        setNewSize({ ...newSize, height });
      }
    } else {
        setNewSize({ ...newSize, height: 0 });
    }
  };

  return (
    <ToolShell
      title="Image Resizer"
      description="Change image dimensions easily."
      icon={Maximize}
    >
      {!originalFile && <Dropzone onFileChange={handleFileChange} />}

      {originalFile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">Width</Label>
                  <Input id="width" type="number" value={newSize.width > 0 ? newSize.width : ''} onChange={handleWidthChange} placeholder="e.g. 1920" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input id="height" type="number" value={newSize.height > 0 ? newSize.height : ''} onChange={handleHeightChange} placeholder="e.g. 1080" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch 
                  id="aspect-ratio" 
                  checked={maintainAspectRatio}
                  onCheckedChange={setMaintainAspectRatio}
                />
                <Label htmlFor="aspect-ratio">Maintain Aspect Ratio</Label>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Original Dimensions:</span>
                  <span className="font-medium">{originalSize.width} x {originalSize.height}</span>
                </div>
                <div className="flex justify-between">
                  <span>New Dimensions:</span>
                  <span className="font-medium">{newSize.width} x {newSize.height}</span>
                </div>
                 <div className="flex justify-between">
                  <span>Resized File Size:</span>
                  <span className="font-medium">{formatFileSize(resizedFileSize)}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                    variant="success"
                    onClick={() => {
                        const link = document.createElement('a');
                        link.href = resizedUrl;
                        link.download = `resized-${originalFile.name}`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }}
                    disabled={!resizedUrl || isProcessing || newSize.width <= 0 || newSize.height <= 0}
                    className="w-full"
                >
                    <Download className="mr-2 h-4 w-4" />
                    Download Resized
                </Button>
                <Button onClick={() => {
                    setOriginalFile(null);
                    setOriginalUrl('');
                    setResizedUrl('');
                    setOriginalSize({width: 0, height: 0});
                    setNewSize({width: 0, height: 0});
                    setResizedFileSize(0);
                }} variant="outline">
                    Start Over
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center bg-muted/20 p-4 rounded-b-lg overflow-hidden">
                {isProcessing && <p>Processing...</p>}
                {!isProcessing && resizedUrl && (
                    <Image src={resizedUrl} alt="Resized preview" width={newSize.width} height={newSize.height} className="max-w-full max-h-full object-contain" />
                )}
                 {!isProcessing && !resizedUrl && originalUrl && (
                    <Image src={originalUrl} alt="Original preview" width={originalSize.width} height={originalSize.height} className="max-w-full max-h-full object-contain" />
                )}
            </CardContent>
          </Card>
        </div>
      )}
    </ToolShell>
  );
}
