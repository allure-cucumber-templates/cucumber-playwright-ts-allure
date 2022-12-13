@demoQA @ui
Feature: UI: Drag and Drop management
    As a QA I wanna learn how to automate UI

    Background:
        Given I navigate to Demoqa Home page

@demoQA_dragAndDrop  @ui
Scenario: Drag and drop a draggable element into another
        Given I navigate to the Droppable page
        When I drag my element to the drop zone
        Then the drop zone changes color