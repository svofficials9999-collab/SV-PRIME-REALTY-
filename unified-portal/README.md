# SV PRIME REALTY unified portal

Created by D. Srinivas. The existing app, showcase and private legacy CRM are not replaced by this release.

## Data boundaries

- The 329-project directory is research material, not current stock. 327 matched images include photographs, architectural renderings and interiors; 2 projects have no substitute image.
- Public property stock starts empty. Only owner-approved submissions appear. Publication review is not legal/title verification.
- A pending owner or agent can submit listings, but cannot publish. Only the administrator reviews accounts and publication.
- Property owners cannot see customer leads. Approved agents see only explicitly assigned leads. Customer consent covers follow-up by D. Srinivas and his assigned agent.
- Customer enquiries, listing submissions and role-scoped CRM records use server storage. Shortlists and saved searches are browser-local. There are no background alerts or market-wide inventory feeds.
- Legacy on-device leads are not automatically imported. Nothing is read from another person's browser.

## Security and operation

Passwords are salted PBKDF2-SHA256 hashes. Login sessions are server-side with HttpOnly, Secure, SameSite=Strict cookies, 8-hour expiry and CSRF checks. All SQL data uses bound parameters. Write endpoints enforce same-origin requests. Account and lead actions have a private audit log. Public results exclude submitter contact details. Account registration does not itself verify identity or ownership.

The one-time owner initialization endpoint requires the private SETUP_TOKEN environment secret and locks permanently once an owner exists. Never commit passwords, session values or this secret. .dev.vars and local databases are excluded from source control. Password recovery currently needs a trusted owner-assisted procedure; there is no automated reset email service.

Free service quotas apply. No paid plan or domain is required for the current deployment. Storage, request and database limits need review before wider rollout. Start with genuine property records and a small reviewed team, not unverified bulk imports.

## Remaining work

Real property collection and legal review, agent identity checks, old lead migration with review, broader field testing, scheduled backups, account recovery and independent security review, SMS/email verification and alerts if approved later. No independent penetration test or national-scale load certification is claimed.
