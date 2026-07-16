import type { Metadata } from "next";
import Link from "next/link";
import { emailAddress, emailHref } from "../data/site";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms and Conditions | Word of Mouth",
  description: "Terms governing use of the Word of Mouth website.",
};

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link className={styles.back} href="/">← Back to Word of Mouth</Link>
        <h1>Terms and Conditions</h1>
        <p className={styles.updated}>Last updated: July 2026</p>

        <div className={styles.content}>
          <section>
            <h2>Using this website</h2>
            <p>You may use this website to learn about Word of Mouth, review selected work, read insights, and contact our team. Please do not misuse the site, attempt unauthorized access, or submit unlawful or misleading material.</p>
          </section>
          <section>
            <h2>Agency services</h2>
            <p>Website content is general information, not a binding service offer. Project scope, timing, fees, responsibilities, and deliverables are confirmed separately in an approved proposal or agreement.</p>
          </section>
          <section>
            <h2>Content and intellectual property</h2>
            <p>The Word of Mouth identity, website copy, artwork, and portfolio presentation are protected by applicable intellectual-property rules. Client names and marks remain the property of their respective owners.</p>
          </section>
          <section>
            <h2>External links</h2>
            <p>This website links to social platforms, maps, articles, and other third-party pages. Their availability, content, and privacy practices are controlled by their operators.</p>
          </section>
          <section>
            <h2>Contact</h2>
            <p>Questions about these terms can be sent to <a href={emailHref}>{emailAddress}</a>.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
