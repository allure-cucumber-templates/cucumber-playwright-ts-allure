# AUTOMATION FRAMEWORK with TypeScript & Playwright
[![🖥 Run all Tests : Execution](https://github.com/allure-cucumber-templates/cucumber-playwright-ts-allure/actions/workflows/machine-all.yml/badge.svg)](https://github.com/allure-cucumber-templates/cucumber-playwright-ts-allure/actions/workflows/machine-all.yml)

## Description
This current repositoy is an automation framework **Behavior-driven development** (BDD) oriented  based and built to enable **Acceptance and Integration tests for both UI and backend**. It merges several technologies for anyone to build efficient scripts from scratch and runned within the CI/CD integration
You will find here working examples of how to use this automation framework.

For more information please refer to the documentation link below

## REPORTS

* [Access won github pages]()

# Usage

----
To add a module to your project, you can edit the **package.json** file

Start writing your tests into these directories :

* **features**: for QA to write the feature files
* **steps**: for dev to implement code relevant to feature
* **test_resources**: for data files and helper TS

---
You can only modify files into these three directories and package.json.
Other files (by example : conf directory) could be overwritten by the framework.
```
package.json
features/
    api/*.feature
    ui/*.feature
    data/*.feature
    perf/*.feature
steps/
    api/*.ts
    ui/*.ts
    common/*.ts          
test_resources/
    environment/
    page_objects/
    test_datas/{csv,json...}
```

---
### Commands

To know all commands available, run this command to display all options

```bash
EXECUTE_TYPE=local npm run # for headful mode (default)
EXECUTE_TYPE=CI npm run # for headless mode
```

In a classic usage, you should need only these commands :

```bash
  npm run tags [-- --tags="@tag1,@tag2"] # run tests with tags 
  npm run all:ui
  npm run all:data
  npm run all:api
  npm run all:all
  npm run allure:serve 
  npm run allure:generate    
```

When you want to select a custom tags, you can use this command :

You will select only UI features and @my-custom-tag
```bash
npm run all:ui -- --tags @my-custom-tag
```

Or be less selective and run all features with a custom tag
```bash
npm run tags -- --tags @my-custom-tag
```

---
!!! note
With Docker, the commands are the same whatever the technology.
The documentation is here : [Docker Usage](/dev/stacks/docker)

---
### Allure Reports

Locally for dev, it is nice to have real pretty output in the console.
So we need to disable Allure Reports Formater but for CI it is mandatory.

!!! info
Allure reports are generated only if you set locally.

    **USE_ALLURE=true** npm run ...


--- 
### Format before commit

Please use the format tasks before to commit

!!! warning
npm run format
