import type { Metadata } from 'next';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact information for Universal Image Toolkit.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
      <div className="text-center">
        <div className="inline-block p-4 bg-primary/10 rounded-2xl mb-4">
          <Mail className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold font-headline mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="mt-12 text-center prose dark:prose-invert max-w-2xl mx-auto">
        <p>
          For support, feedback, or inquiries, please feel free to reach out. We are currently setting up our primary contact channels. In the meantime, please check back here for updated contact information.
        </p>
        <p>
          We appreciate your patience and your interest in Universal Image Toolkit.
        </p>
      </div>
    </div>
  );
}
