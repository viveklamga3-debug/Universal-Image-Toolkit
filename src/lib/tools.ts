import {
  Crop,
  Maximize,
  Scissors,
  FileImage,
  type LucideIcon,
} from 'lucide-react';

export interface Tool {
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export const TOOLS: Tool[] = [
  {
    name: 'Image Compressor',
    description: 'Reduce image file size',
    icon: Scissors,
    href: '/tools/image-compressor',
  },
  {
    name: 'Image Resizer',
    description: 'Change image dimensions',
    icon: Maximize,
    href: '/tools/image-resizer',
  },
  {
    name: 'Image Converter',
    description: 'Convert to JPG, PNG, WebP',
    icon: FileImage,
    href: '/tools/image-converter',
  },
  {
    name: 'Image Crop Tool',
    description: 'Crop to a specific area',
    icon: Crop,
    href: '/tools/image-cropper',
  },
];
