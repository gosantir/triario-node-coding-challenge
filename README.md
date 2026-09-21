# HubSpot CRM Node.js Technical Test

Node.js ESM application for managing HubSpot CRM contacts, deals, and contact-to-deal associations. The project also includes standalone examples covering callbacks, async/await, and streams.

## Architecture

- `src/clients`: Shared Axios client for HubSpot authentication and HTTP requests.
- `src/config`: Environment-based configuration.
- `src/repositories`: Endpoint-specific contact, deal, and association operations.
- `src/services`: Business workflows, including synchronization.
- `src/examples`: CLI entry point for HubSpot demonstrations.
- `src/fundamentals`: Node.js asynchronous programming examples.
- `src/data`: Mock contacts and deals for synchronization examples.
- `src/utils`: Shared CLI utilities.

Repositories isolate HubSpot API details; the service layer coordinates business logic and synchronization.

## Requirements

- Node.js `20.6+`
- HubSpot developer account
- HubSpot Private App access token

## Installation and Setup

```bash
npm install
```

Copy `.env.example` to `.env` and configure the local environment:

```env
HUBSPOT_ACCESS_TOKEN=your_private_app_access_token
MAX_RETRIES=3
RETRY_DELAY_MS=1000
PAGE_SIZE=100
```

`HUBSPOT_ACCESS_TOKEN` is required. `MAX_RETRIES`, `RETRY_DELAY_MS`, and `PAGE_SIZE` control retry behavior and pagination. Do not commit `.env` or expose the access token.

## HubSpot Private App

Create a HubSpot Private App and grant these scopes:

- `crm.objects.contacts.read`
- `crm.objects.contacts.write`
- `crm.objects.deals.read`
- `crm.objects.deals.write`
- Association write access for contact-to-deal relationships

The application authenticates with a Bearer token. Use a dedicated test portal or test records because the examples can modify real CRM data.

## Node.js Fundamentals

```bash
node src/fundamentals/callbacks.js
node src/fundamentals/asyncAwait.js
node src/fundamentals/streams.js
node src/fundamentals/main.cjs
```

These examples demonstrate callbacks, Promises and async/await, file operations, parallel execution, streams, and CommonJS/ESM interoperability.

## HubSpot Examples

```bash
npm run list-all-contact-names
npm run list-contacts-paginated
npm run create-contact
npm run update-contact
npm run delete-contact

npm run list-deals
npm run create-deal
npm run update-deal
npm run delete-deal

npm run associate-contact-to-deal
npm run sync-contacts
```

The commands use the configured HubSpot account. The update, delete, and association examples use IDs defined in the CLI example and may need to be replaced with valid test-record IDs.

## Implemented HubSpot Endpoints

### Contacts

- `GET /crm/v4/objects/contacts` - list contacts and contact names
- `POST /crm/objects/2026-09/contacts/search` - search contacts by email
- `POST /crm/v4/objects/contacts` - create a contact
- `PATCH /crm/v4/objects/contacts/{contactId}` - update a contact
- `DELETE /crm/v4/objects/contacts/{contactId}` - delete a contact

### Deals

- `GET /crm/v4/objects/deals` - list deals
- `POST /crm/v4/objects/deals` - create a deal
- `PATCH /crm/v4/objects/deals/{dealId}` - update a deal
- `DELETE /crm/v4/objects/deals/{dealId}` - delete a deal

### Associations

- `PUT /crm/objects/{apiVersion}/contacts/{contactId}/associations/deals/{dealId}` - associate a contact with a deal

Official references:

- [CRM Contacts API](https://developers.hubspot.com/docs/api-reference/crm-contacts-v3/guide)
- [CRM Deals API](https://developers.hubspot.com/docs/api-reference/crm-deals-v3/guide)
- [CRM Search API](https://developers.hubspot.com/docs/api-reference/search/guide)
- [CRM Associations API](https://developers.hubspot.com/docs/api-reference/crm-associations-v4/guide)
- [HubSpot Private Apps](https://developers.hubspot.com/docs/api/private-apps)

## Error Handling and Reliability

- Input validation prevents invalid repository calls.
- Cursor-based pagination follows HubSpot's `paging.next.after` value until all pages are processed.
- Transient `429` rate-limit responses and `5xx` server responses are retried with a bounded policy.
- Retry count and delay are controlled by `MAX_RETRIES` and `RETRY_DELAY_MS`; exhausted retries and permanent errors are propagated to the caller.
- Authentication, validation, and other non-transient API errors are not retried indefinitely and are reported at the service or CLI boundary.

## Synchronization

Contact synchronization searches HubSpot using the input email addresses, compares returned emails with the input contacts, returns early when all contacts already exist, and creates only missing contacts. Email is treated as the contact identity key.

Deal synchronization retrieves existing deals, compares their names with the input deals, returns early when all deals are present, and creates only missing deals. Deal name is used as the identity key because the input data does not provide an external deal ID.

Synchronization is create-only: existing records are not overwritten.

## Technical Decisions and Assumptions

- Native ESM is used through the package's `"type": "module"` configuration.
- Axios is centralized in one client so authentication, base URL, timeouts, logging, retries, and errors are handled consistently.
- Repository modules keep endpoint details separate from service-level workflows.
- Environment variables keep credentials and operational settings outside source control.
- Contact emails and deal names are assumed to be unique within each synchronization input.
- API versioned paths follow the endpoints used by the test implementation and should be updated if HubSpot changes or deprecates them.
