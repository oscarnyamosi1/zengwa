import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  HeartHandshake,
  AlertCircle,
} from "lucide-react";

import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Terms of Service | Zengwa Mission Connect",
  description:
    "Read the Terms of Service governing your use of Zengwa Mission Connect, including donations, sponsorships, volunteering, accounts, content, and platform use.",
  alternates: {
    canonical: "/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | Zengwa Mission Connect",
    description:
      "The terms and conditions governing the use of Zengwa Mission Connect.",
    type: "website",
  },
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of These Terms",
    content: (
      <>
        <p>
          Welcome to Zengwa Mission Connect. These Terms of Service govern
          your access to and use of our website, digital services,
          fundraising features, donation services, sponsorship services,
          volunteer services, content, and related platforms.
        </p>

        <p>
          By accessing or using Zengwa Mission Connect, you agree to be bound
          by these Terms of Service and our Privacy Policy. If you do not
          agree with these terms, you should not use the platform.
        </p>
      </>
    ),
  },
  {
    id: "about-platform",
    title: "2. About Zengwa Mission Connect",
    content: (
      <>
        <p>
          Zengwa Mission Connect is a digital platform designed to support
          the activities and initiatives of Zengwa Christian Education
          Centre and its related ministry, education, community development,
          fundraising, sponsorship, and outreach activities.
        </p>

        <p>
          The platform may provide information about projects, campaigns,
          beneficiaries, events, sponsorship opportunities, volunteer
          opportunities, and other activities.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "3. Eligibility",
    content: (
      <>
        <p>
          You may use the platform only where you are legally permitted to do
          so and have the capacity to enter into these Terms.
        </p>

        <p>
          Where a service requires an account, you are responsible for
          providing accurate information and maintaining the confidentiality
          of your account credentials.
        </p>

        <p>
          Parents, guardians, or authorized representatives should provide
          appropriate consent where required for activities involving
          children or minors.
        </p>
      </>
    ),
  },
  {
    id: "accounts",
    title: "4. User Accounts",
    content: (
      <>
        <p>
          Certain features may require you to create an account. You agree
          to provide accurate, current, and complete information when
          registering.
        </p>

        <p>
          You are responsible for protecting your password and other account
          credentials and for activities performed through your account.
        </p>

        <p>
          You should notify us promptly if you believe your account has been
          accessed without authorization.
        </p>

        <p>
          We reserve the right to suspend or terminate accounts that violate
          these Terms, applicable law, or legitimate platform security
          requirements.
        </p>
      </>
    ),
  },
  {
    id: "donations",
    title: "5. Donations",
    content: (
      <>
        <p>
          Donations made through Zengwa Mission Connect are intended to
          support the campaign, project, ministry, or purpose selected by
          the donor.
        </p>

        <p>
          Where a campaign has received sufficient funding, reached its
          target, ended, or circumstances have changed, Zengwa may use funds
          for a closely related purpose consistent with the organization's
          mission, subject to applicable law and any representations made to
          donors.
        </p>

        <p>
          Donors are responsible for ensuring that the information supplied
          during a donation is accurate.
        </p>

        <p>
          Donations may be processed through third-party payment providers.
          Their terms and conditions may also apply to the transaction.
        </p>
      </>
    ),
  },
  {
    id: "payment-processing",
    title: "6. Payments and Transaction Processing",
    content: (
      <>
        <p>
          Zengwa Mission Connect may support payment methods including
          M-Pesa, debit or credit cards, bank transfers, PayPal, Stripe, or
          other payment services that may be introduced in the future.
        </p>

        <p>
          A transaction may be subject to verification, authorization,
          processing delays, technical issues, or rejection by the relevant
          payment provider.
        </p>

        <p>
          We are not responsible for failures caused by a third-party
          payment provider, banking network, telecommunications network, or
          other external service outside our reasonable control.
        </p>
      </>
    ),
  },
  {
    id: "refunds",
    title: "7. Donations, Refunds and Cancellations",
    content: (
      <>
        <p>
          Donations are generally intended to be voluntary contributions
          toward Zengwa's mission and projects.
        </p>

        <p>
          If you believe a donation was made in error, duplicated, or made
          without authorization, contact us as soon as reasonably possible
          with the relevant transaction information.
        </p>

        <p>
          Refund requests will be reviewed individually and handled in
          accordance with applicable law, the circumstances of the
          transaction, and the policies of the payment provider involved.
        </p>
      </>
    ),
  },
  {
    id: "sponsorship",
    title: "8. Child Sponsorship",
    content: (
      <>
        <p>
          Child sponsorship contributions support educational, welfare,
          developmental, ministry, or other approved activities associated
          with the sponsorship program.
        </p>

        <p>
          Sponsorship does not create ownership, guardianship, parental
          rights, or a direct contractual relationship between a sponsor and
          a sponsored child.
        </p>

        <p>
          For safeguarding and privacy reasons, sponsors must not attempt to
          independently obtain sensitive information about a child or arrange
          unauthorized direct contact.
        </p>

        <p>
          Any photographs, updates, letters, or information provided about
          sponsored children must be treated respectfully and must not be
          redistributed for inappropriate, commercial, or exploitative
          purposes.
        </p>
      </>
    ),
  },
  {
    id: "volunteers",
    title: "9. Volunteers and Mission Activities",
    content: (
      <>
        <p>
          Registration as a volunteer or mission participant does not
          automatically guarantee acceptance or participation in a specific
          activity.
        </p>

        <p>
          Volunteer applications may be reviewed based on available
          opportunities, organizational requirements, safeguarding
          considerations, qualifications, availability, and other relevant
          factors.
        </p>

        <p>
          Volunteers are expected to follow applicable organizational
          policies, safeguarding procedures, instructions, and codes of
          conduct.
        </p>
      </>
    ),
  },
  {
    id: "user-content",
    title: "10. User-Submitted Content",
    content: (
      <>
        <p>
          You may have opportunities to submit information, comments,
          testimonials, photographs, prayer requests, messages, or other
          content through the platform.
        </p>

        <p>
          You agree not to submit content that is unlawful, defamatory,
          abusive, threatening, fraudulent, discriminatory, invasive of
          another person's privacy, or otherwise inappropriate.
        </p>

        <p>
          You should only submit photographs, documents, or other material
          where you have the appropriate permission to share them.
        </p>

        <p>
          We reserve the right to remove content that violates these Terms
          or presents a security, safeguarding, legal, or reputational risk.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "11. Intellectual Property",
    content: (
      <>
        <p>
          Unless otherwise stated, the content and design of Zengwa Mission
          Connect, including logos, branding, text, graphics, photographs,
          videos, software, layouts, and other materials, are owned by or
          licensed to Zengwa Mission Connect or its respective rights
          holders.
        </p>

        <p>
          You may access and use the content for personal, non-commercial,
          and legitimate purposes consistent with these Terms.
        </p>

        <p>
          You may not reproduce, modify, distribute, sell, publicly display,
          or commercially exploit protected content without appropriate
          permission.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "12. Acceptable Use",
    content: (
      <>
        <p>
          You agree to use the platform responsibly and lawfully.
        </p>

        <ul>
          <li>
            Do not attempt to gain unauthorized access to the platform or
            its systems.
          </li>
          <li>
            Do not interfere with the operation, security, or availability
            of the platform.
          </li>
          <li>
            Do not submit malicious software, automated attacks, or harmful
            code.
          </li>
          <li>
            Do not impersonate another person or organization.
          </li>
          <li>
            Do not use the platform for fraudulent fundraising activities.
          </li>
          <li>
            Do not misuse information relating to beneficiaries, children,
            donors, volunteers, or other users.
          </li>
          <li>
            Do not use the platform for unlawful or abusive activities.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "campaign-information",
    title: "13. Campaign and Project Information",
    content: (
      <>
        <p>
          We make reasonable efforts to provide accurate information about
          campaigns, projects, fundraising targets, progress, and ministry
          activities.
        </p>

        <p>
          However, project circumstances, funding requirements, timelines,
          costs, availability, and other information may change.
        </p>

        <p>
          Campaign targets and displayed progress should not be interpreted
          as guarantees that a particular project will be completed within a
          specific timeframe.
        </p>
      </>
    ),
  },
  {
    id: "third-party-services",
    title: "14. Third-Party Services and Links",
    content: (
      <>
        <p>
          The platform may integrate with or contain links to third-party
          services, websites, payment providers, social media platforms,
          hosting services, communication services, or other external
          resources.
        </p>

        <p>
          Third-party services operate under their own terms and policies.
          Zengwa Mission Connect does not control and is not responsible for
          the content, availability, security, or practices of independent
          third-party services.
        </p>
      </>
    ),
  },
  {
    id: "availability",
    title: "15. Platform Availability",
    content: (
      <>
        <p>
          We aim to keep Zengwa Mission Connect available and reliable, but
          we do not guarantee uninterrupted or error-free operation.
        </p>

        <p>
          The platform may occasionally be unavailable because of
          maintenance, upgrades, technical problems, security incidents,
          telecommunications failures, hosting issues, or circumstances
          beyond our reasonable control.
        </p>
      </>
    ),
  },
  {
    id: "disclaimer",
    title: "16. Disclaimer",
    content: (
      <>
        <p>
          The platform and its content are provided for informational,
          fundraising, ministry, educational, and community engagement
          purposes.
        </p>

        <p>
          While we seek to provide accurate and useful information, we do not
          guarantee that all information will always be complete, current,
          accurate, or free from errors.
        </p>
      </>
    ),
  },
  {
    id: "limitation",
    title: "17. Limitation of Liability",
    content: (
      <>
        <p>
          To the extent permitted by applicable law, Zengwa Mission Connect
          and its representatives will not be liable for indirect,
          incidental, special, consequential, or unforeseeable losses arising
          from your use of the platform.
        </p>

        <p>
          Nothing in these Terms is intended to exclude or limit liability
          where doing so would be prohibited by applicable law.
        </p>
      </>
    ),
  },
  {
    id: "indemnification",
    title: "18. Indemnification",
    content: (
      <>
        <p>
          To the extent permitted by law, you agree to be responsible for
          losses, claims, liabilities, or reasonable costs arising from your
          unlawful use of the platform, violation of these Terms, or
          infringement of another person's rights.
        </p>
      </>
    ),
  },
  {
    id: "termination",
    title: "19. Suspension and Termination",
    content: (
      <>
        <p>
          We may suspend or terminate access to some or all platform
          features where reasonably necessary to protect users, beneficiaries,
          the organization, the platform, or its systems.
        </p>

        <p>
          We may also take action where a user violates these Terms,
          applicable law, safeguarding requirements, or platform security
          policies.
        </p>

        <p>
          Where appropriate, users may contact us to request clarification
          regarding a suspension or termination.
        </p>
      </>
    ),
  },
  {
    id: "privacy",
    title: "20. Privacy",
    content: (
      <>
        <p>
          Your use of the platform is also governed by our Privacy Policy,
          which explains how personal information may be collected, used,
          stored, protected, and shared.
        </p>

        <Link
          href="/privacy-policy"
          className="inline-flex mt-2 font-semibold text-primary hover:text-secondary transition-colors"
        >
          Read our Privacy Policy →
        </Link>
      </>
    ),
  },
  {
    id: "changes",
    title: "21. Changes to These Terms",
    content: (
      <>
        <p>
          We may update these Terms of Service from time to time to reflect
          changes in our services, platform functionality, organizational
          practices, or applicable legal requirements.
        </p>

        <p>
          Updated Terms will be published on this page. Your continued use
          of the platform after an updated version becomes effective may
          constitute acceptance of the revised Terms to the extent permitted
          by law.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "22. Governing Law",
    content: (
      <>
        <p>
          These Terms are intended to operate in accordance with applicable
          laws and regulations. Where applicable, disputes concerning the
          platform or these Terms should be addressed through the appropriate
          legal and dispute-resolution mechanisms.
        </p>

        <p>
          Where a specific governing jurisdiction or dispute-resolution
          process is formally adopted by Zengwa, it should be stated in this
          section and reflected in the organization's official legal
          documentation.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "23. Contact Us",
    content: (
      <>
        <p>
          If you have questions about these Terms of Service, a donation,
          sponsorship, volunteer activity, account, or another aspect of
          Zengwa Mission Connect, please contact us through our official
          contact channels.
        </p>

        <div className="mt-6 rounded-xl border border-border bg-muted/30 p-5">
          <p className="font-semibold text-foreground mb-2">
            Zengwa Mission Connect
          </p>

          <p className="text-muted-foreground text-sm">
            Terms of Service Enquiries
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

export default function TermsOfServicePage() {
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
                <FileText
                  size={38}
                  className="text-accent shrink-0"
                />

                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  Terms & Conditions
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-5 leading-tight">
                Terms of Service
              </h1>

              <p className="text-white/75 text-lg leading-relaxed max-w-2xl">
                These terms explain the rules and responsibilities that apply
                when using Zengwa Mission Connect and its fundraising,
                sponsorship, volunteer, and ministry services.
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
                <HeartHandshake
                  className="text-primary mb-3"
                  size={24}
                />

                <h2 className="font-bold text-foreground mb-1">
                  Responsible Giving
                </h2>

                <p className="text-sm text-muted-foreground">
                  Donations are intended to support legitimate campaigns,
                  projects, and ministry activities.
                </p>
              </div>

              <div className="p-5 border border-border rounded-2xl bg-background">
                <ShieldCheck
                  className="text-primary mb-3"
                  size={24}
                />

                <h2 className="font-bold text-foreground mb-1">
                  Safe Participation
                </h2>

                <p className="text-sm text-muted-foreground">
                  Users are expected to protect accounts, respect others, and
                  use the platform lawfully.
                </p>
              </div>

              <div className="p-5 border border-border rounded-2xl bg-background">
                <AlertCircle
                  className="text-primary mb-3"
                  size={24}
                />

                <h2 className="font-bold text-foreground mb-1">
                  Important Information
                </h2>

                <p className="text-sm text-muted-foreground">
                  Campaigns, projects, timelines, and platform features may
                  change as circumstances evolve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms content */}
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

              {/* Main terms */}
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

                        <div className="terms-content text-muted-foreground leading-8 space-y-4">
                          {section.content}
                        </div>
                      </section>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      By accessing or using Zengwa Mission Connect, you
                      acknowledge that you have read, understood, and agree
                      to these Terms of Service, subject to applicable law.
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