import ImageResizerTool from '@/components/tools/image-resizer-tool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Resizer',
  description: 'Resize images to different dimensions.',
};

export default function ImageResizerPage() {
  return <ImageResizerTool />;
}
