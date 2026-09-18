import client from '../clients/hubSpotClient.js';
import config from '../config/index.js';

const BASE_PATH = '/crm/v3/objects/contacts'
const DEFAULT_PROPERTIES = ['firstname', 'lastname', 'email', 'phone', 'company']

async function getAllContactNames(options = {}) {
  const params = {
    ...options,
    properties: 'firstname, lastname',
    limit: config.pageSize
  }

  const allContacts = []
  let after = null

  do {
    const { results = [], paging = null } = await client.get(BASE_PATH, { ...params, after })
    const resultsMapped = results.map((item) => ({
      id: item.id,
      fullName: `${item.properties.firstname || ''} ${item.properties.lastname || ''}`,
    }))

    allContacts.push(...resultsMapped)

    after = paging?.next?.after
  } while (after)


  return allContacts
}

const getContacts = async (options = {}) => {
  const params = {
    ...options,
    properties: DEFAULT_PROPERTIES.join(','),
    limit: config.pageSize
  }

  const { results = [], paging = null } = await client.get(BASE_PATH, params)

  const resultsMapped = results.map((item) => {
    const { id, properties } = item
    return { id, firstName: properties.firstname || '', lastName: properties.lastname || '', email: properties.email || '', phone: properties.phone || '', company: properties.company || '' }
  })

  return {
    results: resultsMapped,
    after: paging?.next?.after || null,
  }

}

const create = async (contactData) => {
  if (!contactData || typeof contactData !== 'object') {
    throw new Error('Invalid contact data. Please provide a valid object.');
  }
  const response = await client.post(BASE_PATH, { properties: contactData });
  return response.id;
}

const update = async (contactId, contactData) => {
  if (!contactId) {
    throw new Error('Contact ID is required for updating a contact.');
  }
  if (!contactData || typeof contactData !== 'object') {
    throw new Error('Invalid contact data. Please provide a valid object.');
  }
  const response = await client.patch(`${BASE_PATH}/${contactId}`, { properties: contactData });
  return response.id;
}

const deleteContact = async (contactId) => {
  if (!contactId) {
    throw new Error('Contact ID is required for deleting a contact.');
  }
  const response = await client.del(`${BASE_PATH}/${contactId}`);
  return response;
}

export default {
  getAllContactNames,
  getContacts,
  create,
  update,
  deleteContact
}