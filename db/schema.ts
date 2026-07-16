import { sql } from "drizzle-orm";
import { check, index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const quoteRequests = sqliteTable(
  "quote_requests",
  {
    id: text("id").primaryKey(),
    fullName: text("full_name").notNull(),
    companyName: text("company_name").notNull(),
    phoneNumber: text("phone_number").notNull(),
    jobTitle: text("job_title").notNull(),
    emailAddress: text("email_address").notNull(),
    serviceRequired: text("service_required").notNull(),
    estimatedBudget: text("estimated_budget").notNull(),
    preferredContactMethod: text("preferred_contact_method").notNull(),
    projectDetails: text("project_details").notNull(),
    consentGiven: integer("consent_given", { mode: "boolean" }).notNull(),
    status: text("status").notNull().default("new"),
    submittedAt: text("submitted_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("quote_requests_status_submitted_at_idx").on(table.status, table.submittedAt),
    index("quote_requests_email_address_idx").on(table.emailAddress),
    check("quote_requests_consent_given_check", sql`${table.consentGiven} = 1`),
    check(
      "quote_requests_status_check",
      sql`${table.status} in ('new', 'contacted', 'qualified', 'closed', 'spam')`,
    ),
  ],
);

export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type NewQuoteRequest = typeof quoteRequests.$inferInsert;
