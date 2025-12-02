"use client";

import { useState, useRef } from 'react';
import ToolShell from '@/components/tool-shell';
import { Scissors, Download } from 'lucide-react';
import Dropzone from '@/components/dropzone';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function ImageCompressorTool() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [compressedUrl, setCompressedUrl] = useState<string>('');
  const [quality, setQuality] = useState(0.8);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (file: File) => {
    setOriginalFile(file);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    setOriginalSize(file.size);
    compressImage(file, quality);
  };

  const handleQualityChange = (value: number[]) => {
    const newQuality = value[0];
    setQuality(newQuality);
    if (originalFile) {
      compressImage(originalFile, newQuality);
    }
  };

  const compressImage = (file: File, qual: number) => {
    if (isProcessing) return;
    setIsProcessing(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            toast({ title: "Error", description: "Could not get canvas context", variant: "destructive"});
            setIsProcessing(false);
            return;
        }
        ctx.drawImage(img, 0, 0);

        const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, mimeType === 'image/png' ? undefined : qual);
        
        setCompressedUrl(dataUrl);

        // Calculate size
        const byteString = atob(dataUrl.split(',')[1]);
        const size = byteString.length;
        setCompressedSize(size);
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

  const reductionPercentage = originalSize > 0 ? ((originalSize - compressedSize) / originalSize) * 100 : 0;

  return (
    <ToolShell
      title="Image Compressor"
      description="Reduce image file size while balancing quality."
      icon={Scissors}
    >
      {!originalFile && <Dropzone onFileChange={handleFileChange} />}

      {originalFile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="quality">Quality: {Math.round(quality * 100)}%</Label>
                <Slider
                  id="quality"
                  min={0.1}
                  max={1}
                  step={0.05}
                  value={[quality]}
                  onValueChange={handleQualityChange}
                  disabled={isProcessing}
                />
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span>Original Size:</span>
                  <span className="font-medium">{formatFileSize(originalSize)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Compressed Size:</span>
                  <span className="font-medium">{formatFileSize(compressedSize)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-success-foreground">
                  <span>Reduction:</span>
                  <span>{reductionPercentage.toFixed(1)}%</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                    variant="success"
                    onClick={() => {
                        const link = document.createElement('a');
                        link.href = compressedUrl;
                        const extension = originalFile.type === 'image/png' ? 'png' : 'jpg';
                        link.download = `compressed-${originalFile.name.split('.').slice(0, -1).join('.')}.${extension}`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }}
                    disabled={!compressedUrl || isProcessing}
                    className="w-full"
                >
                    <Download className="mr-2 h-4 w-4" />
                    Download Compressed
                </Button>
                <Button onClick={() => {
                    setOriginalFile(null);
                    setOriginalUrl('');
                    setCompressedUrl('');
                    setOriginalSize(0);
                    setCompressedSize(0);
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
                {!isProcessing && compressedUrl && (
                    <Image src={compressedUrl} alt="Compressed preview" width={500} height={500} className="max-w-full max-h-full object-contain" />
                )}
                {!isProcessing && !compressedUrl && originalUrl && (
                    <Image src={originalUrl} alt="Original preview" width={500} height={500} className="max-w-full max-h-full object-contain" />
                )}
            </CardContent>
          </Card>
        </div>
      )}
    </ToolShell>
  );
}
