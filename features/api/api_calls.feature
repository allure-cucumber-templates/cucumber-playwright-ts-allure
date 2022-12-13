 @petStore_API @api
 @allure.label.suite:petstore
 @allure.label.parentSuite:APIs
 Feature: API: petstore api test

    @api @tag1
    Scenario: Create a new pet in petstore API
      When I create a new pet with ID "10" from my dataset in the database
      Then my pet with ID "10" is added to the pet database

    @api @tag2s
    Scenario: Search a pet in petstore API
      When I search my pet with ID "10" in the database
      Then I see my pet with ID "10" in the search results

    @api
    Scenario: Rename a pet in petstore API
      When I rename my pet having ID "10" with a new name "Doggo" in the database
      Then my pet with ID "10" is now named "Doggo" in the database

    @api
    Scenario: Delete a pet in petstore API
      When I delete my pet with ID "10" from the database
      Then my pet with ID "10" is deleted from the database