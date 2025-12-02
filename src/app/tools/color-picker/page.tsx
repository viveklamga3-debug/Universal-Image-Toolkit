import ColorPickerTool from '@/components/tools/color-picker-tool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Picker',
  description: 'Pick colors from an image.',
};

export default function ColorPickerPage() {
  return <ColorPickerTool />;
}
