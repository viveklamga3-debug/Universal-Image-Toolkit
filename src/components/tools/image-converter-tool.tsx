"use client";

import { useState } from 'react';
import ToolShell from '@/components/tool-shell';
import { FileImage, Download } from 'lucide-react';
import Dropzone from '@/components/dropzone';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

type OutputFormat = 'image/jpeg' | 'image/png' | 'image/webp';

export default function ImageConverterTool() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [originalFileSize, setOriginalFileSize] = useState(0);
  const [convertedUrl, setConvertedUrl] = useState<string>('');
  const [convertedFileSize, setConvertedFileSize] = useState(0);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('image/jpeg');
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const { toast } = useToast();

  const handleFileChange = (file: File) => {
    setOriginalFile(file);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    setOriginalFileSize(file.size);
    setConvertedUrl('');
    setConvertedFileSize(0);

    const img = document.createElement('img');
    img.src = url;
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
  };
  
  const handleFormatChange = (value: string) => {
    setOutputFormat(value as OutputFormat);
  };

  const convertImage = () => {
    if (!originalFile || isProcessing) return;
    setIsProcessing(true);

    const reader = new FileReader();
    reader.readAsDataURL(originalFile);
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
        
        // When converting from a transparent format (like PNG) to a format that doesn't support transparency (like JPEG),
        // the background will be black by default. To prevent this, we can fill the canvas with a white background.
        if (outputFormat === 'image/jpeg' && (originalFile.type === 'image/png' || originalFile.type === 'image/webp')) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        const dataUrl = canvas.toDataURL(outputFormat, 1.0);
        setConvertedUrl(dataUrl);

        const byteString = atob(dataUrl.split(',')[1]);
        setConvertedFileSize(byteString.length);
        setIsProcessing(false);
        toast({ title: 'Success', description: `Image converted to ${outputFormat.split('/')[1].toUpperCase()}.` });
      };
      img.onerror = () => {
        toast({ title: "Error", description: "Could not load image for conversion", variant: "destructive" });
        setIsProcessing(false);
      }
    };
    reader.onerror = () => {
      toast({ title: "Error", description: "Could not read file", variant: "destructive" });
      setIsProcessing(false);
    }
  };

  const getFileExtension = (mimeType: string) => {
      return mimeType.split('/')[1];
  }

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalUrl('');
    setOriginalFileSize(0);
    setConvertedUrl('');
    setConvertedFileSize(0);
    setImageDimensions({ width: 0, height: 0 });
  };

  return (
    <ToolShell
      title="Image Converter"
      description="Convert images between different formats."
      icon={FileImage}
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
                <Label htmlFor="format-select">Convert to:</Label>
                <Select onValueChange={handleFormatChange} defaultValue={outputFormat}>
                  <SelectTrigger id="format-select" className="w-full">
                    <SelectValue placeholder="Select a format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image/jpeg">JPG</SelectItem>
                    <SelectItem value="image/png">PNG</SelectItem>
                    <SelectItem value="image/webp">WebP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={convertImage} disabled={isProcessing} className="w-full">
                {isProcessing ? 'Converting...' : `Convert to ${outputFormat.split('/')[1].toUpperCase()}`}
              </Button>

              {convertedUrl && (
                <div className="space-y-4 text-sm border-t pt-4">
                  <h3 className="font-semibold text-lg">Results</h3>
                   <div className="flex justify-between">
                    <span>Original Size:</span>
                    <span className="font-medium">{formatFileSize(originalFileSize)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Converted Size:</span>
                    <span className="font-medium">{formatFileSize(convertedFileSize)}</span>
                  </div>
                  <Button
                    variant="success"
                    onClick={() => {
                        const link = document.createElement('a');
                        link.href = convertedUrl;
                        const originalName = originalFile.name.split('.').slice(0, -1).join('.');
                        link.download = `${originalName}.${getFileExtension(outputFormat)}`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }}
                    className="w-full"
                  >
                      <Download className="mr-2 h-4 w-4" />
                      Download Converted Image
                  </Button>
                </div>
              )}
              
              <Button onClick={handleReset} variant="outline" className="w-full">
                Start Over
              </Button>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center bg-muted/20 p-4 rounded-b-lg overflow-hidden">
                {isProcessing && <p>Processing...</p>}
                {!isProcessing && convertedUrl && (
                    <Image src={convertedUrl} alt="Converted preview" width={imageDimensions.width} height={imageDimensions.height} className="max-w-full max-h-full object-contain" />
                )}
                {!isProcessing && !convertedUrl && originalUrl && (
                    <Image src={originalUrl} alt="Original preview" width={imageDimensions.width} height={imageDimensions.height} className="max-w-full max-h-full object-contain" />
                )}
            </CardContent>
          </Card>
        </div>
      )}
    </ToolShell>
  );
}
