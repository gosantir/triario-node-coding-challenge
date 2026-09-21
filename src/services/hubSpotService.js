import contactRepository from '../repositories/contactRepository.js'
import dealsRepository from '../repositories/dealsRepository.js'
import associationsRepository from '../repositories/AssociationsRepository.js'

// returns an array of full names (firstname + lastname) for all contacts (handle pagination).
const getHubSpotContactNames = () => {
  return contactRepository.getAllContactNames()
}

// lists paginated contact details (with filter/paginationoptions).
const getHubSpotContacts = () => {
  return contactRepository.getContacts()
}

// creates a contact in HubSpot (POST).
const createHubSpotContact = (contactData) => {
  return contactRepository.create(contactData)
}

// updates contact properties (PATCH/PUT).
const updateHubSpotContact = (contactId, contactData) => {
  return contactRepository.update(contactId, contactData)
}

// deletes a contact (DELETE).
const deleteHubSpotContact = (contactId) => {
  return contactRepository.deleteContact(contactId)
}

// lists deals (with pagination).
const getHubSpotDeals = () => {
  return dealsRepository.getHubSpotDeals()
}

// creates a deal (POST) with properties.dealname, properties.amount, hs_pipeline, hs_stage.
const createHubSpotDeal = (dealData) => {
  return dealsRepository.createHubSpotDeal(dealData)
}

// updates a deal.
const updateHubSpotDeal = (dealId, dealData) => {
  return dealsRepository.updateHubSpotDeal(dealId, dealData)
}

// deletes a deal.
const deleteHubSpotDeal = (dealId) => {
  return dealsRepository.deleteHubSpotDeal(dealId)
}

const associateContactToDeal = (contactId, dealId) => {
  return associationsRepository.associateContactToDeal(contactId, dealId)
}

const syncContactsWithHubSpot = async (contacts) => {
  try {

    const emails = contacts.map(item => item.email)

    const { results, total = 0 } = await contactRepository.getContactsByEmail(emails)

    if (total === contacts.length) {
      console.log('Contacts already Synced')
      return 0
    }

    const syncedEmails = new Set(
      results.map((result) => result.properties?.email || result.email)
    )


    const contactsToCreate = contacts.filter(
      (contact) => !syncedEmails.has(contact.email)
    )


    return Promise.all(
      contactsToCreate.map((contact) => createHubSpotContact(contact))
    )

  } catch (error) {
    console.error('Error syncing contacts with HubSpot:')

  }



}

const syncDealsWithHubSpot = async (deals) => {
  const { results = [] } = await dealsRepository.getHubSpotDeals()

  if (results.length === deals.length) {
    console.log('Deals already Synced')
    return 0
  }

  const syncedDealNames = new Set(
    results.map((result) => result.dealName || result.dealname)
  )
  const dealsToCreate = deals.filter(
    (deal) => !syncedDealNames.has(deal.dealname)
  )

  return Promise.all(
    dealsToCreate.map((deal) => createHubSpotDeal(deal))
  )
}


export default {
  // COntact related methods
  getHubSpotContactNames,
  getHubSpotContacts,
  createHubSpotContact,
  updateHubSpotContact,
  deleteHubSpotContact,
  // Deal related methods
  getHubSpotDeals,
  createHubSpotDeal,
  updateHubSpotDeal,
  deleteHubSpotDeal,
  // Association related methods
  associateContactToDeal,
  // Sync methods
  syncContactsWithHubSpot,
  syncDealsWithHubSpot
}
