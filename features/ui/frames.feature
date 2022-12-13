@demoQA @demoQA_frame @ui @ignore
Feature: UI: Frame management
    As a QA I wanna learn how to automate UI

    Background:
        Given I navigate to Demoqa Home page

@demoQA_frames @ui
Scenario: Check multiple frames are displayed properly
      Given I navigate to the Frames page
      When I check the frames
      Then I see 2 frames


@demoQA_nestedFrames @ui
Scenario: Check frames nested are displayed properly
      Given I navigate to the Nested Frames page
      When I check the frames
      Then I see 2 nested frames