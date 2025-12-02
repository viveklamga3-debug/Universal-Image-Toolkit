import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Universal Image Toolkit. We respect your privacy. All image processing is done in your browser.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold font-headline mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="mt-8 text-2xl font-bold font-headline">Introduction</h2>
        <p>
          Welcome to Universal Image Toolkit. We are committed to protecting your privacy. This Privacy Policy explains our practices concerning the collection, use, and disclosure of information. Our core principle is privacy-by-design: our tools work entirely within your browser, and your images are never uploaded to our servers.
        </p>

        <h2 className="mt-8 text-2xl font-bold font-headline">Information We Do Not Collect</h2>
        <p>
          We do not collect, store, or have access to any of the images you process using our tools. All operations, including but not limited to compressing, resizing, converting, and editing, are performed on your own device (client-side).
        </p>
        <p>
          We do not require you to create an account, and we do not collect personal information such as your name, email address, or any other contact information.
        </p>

        <h2 className="mt-8 text-2xl font-bold font-headline">Information We Collect</h2>
        <p>
          We may collect anonymous usage data to help us improve our services. This data is non-personal and may include information such as the tools being used, browser type, and device type. This data is aggregated and cannot be used to identify you personally.
        </p>

        <h2 className="mt-8 text-2xl font-bold font-headline">Third-Party Services</h2>
        <p>
          This website may display ads from Google AdSense. Google may use cookies to serve ads based on a user's prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to this site and/or other sites on the Internet.
        </p>
        <p>
          You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Ads Settings</a>.
        </p>

        <h2 className="mt-8 text-2xl font-bold font-headline">Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="mt-8 text-2xl font-bold font-headline">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please visit our Contact page.
        </p>
      </div>
    </div>
  );
}
