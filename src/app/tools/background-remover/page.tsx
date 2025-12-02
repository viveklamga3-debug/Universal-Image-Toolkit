import BackgroundRemoverTool from '@/components/tools/background-remover-tool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Background Remover',
  description: 'Remove the background from images.',
};

export default function BackgroundRemoverPage() {
  return <BackgroundRemoverTool />;
}
