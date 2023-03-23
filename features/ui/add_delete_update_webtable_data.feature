@demoQA @demoQA_inputs @ui
Feature: UI: Elements inputs management
    As a QA I wanna learn how to automate UI

    Background:
        Given I navigate to Demoqa Home page

 @demoQA_web_table1 @ui
     Scenario: Add a new entry to web table
        Given I navigate to the Web Table page
        When I add the following entry to the webtable first Name:"ZIED", last name:"RAISSI", email:"test@gmail.com", age:"30", salary: "300", department:"QA"
        Then my entry is added to the web table

 @demoQA_web_table2 @ui
     Scenario: Edit the first entry in the web table
        Given I navigate to the Web Table page
        When I edit the first entry to the webtable first Name:"ZIED", last name:"RAISSI", email:"test@gmail.com", age:"30", salary: "300", department:"QA"
        Then the first entry has been edited
        
 @demoQA_web_table3 @ui
     Scenario: Delete the third entry in the web table
        Given I navigate to the Web Table page
        When I delete the third entry in the web table
        Then the third entry has been deleted

    @demoQA_web_table4 @ui
     Scenario: Search Kierra entry in the web table
        Given I navigate to the Web Table page
        When I search the entry "Kierra" in the web table
        Then only my entry appears in the search results

@demoQA_uploadDownload @ui
Scenario: Upload a file and check file path
        Given I navigate to the Upload and Download page
        When I upload my file
        Then I see my uploaded file path

@demoQA_uploadDownload @ui
Scenario: Download a file online
        Given I navigate to the Upload and Download page
        When I download a file
        Then my file has been downloaded