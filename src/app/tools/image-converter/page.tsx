import ImageConverterTool from '@/components/tools/image-converter-tool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Converter',
  description: 'Convert images between different formats.',
};

export default function ImageConverterPage() {
  return <ImageConverterTool />;
}
