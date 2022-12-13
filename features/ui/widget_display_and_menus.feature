@demoQA @ui
Feature: UI: Widget display management
    As a QA I wanna learn how to automate UI

    Background:
        Given I navigate to Demoqa Home page

    @demoQA_accordian @ui
    Scenario Outline: Open only the selected accordian section on click
        Given I navigate to the Accordian page
        When I click on the section "<sectionVisible>"
        Then I see the sections "<sectionHidden>" are closed

        Examples:
        |sectionVisible|sectionHidden |
        | 1            | 2,3          |
        | 2            | 1,3          |      
        | 3            | 1,2          |

@demoQA_tabs @ui
    Scenario Outline: Navigate using in-page tab contents on click
        Given I navigate to the Tabs page
        When I select the tab "<TabName>"
        Then I see the tab change depending on "<TabName>" "<TabStatus>"

        Examples:
        |TabName  |TabStatus|
        |What     |Enabled|
        |Origin   |Enabled|
        |Use      |Enabled|
        |More     |Disabled|

@demoQA_menu @ui
Scenario: Navigate using in-page menu and sub-menu contents on hover
        Given I navigate to the Menu page
        When I hover over the main item 2 sub sub list
        Then I see my menu sub sub items


@demoQA_selectMenu @ui
Scenario: Fill all the select fields displayed
        Given I navigate to the Select Menu page
        When I fill the select fields
        Then I see my selections for each field

@demoQA_tooltips @ui
Scenario Outline: Display information tooltips on hover for designated element
        Given I navigate to the Tooltips page
        When I hover over "<TooltipElement>"
        Then I see the tooltip for "<TooltipElement>"

        Examples:
        |TooltipElement |
        |TooltipButton  |
        |TooltipField   |
        |TooltipText1    |
        |TooltipText2    |        