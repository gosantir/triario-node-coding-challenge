import hubSpotService from '../services/hubSpotService.js';
import { printHeader } from '../utils/print-header.js';

// import mockContacs from '../data/mockContacts.json' with { type: 'json' };
import mockDeals from '../data/mockDeals.json' with { type: 'json' };

const commands = {
  'list-all-contact-names': async () => {
    printHeader('List All Contact Names');
    const response = await hubSpotService.getHubSpotContactNames();

    console.table(response)
  },
  'list-contacts-paginated': async () => {
    printHeader('List Contacts Paginated')
    const { results, after } = await hubSpotService.getHubSpotContacts();
    console.table(results)
    console.log('AfterId', after)
  },
  'create-contact': async () => {
    printHeader('Create Contact')
    const contactData = {
      firstname: 'Contact',
      lastname: 'Test',
      email: `contact.test.${Math.floor(Math.random() * 1000)}@hubspot.com`,
      phone: '+573100000001',
      country: 'Colombia',
      city: 'Bogotá',
      jobtitle: 'Software Engineer',
      company: 'Triario Company SAS',
    }
    const result = await hubSpotService.createHubSpotContact(contactData)
    console.log('Contact created successfully:', result)
  },
  'update-contact': async () => {
    printHeader('Update Contact')
    const contactId = '249291390049'; // Replace with the actual contact ID you want to update
    const contactData = {
      firstname: 'Updated',
      lastname: 'Contact',
      email: `updated.contact.${Math.floor(Math.random() * 1000)}@hubspot.com`,
      phone: '+573100000002',
      country: 'Colombia',
      city: 'Bogotá',
      jobtitle: 'Senior Software Engineer',
      company: 'Triario Company SAS',
    }
    const result = await hubSpotService.updateHubSpotContact(contactId, contactData)
    console.log('Contact updated successfully:', result)
  },
  'delete-contact': async () => {
    printHeader('Delete Contact')
    const contactId = '249777201573'; // Replace with the actual contact ID you want to delete
    const result = await hubSpotService.deleteHubSpotContact(contactId)
    console.log('Contact deleted successfully:', result)
  },
  'list-deals': async () => {
    printHeader('List Deals')
    const { results, after } = await hubSpotService.getHubSpotDeals();
    console.table(results)
    console.log('AfterId', after)
  },
  'create-deal': async () => {
    printHeader('Create Deal')
    const dealData = {
      "amount": "1500.00",
      "dealname": "New deal",
      "pipeline": "default",
      "dealstage": "contractsent",

    }
    const result = await hubSpotService.createHubSpotDeal(dealData)
    console.log('Deal created successfully:', result)
  },
  'update-deal': async () => {
    printHeader('Update Deal')
    const dealId = '65119400509'; // Replace with the actual deal ID you want to update
    const dealData = {
      "amount": "2000.00",
      "dealname": "Updated deal",
      "pipeline": "default",
      "dealstage": "closedwon",
    }
    const result = await hubSpotService.updateHubSpotDeal(dealId, dealData)
    console.log('Deal updated successfully:', result)
  },
  'delete-deal': async () => {
    printHeader('Delete Deal')
    const dealId = '65124425622'; // Replace with the actual deal ID you want to delete
    const result = await hubSpotService.deleteHubSpotDeal(dealId)
    console.log('Deal deleted successfully:', result)
  },
  'associate-contact-to-deal': async () => {
    printHeader('Associate Contact to Deal')
    const contactId = '249332045134'; // Replace with the actual contact ID you want to associate
    const dealId = '65122530304'; // Replace with the actual deal ID you want to associate
    const result = await hubSpotService.associateContactToDeal(contactId, dealId)
    console.log('Contact associated to deal successfully:', result)
  },
  'sync-contacts': async () => {
    printHeader('Sync Contacts with HubSpot')
    const { default: data } = await import('../data/mockContacts.json', { with: { type: 'json' } });

    const result = await hubSpotService.syncContactsWithHubSpot(data)
    console.log('Contacts synced successfully:', result)
  },
  // 'sync-deals': async () => {
  //   printHeader('Sync Deals with HubSpot')
  //   const { default: data } = await import('../data/mockContacts.json', { with: { type: 'json' } });

  //   const result = await hubSpotService.syncDealsWithHubSpot(data)
  //   console.log('Deals synced successfully:', result)
  // },
}


const command = process.argv[2];
if (commands[command]) {
  commands[command]();
} else {
  console.error('Invalid command. Please use one of the following: list-contacts');
}