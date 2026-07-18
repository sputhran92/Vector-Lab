import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-primary-blue hover:text-primary-blue/80 font-bold mb-8 block">
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl font-extrabold text-brand-text-dark tracking-tight mb-8">PRIVACY POLICY</h1>
        <div className="prose prose-blue max-w-none text-brand-text-body space-y-6">
          <p>Vector Trace Lab is deeply committed to maintaining the confidentiality of your personal data and protecting your privacy rights. This document explains how we gather, utilize, and safeguard your information when you interact with our website and utilize our artwork services. By engaging with our platform, you consent to the data practices described in this policy.</p>
          
          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">1. Data We Collect</h2>
            <p>We obtain personal details that you voluntarily submit to us when you:</p>
            <ul className="list-disc pl-5">
                <li>Inquire about our vectorization or design services.</li>
                <li>Sign up for our industry updates or promotional communications.</li>
                <li>Connect with us via social media or other digital channels.</li>
            </ul>
            <p>The specific types of information we may request include:</p>
            <ul className="list-disc pl-5">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Contact Number</li>
                <li>Organization/Business Name</li>
                <li>Geographic Location (Country)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">2. How We Utilize Your Information</h2>
            <p>Vector Trace Lab processes your data for several key operational purposes, including:</p>
            <ul className="list-disc pl-5">
                <li>Addressing your service requests and providing dedicated client support.</li>
                <li>Distributing relevant newsletters, marketing content, and project updates that align with your interests.</li>
                <li>Analyzing user behavior to optimize our website performance and service quality.</li>
                <li>Fulfilling our regulatory obligations and defending our legal rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">3. Information Sharing and Disclosure</h2>
            <p>We strictly prohibit the sale or leasing of your personal data to third parties. However, we may disclose your information under the following limited circumstances:</p>
            <ul className="list-disc pl-5">
                <li>To trusted service providers who assist in our business operations (such as hosting or email delivery).</li>
                <li>In compliance with a judicial proceeding, court order, or legal mandate.</li>
                <li>In the event of a corporate transition, such as a merger, asset sale, or business acquisition.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">4. Your Personal Data Rights</h2>
            <p>Depending on your jurisdiction, you may hold specific rights regarding the data we maintain, such as:</p>
            <ul className="list-disc pl-5">
                <li>The Right to Access: You may request a copy of the personal data we have on file.</li>
                <li>The Right to Rectification: You may ask us to update or correct any inaccurate details.</li>
                <li>The Right to Erasure: You may request the permanent deletion of your records under certain conditions.</li>
            </ul>
            <p>To exercise any of these rights, please contact our administration at the email provided below.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">5. Policy Revisions</h2>
            <p>We may periodically modify this Privacy Policy to reflect changes in our practices or legal requirements. All updates will be effective immediately upon being published on this page. We suggest reviewing this policy regularly to stay informed about how we protect your data.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">6. Acknowledgment</h2>
            <p>By utilizing the Vector Trace Lab website and our graphic services, you acknowledge that you have reviewed this Privacy Policy and agree to the terms outlined herein. We appreciate the trust you place in us to handle your professional information.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">Contact Us:</h2>
            <p>Email: info@vectortracelab.com<br/>Web: www.vectortracelab.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
