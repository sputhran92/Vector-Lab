import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-primary-blue hover:text-primary-blue/80 font-bold mb-8 block">
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl font-extrabold text-brand-text-dark tracking-tight mb-8">TERMS AND CONDITIONS</h1>
        <div className="prose prose-blue max-w-none text-brand-text-body space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">1. Overview</h2>
            <p>These Terms and Conditions outline the rules and regulations for the use of the Vector Trace Lab website and the services provided by Vector Lab. By accessing this site or utilizing our artwork services, you confirm that you have understood and consented to be legally bound by these provisions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">2. Description of Services</h2>
            <p>Vector Trace Lab provides professional digital imaging solutions, specializing in the following areas for the promotional products industry:</p>
            <ul className="list-disc pl-5">
                <li>Manual Vector Conversions (Raster to Vector)</li>
                <li>Logo Reconstruction and Cleanup</li>
                <li>High-Precision Image Editing</li>
                <li>Production-Ready Graphic Solutions</li>
                <li>Typesetting and Font Matching</li>
                <li>Digital Prepress Support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">3. Client Obligations and Conduct</h2>
            <p>Users agree to interact with our platform and services only for authorized and lawful purposes. You are prohibited from using this website in any way that may damage, disable, or overburden our infrastructure or interfere with the experience of other clients. Any attempt to gain unauthorized access to our systems or restricted data is strictly forbidden.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">4. Proprietary Rights</h2>
            <p>All original content featured on this website—including but not limited to text, branding, site design, and UI graphics—is the exclusive property of Vector Trace Lab. Unauthorized replication, distribution, or modification of any material found on this site is prohibited unless explicit written consent is granted by us.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">5. Constraints of Liability</h2>
            <p>Vector Trace Lab shall not be held accountable for any indirect, consequential, or incidental damages (including, but not limited to, printing errors or loss of revenue) resulting from the use of our digital files or website. In all circumstances, our maximum financial liability to you for any claim related to our services shall be limited to the total amount paid by you for that specific order.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">6. Right to Terminate Access</h2>
            <p>We maintain the right to restrict, suspend, or terminate your access to our services and website at our sole discretion, without prior notice. This right may be exercised if we believe there has been a breach of these Terms or if a user engages in conduct that we deem detrimental to our business operations.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">7. Revision of Terms</h2>
            <p>Vector Trace Lab reserves the authority to update or modify these Terms and Conditions at any time. All revisions will become effective immediately upon being posted on this webpage. Your continued engagement with our services following any changes signifies your acceptance of the updated Terms.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
