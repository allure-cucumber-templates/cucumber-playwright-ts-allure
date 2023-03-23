@demoQA @ui
Feature: UI: Widget input management
    As a QA I wanna learn how to automate UI

    Background:
        Given I navigate to Demoqa Home page

@demoQA_autoComplete @ui
Scenario: Check suggestions when using autocomplete on input field
        Given I navigate to the Auto Complete page
        When I type "Bl" in the field
        Then I see "Blue" and "Black" in my suggestions
        And the selected suggestion is added to the field

@demoQA_date @ui
Scenario: Checking a date via date picker using input field
        Given I navigate to Date Picker page
        When I type "10/10/2022" in the Select Date field
        Then the date picked is "Monday, October 10th, 2022"

@demoQA_date @ui 
Scenario: Checking a date via date picker using calendar module
        Given I navigate to Date Picker page
        When I select "12/23/2024/17:00" in Date And Time calendar
        Then the date picked is "December 23, 2024 5:00 PM" in the field

@demoQA_slider @ui
Scenario: Change input value by moving the slider
        Given I navigate to Slider page
        When I drag the slider
        Then the field value changes

@demoQA_slider @ui
Scenario: Change input value by clicking on the slider bar
        Given I navigate to Slider page
        When I click on the slider bar
        Then the slider value changes

@demoQA_progressBar @ui
Scenario: Click on "Start" to fill up the progress bar
        Given I navigate to the Progress Bar page
        When I click on the start button
        Then I see the progress bar filling

@demoQA_progressBar @ui
    Scenario: Click on "Stop" to stop the progress bar from filling
        Given I navigate to the Progress Bar page
        When I click on the stop button while the progress bar is filling
        Then I see the progress bar has stopped

@demoQA_progressBar @ui
Scenario: The button "Reset" is visible after the progress bar is at 100%
        Given I navigate to the Progress Bar page
        When I click on the start button
        Then at 100% the progress bar stops
        And the button "Reset" is visible