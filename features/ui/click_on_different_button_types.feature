@demoQA @demoQA_button_management @ui
@allure.label.suite:popup
@allure.label.parentSuite:UI
Feature: UI: Button_management
    As a QA I wanna learn how to automate UI

    Background:
        Given I navigate to Demoqa Home page

@demoQA_checkBox @ui
   Scenario: Display checkbox folders and sub-folders when checked 
       Given I navigate to the Checkbox page
       When I click on the checkboxes
       Then I see my toggles in the list

@demoQA_radioButton @ui
    Scenario Outline: Display radio button text when selected
        Given I navigate to the Radio Button page
        When I select the radio button "<RadioSelect>"
        Then I see the text change depending on "<RadioSelect>" "<Status>"

        Examples:
        |RadioSelect    |Status|
        |Yes            |Enabled|
        |Impressive     |Enabled|
        |No             |Disabled|

@demoQA_buttons @ui
    Scenario: Display button click when clicked on
        Given I navigate to the Buttons page
        When I click on all buttons
        Then I see the buttons have been clicked on

@demoQA_dynamic  @ui
    Scenario: Check dynamic elements change properties after 5 seconds
        Given I navigate to the dynamic elements page
        Then after "5" seconds, dynamic elements have changed
