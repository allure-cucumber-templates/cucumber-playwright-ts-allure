@mssql  @data @ignore
Feature: DATA: Connect to Database MSSQL

Background:
  Given I use a MSSQL container

Scenario: Retrieve version MSSQL
  When I connect the MSSQL instance

