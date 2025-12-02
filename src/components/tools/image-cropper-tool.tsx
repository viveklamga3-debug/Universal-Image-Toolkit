"use client";

import { useState, useCallback } from 'react';
import ToolShell from '@/components/tool-shell';
import { Crop, Download, ZoomIn, ZoomOut } from 'lucide-react';
import Dropzone from '@/components/dropzone';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Cropper from 'react-easy-crop';
import type { Point, Area } from 'react-easy-crop';
import { Slider } from '@/components/ui/slider';
import { getCroppedImg } from '@/lib/crop-image';

export default function ImageCropperTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (file: File) => {
    setOriginalFile(file);
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleDownload = async () => {
    if (!croppedAreaPixels || !imageSrc || !originalFile) {
      toast({
        title: 'Error',
        description: 'Could not crop image. Make sure an image is selected.',
        variant: 'destructive',
      });
      return;
    }
    setIsProcessing(true);
    try {
      const croppedImageBlob = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        0,
        originalFile.type
      );

      if (!croppedImageBlob) {
        throw new Error('Failed to create cropped image blob.');
      }

      const link = document.createElement('a');
      link.href = URL.createObjectURL(croppedImageBlob);
      const originalName = originalFile.name.split('.').slice(0, -1).join('.');
      const extension = originalFile.name.split('.').pop() || 'png';
      link.download = `cropped-${originalName}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

    } catch (e) {
      console.error(e);
      toast({
        title: 'Cropping Failed',
        description: 'An error occurred while cropping the image.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleReset = () => {
    setImageSrc(null);
    setOriginalFile(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  return (
    <ToolShell
      title="Image Cropper"
      description="Crop images to a specific area."
      icon={Crop}
    >
      {!imageSrc && <Dropzone onFileChange={handleFileChange} />}

      {imageSrc && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 relative aspect-video">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                  <label htmlFor="zoom" className="font-medium">Zoom</label>
                  <div className="flex items-center gap-2">
                    <ZoomOut className="h-5 w-5" />
                    <Slider
                        id="zoom"
                        min={1}
                        max={3}
                        step={0.1}
                        value={[zoom]}
                        onValueChange={(value) => setZoom(value[0])}
                    />
                    <ZoomIn className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-4 border-t pt-4">
                  <Button onClick={handleDownload} disabled={isProcessing} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    {isProcessing ? 'Cropping...' : 'Crop & Download'}
                  </Button>
                  <Button onClick={handleReset} variant="outline" className="w-full">
                    Start Over
                  </Button>
                </div>
            </CardContent>
          </Card>
        </div>
      )}
    </ToolShell>
  );
}
