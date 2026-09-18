import client from '../clients/hubSpotClient.js';
import config from '../config/index.js';

const BASE_PATH = '/crm/v3/objects/deals';
const DEFAULT_PROPERTIES = [
  'dealname',
  'amount',
  'dealstage',
  'pipeline',
  'closedate',
  'hubspot_owner_id',
]

async function associateContactToDeal(options = {}) {
}

export default {
  associateContactToDeal,
  syncContactsWithHubSpot,
  syncDealsWithHubSpot,
}