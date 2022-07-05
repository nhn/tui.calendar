# Contributing to TOAST UI

First off, thanks for taking the time to contribute! 🎉 😘 ✨

The following is a set of guidelines for contributing to TOAST UI. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Reporting Bugs

Bugs are tracked as [GitHub issues](https://github.com/nhn/tui.calendar/issues). Search the issue list and try to reproduce on [demo](https://nhn.github.io/tui.calendar/latest/tutorial-00-calendar-app) before you create an issue. When you create an issue, please provide the following information by filling in the template.

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. Don't just say what you did, but explain how you did it. For example, if you moved the cursor to the end of a line, explain if you used a mouse or a keyboard.
* **Provide specific examples to demonstrate the steps.** Include links to files or GitHub projects, or copy/paste-able snippets, which you use in those examples. If you're providing snippets on the issue, use Markdown code blocks.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.

## Suggesting Enhancements

In case you want to suggest for TOAST UI Calendar, please follow this guideline to help maintainers and the community understand your suggestion.
Before creating suggestions, please check [issue list](https://github.com/nhn/tui.calendar/labels/Type:%20Enhancement) if there's already a request.

Create an issue and provide the following information:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps.** Include copy/paste-able snippets which you use in those examples, as Markdown code blocks.
* **Include screenshots and animated GIFs** which helps demonstrate the steps or point out the part of TOAST UI Calendar which the suggestion is related to.
* **Explain why this enhancement would be useful** to most TOAST UI users.
* **List some other applications where this enhancement exists.**

## First Code Contribution

Unsure where to begin contributing to TOAST UI? You can start by looking through these `document`, `good first issue` and `help wanted` issues:

* **document issues**: issues which should be reviewed or improved.
* **good first issues**: issues which should only require a few lines of code, and a test or two.
* **help wanted issues**: issues which should be a bit more involved than beginner issues.

## Pull Requests

### Development WorkFlow

- Set up your development environment
- Make change from a right branch
- Be sure the code passes `npm run lint`, `npm run test`, `npm run test:playwright`
- Make a pull request

### Development environment

- Prepare your machine Node.js 16+ and it's packages installed.
- Checkout to the right branch
- Install dependencies by `npm install`
- Start development by `npm run develop`
  - For wrappers, `npm run develop --workspace @toast-ui/react-calendar` or `npm run develop --workspace @toast-ui/vue-calendar`

### Make changes

#### Checkout a branch

- **main**: PR base branch. merge features, updates for next minor or major release.
- **v1**: Legacy version of the project.
- **gh-pages**: API docs, examples and demo

#### Check Code Style

Run `npm run lint` and make sure all the tests pass.  

#### Test

Run `npm run test` and verify all the tests pass.
If you are adding new commands or features, they must include tests.
If you are changing functionality, update the tests if you need to.

#### Commit

Follow our [commit message conventions](./docs/COMMIT_MESSAGE_CONVENTION.md).

### Yes! Pull request

Make your pull request, then describe your changes.

#### Title

Follow other PR title format on below.

```
    <Type>: Short Description (fix #111)
    <Type>: Short Description (fix #123, #111, #122)
    <Type>: Short Description (ref #111)
```

* capitalize first letter of Type
* use present tense: 'change' not 'changed' or 'changes'

#### Description

If it has related to issues, add links to the issues(like `#123`) in the description.
Fill in the [Pull Request Template](./docs/PULL_REQUEST_TEMPLATE.md) by check your case.

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to dl_javascript@github.com.

> This Guide is base on [atom contributing guide](https://github.com/atom/atom/blob/master/CONTRIBUTING.md), [CocoaPods](http://guides.cocoapods.org/contributing/contribute-to-cocoapods.html) and [ESLint](http://eslint.org/docs/developer-guide/contributing/pull-requests)

[demo]:https://nhn.github.io/tui.calendar/latest
