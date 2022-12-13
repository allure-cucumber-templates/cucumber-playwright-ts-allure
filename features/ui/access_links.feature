@demoQA @demoQA_links_management @ui
@allure.label.suite:popup
@allure.label.parentSuite:UI
Feature: UI: Links_management
    As a QA I wanna learn how to automate UI

    Background:
        Given I navigate to Demoqa Home page

    @demoQA_links @ui
    Scenario: Redirection to a new page when clicking on link (tabs and windows)
        Given I navigate to the Links page
        When I access the link
        Then I am redirected to a new page

    @demoQA_link @ui
    Scenario Outline: Check API response by clicking on links
        Given I navigate to the Links page
        When I access the api link "<apilink>"
        Then I see the response "<apiresponse>"
        Examples:
        |apilink      |apiresponse    |
        |Created      |201            |
        |No Content   |204            |
        |Moved        |301            |
        |Bad Request  |400            |
        |Unauthorized |401            |
        |Forbidden    |403            |
        |Not Found    |404            |

 @demoQA_brokenLinks @ui
    Scenario: Check broken links returns an error 500
        Given I navigate to the Broken Links page
        When I check the broken link
        Then my link returns an error

    