import ImageRotatorTool from '@/components/tools/image-rotator-tool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Rotator',
  description: 'Rotate and flip images.',
};

export default function ImageRotatorPage() {
  return <ImageRotatorTool />;
}
