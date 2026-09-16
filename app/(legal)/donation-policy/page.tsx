import type { Metadata } from "next";
import Link from "next/link";
import {
  HeartHandshake,
  ShieldCheck,
  Receipt,
  CreditCard,
} from "lucide-react";

import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Donation Policy | Zengwa Mission Connect",
  description:
    "Learn how donations to Zengwa Mission Connect are processed, allocated, managed, refunded, and reported.",
  alternates: {
    canonical: "/donation-policy",
  },
  openGraph: {
    title: "Donation Policy | Zengwa Mission Connect",
    description:
      "Information about donations, payments, refunds, campaign funds, receipts, and donor responsibilities at Zengwa Mission Connect.",
    type: "website",
  },
};

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <>
        <p>
          Zengwa Mission Connect is committed to ensuring that donations are
          handled responsibly, transparently, and in accordance with the
          purpose for which they are given.
        </p>

        <p>
          This Donation Policy explains how donations made through Zengwa
          Mission Connect may be processed, acknowledged, allocated,
          monitored, and managed.
        </p>

        <p>
          This policy should be read together with our{" "}
          <Link
            href="/privacy-policy"
            className="font-semibold text-primary hover:text-secondary transition-colors"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/terms-of-service"
            className="font-semibold text-primary hover:text-secondary transition-colors"
          >
            Terms of Service
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "donation-purpose",
    title: "2. Purpose of Donations",
    content: (
      <>
        <p>
          Donations received through Zengwa Mission Connect may support
          approved ministry, education, community development, child
          sponsorship, church, evangelization, outreach, infrastructure, and
          other charitable initiatives undertaken by Zengwa.
        </p>

        <p>
          Where a donor selects a specific campaign or project, we will make
          reasonable efforts to use the funds consistently with the stated
          purpose of that campaign or project.
        </p>

        <p>
          Donations may also contribute toward reasonable administrative,
          operational, payment-processing, or project-related expenses where
          applicable and where consistent with the organization's policies
          and applicable requirements.
        </p>
      </>
    ),
  },
  {
    id: "designated-donations",
    title: "3. Designated Donations",
    content: (
      <>
        <p>
          Donors may be able to designate their contributions toward a
          particular campaign, project, ministry, or fundraising initiative.
        </p>

        <p>
          We will make reasonable efforts to honor the donor's stated
          designation.
        </p>

        <p>
          However, circumstances may change after a donation is received.
          For example, a project may reach its target, become impractical,
          be completed, or no longer require the originally anticipated
          amount of funding.
        </p>

        <p>
          In such circumstances, funds may, where legally and operationally
          appropriate, be redirected toward a substantially similar purpose
          that supports the organization's mission.
        </p>
      </>
    ),
  },
  {
    id: "general-donations",
    title: "4. General Donations",
    content: (
      <>
        <p>
          A donor may choose to make a general donation without selecting a
          particular campaign or project.
        </p>

        <p>
          General donations may be allocated by Zengwa according to current
          organizational priorities and identified needs.
        </p>

        <p>
          This flexibility enables the organization to respond to changing
          circumstances and direct available resources toward areas where
          they can have meaningful impact.
        </p>
      </>
    ),
  },
  {
    id: "payment-methods",
    title: "5. Payment Methods",
    content: (
      <>
        <p>
          Zengwa Mission Connect may provide multiple methods for making
          donations, including:
        </p>

        <ul>
          <li>M-Pesa and other mobile-money services.</li>
          <li>Debit and credit cards.</li>
          <li>Bank transfers.</li>
          <li>PayPal or other supported payment providers.</li>
          <li>Other payment methods introduced through the platform.</li>
        </ul>

        <p>
          Availability of a particular payment method may depend on the
          donor's location, the payment provider, technical availability,
          and other factors.
        </p>
      </>
    ),
  },
  {
    id: "payment-processing",
    title: "6. Payment Processing",
    content: (
      <>
        <p>
          Donations made through third-party payment services may be
          processed by the relevant payment provider.
        </p>

        <p>
          Payment providers may apply their own terms, privacy policies,
          transaction limits, processing fees, verification requirements,
          and security procedures.
        </p>

        <p>
          Zengwa Mission Connect does not control third-party payment
          networks and cannot guarantee their uninterrupted availability.
        </p>

        <p>
          A donation is considered successfully submitted only after the
          relevant payment process has been successfully completed and
          confirmed.
        </p>
      </>
    ),
  },
  {
    id: "donation-receipts",
    title: "7. Donation Receipts",
    content: (
      <>
        <p>
          Where the platform supports donation receipts, a receipt may be
          generated after a successful donation.
        </p>

        <p>
          Donation receipts may include information such as the donor's
          name, donation amount, date, transaction reference, campaign, and
          payment method.
        </p>

        <p>
          Donors should retain their receipts for their own records.
        </p>

        <p>
          Receipt availability and format may depend on the payment method
          and information supplied by the donor.
        </p>
      </>
    ),
  },
  {
    id: "anonymous-donations",
    title: "8. Anonymous Donations",
    content: (
      <>
        <p>
          Where supported, donors may choose to make an anonymous donation
          for public-facing purposes.
        </p>

        <p>
          Selecting an anonymous option does not necessarily mean that the
          payment provider or Zengwa's authorized financial systems will
          have no record of the transaction.
        </p>

        <p>
          Transaction records may be retained where necessary for financial
          administration, security, fraud prevention, legal compliance, or
          auditing purposes.
        </p>
      </>
    ),
  },
  {
    id: "recurring-donations",
    title: "9. Recurring Donations",
    content: (
      <>
        <p>
          Where recurring donations are supported, a donor may authorize
          repeated contributions according to the selected schedule and
          payment method.
        </p>

        <p>
          Recurring donations may continue until cancelled, suspended,
          rejected by the payment provider, or otherwise terminated.
        </p>

        <p>
          Donors are responsible for ensuring that their payment details
          remain valid and that sufficient funds are available where
          applicable.
        </p>

        <p>
          If recurring donations are supported through a third-party
          provider, cancellation may also need to be completed through that
          provider.
        </p>
      </>
    ),
  },
  {
    id: "refunds",
    title: "10. Refunds",
    content: (
      <>
        <p>
          Donations are intended to be voluntary contributions and are
          generally not refundable once successfully processed.
        </p>

        <p>
          However, a refund request may be considered where there is a
          legitimate reason, such as:
        </p>

        <ul>
          <li>An unauthorized transaction.</li>
          <li>A duplicate transaction.</li>
          <li>A clear processing error.</li>
          <li>An incorrect amount caused by a technical issue.</li>
          <li>Another exceptional circumstance requiring review.</li>
        </ul>

        <p>
          Refund requests should be submitted as soon as possible and may
          require transaction information for verification.
        </p>
      </>
    ),
  },
  {
    id: "refund-process",
    title: "11. Refund Process",
    content: (
      <>
        <p>
          To request a refund, donors should contact Zengwa through the
          official contact channels and provide sufficient information to
          identify the transaction.
        </p>

        <p>
          We may request additional information to verify ownership of the
          transaction and prevent fraudulent refund requests.
        </p>

        <p>
          Where a payment provider is responsible for processing the
          transaction, the refund may also be subject to that provider's
          procedures and processing timelines.
        </p>
      </>
    ),
  },
  {
    id: "child-sponsorship",
    title: "12. Child Sponsorship Donations",
    content: (
      <>
        <p>
          Contributions made through child sponsorship programs are intended
          to support the educational, welfare, developmental, spiritual, and
          other approved needs associated with the sponsorship program.
        </p>

        <p>
          Sponsorship contributions are not payments made directly to a
          child and do not establish parental, guardianship, ownership, or
          other legal rights over a sponsored child.
        </p>

        <p>
          For safeguarding purposes, sponsors must respect the privacy,
          dignity, and safety of sponsored children and must not attempt to
          establish unauthorized private financial or personal arrangements
          with them.
        </p>
      </>
    ),
  },
  {
    id: "campaign-targets",
    title: "13. Campaign Targets and Progress",
    content: (
      <>
        <p>
          Fundraising campaigns may display a target amount, amount raised,
          percentage progress, deadline, or other campaign information.
        </p>

        <p>
          Displayed figures are intended to provide donors with a general
          understanding of campaign progress.
        </p>

        <p>
          Campaign targets, deadlines, and project costs may change based on
          actual circumstances, funding availability, supplier costs,
          project requirements, or other factors.
        </p>
      </>
    ),
  },
  {
    id: "excess-funds",
    title: "14. Funds Raised Above a Campaign Target",
    content: (
      <>
        <p>
          If a campaign receives contributions exceeding its stated target,
          excess funds may be applied toward additional costs associated with
          the campaign or toward a closely related organizational or ministry
          purpose.
        </p>

        <p>
          This approach allows Zengwa to continue supporting the intended
          beneficiaries and respond to needs that arise during or after the
          campaign.
        </p>
      </>
    ),
  },
  {
    id: "project-changes",
    title: "15. Changes to Projects or Campaigns",
    content: (
      <>
        <p>
          Projects and campaigns may be modified, postponed, merged, paused,
          or discontinued due to circumstances beyond the organization's
          reasonable control.
        </p>

        <p>
          Such circumstances may include changes in costs, availability of
          resources, regulatory requirements, emergencies, security
          considerations, or changes in community needs.
        </p>

        <p>
          Where a project cannot proceed as originally planned, available
          funds may be directed toward a related purpose consistent with the
          original intent where appropriate.
        </p>
      </>
    ),
  },
  {
    id: "donor-responsibilities",
    title: "16. Donor Responsibilities",
    content: (
      <>
        <p>
          Donors are responsible for ensuring that the information provided
          during a donation is accurate.
        </p>

        <p>
          Donors should review the selected campaign, donation amount,
          currency, and payment details before completing a transaction.
        </p>

        <p>
          Donors must not use the platform for fraudulent, unlawful,
          unauthorized, or otherwise improper transactions.
        </p>
      </>
    ),
  },
  {
    id: "fees",
    title: "17. Payment and Processing Fees",
    content: (
      <>
        <p>
          Depending on the payment method, transaction fees or other charges
          may be imposed by banks, mobile-money providers, card networks,
          payment processors, or other third parties.
        </p>

        <p>
          Where applicable, such fees may affect the amount ultimately
          received by the intended campaign or organization.
        </p>

        <p>
          Any platform-specific fee structure should be clearly displayed to
          donors before a transaction is completed.
        </p>
      </>
    ),
  },
  {
    id: "financial-transparency",
    title: "18. Financial Transparency",
    content: (
      <>
        <p>
          Zengwa is committed to responsible stewardship of funds received
          through its fundraising activities.
        </p>

        <p>
          Where appropriate, the organization may publish project updates,
          impact reports, financial summaries, photographs, stories, or other
          information showing how fundraising activities have contributed to
          ministry and community objectives.
        </p>

        <p>
          Public reports may not contain sensitive personal information about
          donors, children, beneficiaries, staff, or other individuals.
        </p>
      </>
    ),
  },
  {
    id: "donor-privacy",
    title: "19. Donor Privacy",
    content: (
      <>
        <p>
          Personal information provided during a donation is handled
          according to our Privacy Policy.
        </p>

        <p>
          We do not sell donor personal information.
        </p>

        <p>
          Information may be shared with authorized service providers where
          necessary to process payments, issue receipts, maintain records,
          provide support, prevent fraud, or operate the platform.
        </p>

        <Link
          href="/privacy-policy"
          className="inline-flex mt-2 font-semibold text-primary hover:text-secondary transition-colors"
        >
          Read the Privacy Policy →
        </Link>
      </>
    ),
  },
  {
    id: "fraud-prevention",
    title: "20. Fraud and Suspicious Transactions",
    content: (
      <>
        <p>
          Zengwa Mission Connect may monitor transactions and activities for
          security, fraud prevention, abuse prevention, and compliance
          purposes.
        </p>

        <p>
          Transactions may be delayed, reviewed, rejected, or cancelled where
          there are reasonable concerns regarding fraud, unauthorized use,
          suspicious activity, payment-provider requirements, or applicable
          legal obligations.
        </p>
      </>
    ),
  },
  {
    id: "tax",
    title: "21. Tax Considerations",
    content: (
      <>
        <p>
          Tax treatment of donations may differ depending on the donor's
          location, personal circumstances, applicable law, and the legal
          status of the organization.
        </p>

        <p>
          Donors are responsible for determining whether a donation is
          eligible for any tax deduction, exemption, or other benefit and
          should seek independent professional advice where necessary.
        </p>

        <p>
          Zengwa does not provide individual tax advice.
        </p>
      </>
    ),
  },
  {
    id: "policy-changes",
    title: "22. Changes to This Donation Policy",
    content: (
      <>
        <p>
          Zengwa Mission Connect may update this Donation Policy when its
          fundraising processes, payment methods, organizational practices,
          or applicable requirements change.
        </p>

        <p>
          The latest version will be published on this page together with
          the applicable effective date.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "23. Donation Enquiries",
    content: (
      <>
        <p>
          If you have questions about a donation, campaign, payment,
          sponsorship contribution, receipt, refund, or another fundraising
          matter, please contact Zengwa through the official contact
          channels.
        </p>

        <div className="mt-6 rounded-xl border border-border bg-muted/30 p-5">
          <p className="font-semibold text-foreground mb-2">
            Zengwa Mission Connect
          </p>

          <p className="text-sm text-muted-foreground">
            Donation and Fundraising Enquiries
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

export default function DonationPolicyPage() {
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
                <HeartHandshake
                  size={38}
                  className="text-accent shrink-0"
                />

                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  Giving & Stewardship
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-5 leading-tight">
                Donation Policy
              </h1>

              <p className="text-white/75 text-lg leading-relaxed max-w-2xl">
                Our commitment to responsible giving, transparent fundraising,
                secure payments, and faithful stewardship of every contribution.
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
                  Purposeful Giving
                </h2>

                <p className="text-sm text-muted-foreground">
                  Contributions support approved ministry, education,
                  sponsorship, and community initiatives.
                </p>
              </div>

              <div className="p-5 border border-border rounded-2xl bg-background">
                <ShieldCheck
                  className="text-primary mb-3"
                  size={24}
                />

                <h2 className="font-bold text-foreground mb-1">
                  Secure Donations
                </h2>

                <p className="text-sm text-muted-foreground">
                  Donations are processed through supported and authorized
                  payment channels.
                </p>
              </div>

              <div className="p-5 border border-border rounded-2xl bg-background">
                <Receipt
                  className="text-primary mb-3"
                  size={24}
                />

                <h2 className="font-bold text-foreground mb-1">
                  Clear Records
                </h2>

                <p className="text-sm text-muted-foreground">
                  Where supported, successful donations can receive
                  transaction records and receipts.
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

                        <div className="donation-content text-muted-foreground leading-8 space-y-4">
                          {section.content}
                        </div>
                      </section>
                    ))}
                  </div>

                  {/* Final notice */}
                  <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      By making a donation through Zengwa Mission Connect,
                      you acknowledge that you have read and understood this
                      Donation Policy.
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