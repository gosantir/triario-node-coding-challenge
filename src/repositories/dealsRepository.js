import client from '../clients/hubSpotClient.js';
import config from '../config/index.js';

const BASE_PATH = '/crm/v4/objects/deals';
const DEFAULT_PROPERTIES = [
  'dealname',
  'amount',
  'dealstage',
  'pipeline',
  'closedate',
  'hubspot_owner_id',
]

async function getHubSpotDeals(options = {}) {
  const params = {
    ...options,
    properties: DEFAULT_PROPERTIES.join(','),
    limit: config.pageSize
  }

  const { results = [], paging = null } = await client.get(BASE_PATH, params)

  const resultsMapped = results.map((item) => {
    const { id, properties } = item
    return { id, dealName: properties.dealname || '', amount: properties.amount || '', dealStage: properties.dealstage || '', pipeline: properties.pipeline || '', closeDate: properties.closedate || '', hubspotOwnerId: properties.hubspot_owner_id || '' }
  })

  return {
    results: resultsMapped,
    after: paging?.next?.after || null,
  }
}

async function createHubSpotDeal(dealData) {
  const { data } = await client.post(BASE_PATH, { properties: dealData })
  return data
}

async function updateHubSpotDeal(dealId, dealData) {
  const { data } = await client.patch(`${BASE_PATH}/${dealId}`, { properties: dealData })
  return data
}

async function deleteHubSpotDeal(dealId) {
  const { data } = await client.del(`${BASE_PATH}/${dealId}`)
  return data
}

export default {
  getHubSpotDeals,
  createHubSpotDeal,
  updateHubSpotDeal,
  deleteHubSpotDeal
}