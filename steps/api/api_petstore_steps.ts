import { Given, Then, When } from '@cucumber/cucumber';
import * as functions from '../../test_resources/page_objects/pet_store_api/pet_store_api_functions';

When(
  'I create a new pet with ID {string} from my dataset in the database',
  async function (petID: string) {
    await functions.addPet(petID);
  },
);

Then('my pet with ID {string} is added to the pet database', async function (petID: string) {
  await functions.checkResponsePetId(petID);
});

When('I search my pet with ID {string} in the database', async function (petID: string) {
  await functions.getPet(petID);
});

Then('I see my pet with ID {string} in the search results', async function (petID: string) {
  await functions.checkResponsePetId(petID);
});

When(
  'I rename my pet having ID {string} with a new name {string} in the database',
  async function (petID: string, petName: string) {
    await functions.updatePet(petID, petName);
  },
);

Then(
  'my pet with ID {string} is now named {string} in the database',
  async function (petID: string, petName: string) {
    await functions.checkResponsePetId(petID);
    await functions.checkResponsePetName(petName);
  },
);

When('I delete my pet with ID {string} from the database', async function (petID: string) {
  await functions.deletePet(petID);
  await functions.checkResponseStatus(200);
});

Then('my pet with ID {string} is deleted from the database', async function (petID: string) {
  await functions.getPet(petID);
  await functions.checkResponseStatus(404);
});
