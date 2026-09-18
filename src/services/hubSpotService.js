import contactRepository from '../repositories/contactRepository.js';
import dealsRepository from '../repositories/dealsRepository.js';

// returns an array of full names (firstname + lastname) for all contacts (handle pagination).
const getHubSpotContactNames = () => {
  return contactRepository.getAllContactNames();
}

// lists paginated contact details (with filter/paginationoptions).
const getHubSpotContacts = () => {
  return contactRepository.getContacts();
}

// creates a contact in HubSpot (POST).
const createHubSpotContact = (contactData) => {
  return contactRepository.create(contactData);
}

// updates contact properties (PATCH/PUT).
const updateHubSpotContact = (contactId, contactData) => {
  return contactRepository.update(contactId, contactData);
}

// deletes a contact (DELETE).
const deleteHubSpotContact = (contactId) => {
  return contactRepository.deleteContact(contactId);
}

// lists deals (with pagination).
const getHubSpotDeals = () => {
  return dealsRepository.getHubSpotDeals();
}

// creates a deal (POST) with properties.dealname, properties.amount, hs_pipeline, hs_stage.
const createHubSpotDeal = (dealData) => {
  return dealsRepository.createHubSpotDeal(dealData);
}

// updates a deal.
const updateHubSpotDeal = (dealId, dealData) => {
  return dealsRepository.updateHubSpotDeal(dealId, dealData);
}

// deletes a deal.
const deleteHubSpotDeal = (dealId) => {
  return dealsRepository.deleteHubSpotDeal(dealId);
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
  deleteHubSpotDeal
}
