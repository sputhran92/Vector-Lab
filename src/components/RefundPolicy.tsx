import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function RefundPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-primary-blue hover:text-primary-blue/80 font-bold mb-8 block">
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl font-extrabold text-brand-text-dark tracking-tight mb-8">REFUND AND CANCELLATION POLICY</h1>
        <div className="prose prose-blue max-w-none text-brand-text-body space-y-6">
          <p>Vector Trace Lab is dedicated to providing high-precision vector graphics and digital imaging with speed and professional accuracy. To ensure a transparent and fair experience for all our clients, we have established the following guidelines regarding service cancellations and payment returns.</p>
          
          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">1. Refund Guidelines</h2>
            <p>While we strive for excellence in every file we deliver, we recognize that circumstances may require a financial adjustment. Refunds are considered under the following specific conditions:</p>
            <ul className="list-disc pl-5">
                <li>Transaction Errors: In the event of a technical glitch resulting in a duplicate billing for a single project, the extra charge will be fully reimbursed.</li>
                <li>Pre-Production Cancellation: If you choose to void your request before our design team has initiated the manual tracing process, you are entitled to a full return of your payment.</li>
                <li>Unmet Deadlines: If we are unable to deliver the project within the timeframe originally agreed upon, and the delay makes the artwork no longer useful to you, a refund request may be submitted.</li>
                <li>Technical Discrepancies: We prioritize following your exact instructions. If the final output does not align with the specifications provided at checkout, we provide complimentary revisions. If the technical requirements still cannot be met after these adjustments, a partial or full refund may be granted based on the project status.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">2. Exclusions from Refunds</h2>
            <p>Reimbursements will not be processed in the following scenarios:</p>
            <ul className="list-disc pl-5">
                <li>Once the final digital assets have been delivered and accepted by the client.</li>
                <li>If the request for a refund occurs more than seven (7) days after the project was completed.</li>
                <li>If the provided vector files have already been utilized for printing, social media, or any form of commercial production.</li>
                <li>If the dissatisfaction arises from inaccurate or incomplete instructions provided by the client during the order phase.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">3. How to Request a Return</h2>
            <p>To initiate a review of your order for a refund:</p>
            <ul className="list-disc pl-5">
                <li>Send a detailed message to info@vectortracelab.com including your project ID and the reason for the request.</li>
                <li>Our administration will assess your case and provide a response within one (1) business day.</li>
                <li>Upon approval, the funds will be transferred back to your original payment source within 5 to 7 business days.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">4. Cancellation Policy</h2>
            <ul className="list-disc pl-5">
                <li>Prior to Commencement: You may cancel any standard order for a full refund as long as work has not yet started.</li>
                <li>Mid-Process Cancellation: If a cancellation is requested after manual tracing has begun, the request will be reviewed on a case-by-case basis. A partial fee may be retained to cover the labor already performed.</li>
                <li>Priority/Rush Orders: Due to the immediate resource allocation required for express delivery, these orders cannot be canceled once the design process is underway.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">5. Adjustment and Revision Policy</h2>
            <p>We are committed to getting your artwork right. Instead of a refund, we provide two (2) rounds of complimentary revisions per project to ensure the file meets your specific needs. Modifications requested beyond these initial rounds may be subject to a secondary service fee.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-text-dark">6. Contact Information</h2>
            <p>For any inquiries regarding your orders or these policies, please contact us:</p>
            <ul className="list-disc pl-5">
                <li>Email: info@vectortracelab.com</li>
                <li>Operating Hours: Monday – Friday | 9:00 AM – 6:00 PM EST (Closed on Weekends)</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
