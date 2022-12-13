@demoQA @demoQA_Windows_tabs @ui
Feature: UI: Windows and tabs management
    As a QA I wanna learn how to automate UI

    Background:
      Given I navigate to Demoqa Home page
      And I navigate to the Browser Windows page
        
    @demoQA_Tabs @ui
    Scenario: Redirection to a new tab when clicking on "New Tab" button
        When I switch tab
        Then The new tab is opened

    @demoQA_Windows @ui
    Scenario: Redirection to a new window when clicking on "New Window" button
        When I switch windows
        Then The new windows is opened

    @demoQA_Windows @ui
    Scenario: Opening a new window with text when clicking on "New Window Message" button
        When I switch to new windows message
        Then The new windows message is opened
