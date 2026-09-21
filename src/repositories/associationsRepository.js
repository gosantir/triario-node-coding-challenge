import client from '../clients/hubSpotClient.js';

async function associateContactToDeal(contactId, dealId) {
  const url = `/crm/objects/2026-09/contacts/${contactId}/associations/deals/${dealId}`

  const payload = [
    {
      associationCategory: 'HUBSPOT_DEFINED',
      associationTypeId: 4,
    },
  ];

  const response = await client.put(url, payload)
  return response
}

export default {
  associateContactToDeal,
}