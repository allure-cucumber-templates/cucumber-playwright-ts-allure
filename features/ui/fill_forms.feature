@demoQA @ui
@allure.label.suite:popup
@allure.label.parentSuite:UI
Feature: UI: Form management
    As a QA I wanna learn how to automate UI

    Background:
        Given I navigate to Demoqa Home page

 @demoQA_fillForm @ui
 Scenario: Fill a complete form using external json data
        Given I navigate to the Practice Form page
        When I fill the form using the data from my json dataset
        Then I see my submitted form in the popup with the correct values