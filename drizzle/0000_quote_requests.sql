CREATE TABLE `quote_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`company_name` text NOT NULL,
	`phone_number` text NOT NULL,
	`job_title` text NOT NULL,
	`email_address` text NOT NULL,
	`service_required` text NOT NULL,
	`estimated_budget` text NOT NULL,
	`preferred_contact_method` text NOT NULL,
	`project_details` text NOT NULL,
	`consent_given` integer NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`submitted_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT `quote_requests_consent_given_check` CHECK (`consent_given` = 1),
	CONSTRAINT `quote_requests_status_check` CHECK (`status` in ('new', 'contacted', 'qualified', 'closed', 'spam'))
);
--> statement-breakpoint
CREATE INDEX `quote_requests_status_submitted_at_idx` ON `quote_requests` (`status`,`submitted_at`);
--> statement-breakpoint
CREATE INDEX `quote_requests_email_address_idx` ON `quote_requests` (`email_address`);
