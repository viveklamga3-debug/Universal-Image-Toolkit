import MetadataViewerTool from '@/components/tools/metadata-viewer-tool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Metadata Viewer',
  description: 'View image metadata.',
};

export default function MetadataViewerPage() {
  return <MetadataViewerTool />;
}
