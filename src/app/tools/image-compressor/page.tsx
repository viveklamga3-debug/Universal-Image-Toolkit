import ImageCompressorTool from '@/components/tools/image-compressor-tool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Compressor',
  description: 'Compress JPG, PNG, and WebP images to reduce file size without losing quality. Fast, free, and private.',
};

export default function ImageCompressorPage() {
  return <ImageCompressorTool />;
}
