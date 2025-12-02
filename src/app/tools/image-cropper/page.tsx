import ImageCropperTool from '@/components/tools/image-cropper-tool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Cropper',
  description: 'Crop images to a specific area.',
};

export default function ImageCropperPage() {
  return <ImageCropperTool />;
}
