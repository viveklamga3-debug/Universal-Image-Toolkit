"use client";

import { useState, type DragEvent } from 'react';
import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface DropzoneProps {
  onFileChange: (file: File) => void;
  acceptedFileTypes?: string;
}

export default function Dropzone({ onFileChange, acceptedFileTypes = "image/*" }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onFileChange(file);
    } else {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload an image file.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center cursor-pointer transition-colors duration-300",
        isDragging ? "bg-accent border-primary" : "bg-card hover:bg-accent"
      )}
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input
        type="file"
        id="file-input"
        className="hidden"
        accept={acceptedFileTypes}
        onChange={handleFileSelect}
      />
      <div className="flex flex-col items-center justify-center space-y-4 text-muted-foreground">
        <UploadCloud className="w-12 h-12" />
        <p className="font-semibold">
          {isDragging ? 'Drop the image here' : 'Drag & drop an image here, or click to select'}
        </p>
        <p className="text-sm">PNG, JPG, WebP, GIF supported</p>
      </div>
    </div>
  );
}
