@mysql @data @ignore
Feature: DATA: Connect to Database Mysql

Background:
  Given I use a MySQL container with database name as helloworld

Scenario: Retrieve version Mysql
  When I connect the MySQL instance
  Then I should get the name of the MySQL database as helloworld

