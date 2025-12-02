import Base64ConverterTool from '@/components/tools/base64-converter-tool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64 Converter',
  description: 'Convert images to Base64 strings.',
};

export default function Base64ConverterPage() {
  return <Base64ConverterTool />;
}
