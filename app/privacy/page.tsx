import type { Metadata } from "next";
import Link from "next/link";
import { emailAddress, emailHref } from "../data/site";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Word of Mouth",
  description: "How Word of Mouth handles information submitted through this website.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link className={styles.back} href="/">← Back to Word of Mouth</Link>
        <h1>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: July 2026</p>

        <div className={styles.content}>
          <section>
            <h2>What we collect</h2>
            <p>When you request a quote, we collect the contact, company, service, budget, and project information you choose to provide. We also receive basic technical data needed to operate and protect the website.</p>
          </section>
          <section>
            <h2>How we use it</h2>
            <p>We use enquiry information to review your request, contact you, plan the next step, prevent misuse, and improve how we handle new business conversations. We do not sell enquiry data.</p>
          </section>
          <section>
            <h2>Storage and access</h2>
            <p>Submitted enquiries are stored in the website’s secured database and are available only to people and service providers who need access to respond or maintain the service. We retain information only for as long as it is reasonably needed for these purposes or required by law.</p>
          </section>
          <section>
            <h2>Your choices</h2>
            <p>You may ask us to review, correct, or delete information connected with your enquiry. Contact us at <a href={emailHref}>{emailAddress}</a> and include enough detail for us to identify the request.</p>
          </section>
          <section>
            <h2>Updates</h2>
            <p>We may update this policy when the website or our data practices change. The date at the top of this page shows the latest revision.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
