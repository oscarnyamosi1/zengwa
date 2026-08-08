import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Database, UserCheck } from "lucide-react";

import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | Zengwa Mission Connect",
  description:
    "Learn how Zengwa Mission Connect collects, uses, protects, and manages personal information from donors, sponsors, volunteers, partners, and visitors.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Zengwa Mission Connect",
    description:
      "Our commitment to protecting your personal information and keeping your donations and interactions secure.",
    type: "website",
  },
};

const sections = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: (
      <>
        <p>
          When you use Zengwa Mission Connect, we may collect information
          that you voluntarily provide to us, information generated through
          your use of our services, and information required to process
          donations, sponsorships, applications, and communications.
        </p>

        <h3>Information you provide</h3>

        <ul>
          <li>Name and contact information.</li>
          <li>Email address and telephone number.</li>
          <li>Billing or donation information.</li>
          <li>Account credentials where an account is created.</li>
          <li>Volunteer or sponsorship application information.</li>
          <li>Messages, prayer requests, enquiries, and other communications.</li>
        </ul>

        <h3>Information collected automatically</h3>

        <p>
          We may collect limited technical information such as your IP
          address, browser type, device information, pages visited, and
          approximate usage information to maintain security, improve
          performance, and understand how our platform is used.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "2. How We Use Your Information",
    content: (
      <>
        <p>
          Information collected through the platform may be used for the
          following purposes:
        </p>

        <ul>
          <li>Processing and confirming donations.</li>
          <li>Providing donation receipts and transaction records.</li>
          <li>Managing child sponsorship relationships.</li>
          <li>Managing volunteer applications and participation.</li>
          <li>Responding to enquiries and support requests.</li>
          <li>Sending ministry, project, campaign, or event updates.</li>
          <li>Improving the security and functionality of the platform.</li>
          <li>Preventing fraud, abuse, and unauthorized activity.</li>
          <li>Meeting applicable legal and regulatory requirements.</li>
        </ul>
      </>
    ),
  },
  {
    id: "donations-payments",
    title: "3. Donations and Payments",
    content: (
      <>
        <p>
          Zengwa Mission Connect may support payment services including
          M-Pesa, card payments, and other third-party payment providers.
        </p>

        <p>
          Payment information may be processed directly by the relevant
          payment provider. We do not intend to store complete payment card
          credentials on our servers.
        </p>

        <p>
          Payment providers may have their own privacy policies and terms.
          You should review the applicable provider's policies before
          completing a transaction.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "4. Cookies and Similar Technologies",
    content: (
      <>
        <p>
          Zengwa Mission Connect may use cookies and similar technologies to
          maintain essential functionality, improve security, remember
          preferences, and understand website usage.
        </p>

        <p>
          Where analytics or non-essential technologies are introduced, the
          platform should provide appropriate controls where required by
          applicable law.
        </p>
      </>
    ),
  },
  {
    id: "information-sharing",
    title: "5. When We Share Information",
    content: (
      <>
        <p>
          We do not sell your personal information.
        </p>

        <p>
          Information may be shared with trusted service providers where
          necessary to operate the platform, including payment processors,
          hosting providers, email providers, security services, and
          technical service providers.
        </p>

        <p>
          Information may also be disclosed where required by law, court
          order, regulatory authority, or where reasonably necessary to
          protect the rights, safety, and security of Zengwa Mission Connect,
          its users, donors, beneficiaries, or partners.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "6. Data Security",
    content: (
      <>
        <p>
          We take reasonable technical and organizational measures to protect
          personal information against unauthorized access, alteration,
          disclosure, loss, or destruction.
        </p>

        <p>
          Security measures may include encrypted connections, access
          controls, authentication mechanisms, monitoring, backups, and
          restricted administrative access.
        </p>

        <p>
          However, no internet-based service can guarantee absolute security.
          Users should therefore avoid sending sensitive information through
          unsecured communication channels.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "7. Data Retention",
    content: (
      <>
        <p>
          We retain personal information only for as long as reasonably
          necessary for the purpose for which it was collected, to maintain
          appropriate records, resolve disputes, enforce agreements, or meet
          legal and regulatory obligations.
        </p>

        <p>
          When information is no longer required, it may be securely deleted,
          anonymized, or otherwise disposed of where appropriate.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "8. Your Privacy Rights",
    content: (
      <>
        <p>
          Depending on applicable law, you may have rights concerning your
          personal information, including the right to:
        </p>

        <ul>
          <li>Request access to personal information we hold about you.</li>
          <li>Request correction of inaccurate information.</li>
          <li>Request deletion where legally applicable.</li>
          <li>Object to or restrict certain processing.</li>
          <li>Withdraw consent where processing is based on consent.</li>
          <li>Request information about how your data is being used.</li>
        </ul>

        <p>
          Requests should be made using the contact information provided
          below.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "9. Children's Information",
    content: (
      <>
        <p>
          Zengwa Mission Connect may support child sponsorship and education
          initiatives. Because information relating to children requires
          additional care, child-related personal information should only be
          collected, processed, displayed, or shared for legitimate ministry
          and organizational purposes and with appropriate authorization.
        </p>

        <p>
          Public-facing child profiles should avoid unnecessarily exposing
          sensitive personal information.
        </p>
      </>
    ),
  },
  {
    id: "third-party-services",
    title: "10. Third-Party Services",
    content: (
      <>
        <p>
          The platform may contain links to external websites, payment
          services, social platforms, or other third-party services.
        </p>

        <p>
          Zengwa Mission Connect is not responsible for the privacy practices
          of third-party websites or services. Their own privacy policies
          apply when you interact with them.
        </p>
      </>
    ),
  },
  {
    id: "international-data",
    title: "11. International Data Transfers",
    content: (
      <>
        <p>
          Some service providers used by the platform may process or store
          information outside Kenya. Where this occurs, reasonable measures
          should be taken to ensure that personal information receives
          appropriate protection in accordance with applicable privacy and
          data protection requirements.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "12. Changes to This Privacy Policy",
    content: (
      <>
        <p>
          This Privacy Policy may be updated from time to time to reflect
          changes to our services, technology, legal requirements, or privacy
          practices.
        </p>

        <p>
          When significant changes are made, the updated policy will be
          published on this page with a revised effective date.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "13. Contact Us",
    content: (
      <>
        <p>
          If you have questions, concerns, or requests regarding this Privacy
          Policy or the way your personal information is handled, please
          contact Zengwa Mission Connect through the official contact
          channels provided on our website.
        </p>

        <div className="mt-6 rounded-xl border border-border bg-muted/30 p-5">
          <p className="font-semibold text-foreground mb-2">
            Zengwa Mission Connect
          </p>

          <p className="text-muted-foreground text-sm">
            Privacy and Data Protection Enquiries
          </p>

          <Link
            href="/contact"
            className="inline-flex mt-4 text-sm font-semibold text-primary hover:text-secondary transition-colors"
          >
            Contact Zengwa →
          </Link>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-primary py-16 lg:py-24">
          <div className="herosection absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent blur-2xl" />
          </div>

          <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-5">
                <ShieldCheck
                  size={38}
                  className="text-accent shrink-0"
                />

                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  Privacy & Data Protection
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-5 leading-tight">
                Privacy Policy
              </h1>

              <p className="text-white/75 text-lg leading-relaxed max-w-2xl">
                We value your trust and are committed to protecting the
                personal information entrusted to Zengwa Mission Connect.
              </p>

              <p className="text-white/60 text-sm mt-6">
                Effective date: August 8, 2026
              </p>
            </div>
          </div>
        </section>

        {/* Trust cards */}
        <section className="py-8 border-b border-border bg-card">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 border border-border rounded-2xl bg-background">
                <Lock className="text-primary mb-3" size={24} />
                <h2 className="font-bold text-foreground mb-1">
                  Secure Information
                </h2>
                <p className="text-sm text-muted-foreground">
                  We use reasonable safeguards to protect personal information.
                </p>
              </div>

              <div className="p-5 border border-border rounded-2xl bg-background">
                <Database className="text-primary mb-3" size={24} />
                <h2 className="font-bold text-foreground mb-1">
                  Responsible Data Use
                </h2>
                <p className="text-sm text-muted-foreground">
                  Information is collected and used for legitimate ministry
                  and platform purposes.
                </p>
              </div>

              <div className="p-5 border border-border rounded-2xl bg-background">
                <UserCheck className="text-primary mb-3" size={24} />
                <h2 className="font-bold text-foreground mb-1">
                  Your Rights
                </h2>
                <p className="text-sm text-muted-foreground">
                  You may have rights regarding access, correction, and use of
                  your personal information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Policy content */}
        <section className="py-12 lg:py-16">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-10">
              {/* Table of contents */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 shadow-card">
                  <h2 className="font-bold text-foreground mb-4">
                    Contents
                  </h2>

                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors leading-relaxed"
                      >
                        {section.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Main policy */}
              <article className="max-w-4xl">
                <div className="rounded-2xl border border-border bg-card shadow-card p-6 sm:p-8 lg:p-10">
                  <div className="space-y-10">
                    {sections.map((section) => (
                      <section
                        key={section.id}
                        id={section.id}
                        className="scroll-mt-24"
                      >
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                          {section.title}
                        </h2>

                        <div className="privacy-content text-muted-foreground leading-8 space-y-4">
                          {section.content}
                        </div>
                      </section>
                    ))}
                  </div>

                  {/* Final notice */}
                  <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      By using Zengwa Mission Connect, you acknowledge that
                      you have read and understood this Privacy Policy.
                    </p>

                    <p className="text-sm text-muted-foreground mt-3">
                      Last updated: August 8, 2026
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}