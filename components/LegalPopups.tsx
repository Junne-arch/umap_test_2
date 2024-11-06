"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface LegalPopupsProps {
  showPrivacy: boolean;
  showTerms: boolean;
  onPrivacyClose: () => void;
  onTermsClose: () => void;
}

export function LegalPopups({ showPrivacy, showTerms, onPrivacyClose, onTermsClose }: LegalPopupsProps) {
  return (
    <>
      <Dialog open={showPrivacy} onOpenChange={onPrivacyClose}>
        <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-t-lg">
            <DialogTitle className="text-2xl text-blue-700 dark:text-blue-300">Privacy Policy</DialogTitle>
            <DialogDescription className="text-blue-600 dark:text-blue-400">Last updated: January 1, 2024</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 text-sm p-6">
            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900">
              <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-300 text-lg">1. Data Protection Declaration</h3>
              <p className="text-gray-700 dark:text-gray-300">In accordance with the EU General Data Protection Regulation (GDPR) and German Federal Data Protection Act (BDSG), we inform you about the processing of your personal data when using our platform.</p>
            </section>

            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900">
              <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-300 text-lg">2. Controller Information</h3>
              <p className="text-gray-700 dark:text-gray-300">
                GAF AG<br />
                Arnulfstr. 199<br />
                80634 München<br />
                Germany<br />
                Email: privacy@gaf.de<br />
                Phone: +49 89 121528-0
              </p>
            </section>

            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900">
              <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-300 text-lg">3. Data Protection Officer</h3>
              <p className="text-gray-700 dark:text-gray-300">
                You can contact our Data Protection Officer at:<br />
                Email: dpo@gaf.de
              </p>
            </section>

            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900">
              <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-300 text-lg">4. Data Collection and Processing</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>User account information (name, email)</li>
                <li>Usage data (IP address, browser type)</li>
                <li>Geospatial data for urban heat analysis</li>
                <li>Technical measurements and sensor data</li>
              </ul>
            </section>

            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900">
              <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-300 text-lg">5. Legal Basis</h3>
              <p className="text-gray-700 dark:text-gray-300">We process your data in accordance with Art. 6(1) GDPR:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Consent (Art. 6(1)(a))</li>
                <li>Contract fulfillment (Art. 6(1)(b))</li>
                <li>Legal obligations (Art. 6(1)(c))</li>
                <li>Legitimate interests (Art. 6(1)(f))</li>
              </ul>
            </section>

            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900">
              <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-300 text-lg">6. Data Storage Duration</h3>
              <p className="text-gray-700 dark:text-gray-300">We store personal data only as long as necessary or legally required. Research data may be stored longer for scientific purposes.</p>
            </section>

            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900">
              <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-300 text-lg">7. Your Rights</h3>
              <p className="text-gray-700 dark:text-gray-300">Under GDPR, you have the following rights:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Right to information (Art. 15)</li>
                <li>Right to rectification (Art. 16)</li>
                <li>Right to erasure (Art. 17)</li>
                <li>Right to data portability (Art. 20)</li>
                <li>Right to object (Art. 21)</li>
              </ul>
            </section>

            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900">
              <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-300 text-lg">8. Data Security</h3>
              <p className="text-gray-700 dark:text-gray-300">We implement appropriate technical and organizational measures to ensure data security according to Art. 32 GDPR.</p>
            </section>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showTerms} onOpenChange={onTermsClose}>
        <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950 p-6 rounded-t-lg">
            <DialogTitle className="text-2xl text-green-700 dark:text-green-300">Terms of Service</DialogTitle>
            <DialogDescription className="text-green-600 dark:text-green-400">Last updated: January 1, 2024</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 text-sm p-6">
            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-green-100 dark:border-green-900">
              <h3 className="font-semibold mb-2 text-green-700 dark:text-green-300 text-lg">1. General Provisions</h3>
              <p className="text-gray-700 dark:text-gray-300">These Terms of Service are governed by German law and EU regulations. They constitute the agreement between GAF AG ("we", "us", "our") and the users of the Urban Microclimate Analysis Platform.</p>
            </section>

            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-green-100 dark:border-green-900">
              <h3 className="font-semibold mb-2 text-green-700 dark:text-green-300 text-lg">2. Service Description</h3>
              <p className="text-gray-700 dark:text-gray-300">The Urban Microclimate Analysis Platform provides tools and data for analyzing urban heat patterns and climate conditions. We reserve the right to modify or discontinue services with appropriate notice.</p>
            </section>

            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-green-100 dark:border-green-900">
              <h3 className="font-semibold mb-2 text-green-700 dark:text-green-300 text-lg">3. User Obligations</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Provide accurate registration information</li>
                <li>Maintain password confidentiality</li>
                <li>Use the platform in compliance with applicable laws</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </section>

            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-green-100 dark:border-green-900">
              <h3 className="font-semibold mb-2 text-green-700 dark:text-green-300 text-lg">4. Intellectual Property</h3>
              <p className="text-gray-700 dark:text-gray-300">All content, including but not limited to software, data, and analytics, is protected by German and international intellectual property laws. Users receive a limited, non-exclusive license to use the platform.</p>
            </section>

            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-green-100 dark:border-green-900">
              <h3 className="font-semibold mb-2 text-green-700 dark:text-green-300 text-lg">5. Data Usage</h3>
              <p className="text-gray-700 dark:text-gray-300">Scientific data provided through the platform is subject to specific usage terms. Users must attribute the source and comply with data sharing agreements.</p>
            </section>

            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-green-100 dark:border-green-900">
              <h3 className="font-semibold mb-2 text-green-700 dark:text-green-300 text-lg">6. Liability</h3>
              <p className="text-gray-700 dark:text-gray-300">In accordance with §§ 521, 523, 524 BGB (German Civil Code), we limit our liability to intent and gross negligence, except for damages resulting from injury to life, body, or health.</p>
            </section>

            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-green-100 dark:border-green-900">
              <h3 className="font-semibold mb-2 text-green-700 dark:text-green-300 text-lg">7. Termination</h3>
              <p className="text-gray-700 dark:text-gray-300">We may terminate or suspend access to our service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or us.</p>
            </section>

            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-green-100 dark:border-green-900">
              <h3 className="font-semibold mb-2 text-green-700 dark:text-green-300 text-lg">8. Changes to Terms</h3>
              <p className="text-gray-700 dark:text-gray-300">We reserve the right to modify these terms. Users will be notified of significant changes. Continued use of the platform constitutes acceptance of modified terms.</p>
            </section>

            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-green-100 dark:border-green-900">
              <h3 className="font-semibold mb-2 text-green-700 dark:text-green-300 text-lg">9. Applicable Law</h3>
              <p className="text-gray-700 dark:text-gray-300">These terms are governed by German law. The courts of Munich, Germany shall have exclusive jurisdiction for any disputes.</p>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}