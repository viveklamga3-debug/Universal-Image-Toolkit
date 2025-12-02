import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Universal Image Toolkit.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold font-headline mb-4">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="mt-8 text-2xl font-bold font-headline">1. Acceptance of Terms</h2>
        <p>
          By accessing and using Universal Image Toolkit (the "Service"), you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2 className="mt-8 text-2xl font-bold font-headline">2. Description of Service</h2>
        <p>
          The Service provides a suite of client-side image manipulation tools. All image processing is done within your browser. No files or data are uploaded to our servers. The Service is provided "AS IS" without any warranties.
        </p>

        <h2 className="mt-8 text-2xl font-bold font-headline">3. User Conduct</h2>
        <p>
          You agree to use the Service only for lawful purposes. You are prohibited from using the Service to process any material that is infringing, obscene, threatening, libelous, or otherwise unlawful or tortious.
        </p>

        <h2 className="mt-8 text-2xl font-bold font-headline">4. Disclaimer of Warranties</h2>
        <p>
          The Service is provided on an "as is" and "as available" basis. Universal Image Toolkit expressly disclaims all warranties of any kind, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We make no warranty that the service will meet your requirements or be uninterrupted, timely, secure, or error-free.
        </p>

        <h2 className="mt-8 text-2xl font-bold font-headline">5. Limitation of Liability</h2>
        <p>
          You expressly understand and agree that Universal Image Toolkit shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages resulting from the use or the inability to use the service.
        </p>

        <h2 className="mt-8 text-2xl font-bold font-headline">6. Modifications to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Your continued use of the Service after any such changes constitutes your acceptance of the new terms.
        </p>
      </div>
    </div>
  );
}
