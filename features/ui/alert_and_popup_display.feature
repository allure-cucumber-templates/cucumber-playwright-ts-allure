@demoQA @demoQA_popup @ui
Feature: UI: Popup management
    As a QA I wanna learn how to automate UI

    Background:
        Given I navigate to Demoqa Home page

 @demoQA_alerts @ui
    Scenario Outline: Check different alerts popins are displayed
        Given I navigate to the Alerts page
        When I select the alert "<AlertType>"
        Then I see the alert "<AlertType>"
        And I can close the alert popins "<AlertType>"

        Examples:
        |AlertType    |
        |SimpleAlert  |
        |TimedAlert   |
        |ConfirmAlert |
        |PromptAlert  |

@demoQA_modalDialogs @ui
    Scenario Outline: Check different modals dialogs popin are displayed
        Given I navigate to the Modal Dialogs page
        When I select the modal "<ModalType>"
        Then I see the modal popin "<ModalType>"

        Examples:
        |ModalType    |
        |Small modal  |
        |Large modal  |