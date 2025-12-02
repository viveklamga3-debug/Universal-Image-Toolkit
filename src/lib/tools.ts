import {
  Crop,
  Maximize,
  Scissors,
  FileImage,
  Code,
  Palette,
  Tags,
  Wand2,
  RotateCw,
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
  {
    name: 'Image to Base64',
    description: 'Embed images in code',
    icon: Code,
    href: '/tools/base64-converter',
  },
  {
    name: 'Color Picker',
    description: 'Extract colors from images',
    icon: Palette,
    href: '/tools/color-picker',
  },
  {
    name: 'Metadata Viewer',
    description: 'View basic image info',
    icon: Tags,
    href: '/tools/metadata-viewer',
  },
  {
    name: 'Background Remover',
    description: 'Remove image backgrounds',
    icon: Wand2,
    href: '/tools/background-remover',
  },
  {
    name: 'Image Rotator / Flipper',
    description: 'Rotate and flip images',
    icon: RotateCw,
    href: '/tools/image-rotator',
  },
];
