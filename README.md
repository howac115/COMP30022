# ExPortfolio

[![standard-readme compliant](https://api.travis-ci.com/howac115/COMP30022.svg?token=J4ZPsoMp7ebKr4DtszSg&branch=master&status=passed)](https://travis-ci.com/github/howac115/COMP30022)

## Table of Contents

-   [Documents](#documents)
-   [Install](#install)
-   [Usage](#usage)
-   [Test](#test)
-   [Key Algorithms](#key-algorithms)
    -   [Chatbot](#chatbot)
    -   [Path Protection](#path-protection)
    -   [Email](#email)
    -   [Fuzzy Search](#fuzzy-search)
-   [Key Classes](#key-classes)
    -   [Text Editor](#text-editor)
    -   [User Portfolios Management](#user-portfolios-management)
    -   [Templates](#templates)
-   [Database Structure](#database-structure)
    -   [User](#user)
    -   [Portfolio](#portfolio)
-   [Contribution](#contribution)
-   [License](#license)

## Documents

-   The [Product(ExPortfolio) Instructions](doc/instruction.pdf) for how to use our web application.
-   A [User Story](doc/product-backlog.pdf) contains all functionalities that intended to achieve.
-   A [Software Architecture](doc/architecture.pdf) you can use to see our app's architecture.
-   An [API Documents](doc/api.pdf) to track all the APIs.

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
$ npm install
$ cd client
$ npm install
$ cd ..
```

## Usage

The front end will run port 3000 and the back end will run at port 5000 concurrently.

```sh
$ npm run dev
# open http://localhost:3000 to view it in the browser.
```

## Test

Run the test cases for the backend, this is automatically done every time right after pushing new code to GitHub.\
This is done by Travis CI, which built up a CI/CD automatic pipeline for this project.\
To learn more, see https://travis-ci.com/

```sh
$ npm run test
# prints out test case and outcome.
```

Test cases are designed to test mainly backend functions using Mocha/Chai. Those are polished up for\
corner cases testing, which also involves the automatic database cleaning mechanism to
prevent the database from being overloaded by test data.
To learn more about how test cases are designed, check out

```
├── COMP30022
│    └── test
│         └── auth_user_test.js 
│         └── folio_test.js 
```

## Key Algorithms

Demonstration of some key algorithms that used in the ExPortfolio Systems.

- ### Path Protection

  Path protection is achieved by comparing parameters of user id on URL and user id that is currently logged in. Protected sites will be redirected to login page if other users try to access sites by simply changing the URL, for example, by changing portfolio mode of other portfolio from "view" to "edit". Sites that being protected include: portfolio edit page, user settings page.

- ### Fuzzy Search

  Fuzzy search is utilised in the template searching. User can simply type part of a word to match some outcomes.

  For instance, "Ex" can match both "exportfolio", "Exportfolio", "Ex Portfolio" and of course "Ex".

- ### Chatbot

  Chatbot is presented in user's home page, when user wants to learn about this web app.\
   The chatbot should provide some useful information. This is achieved using a React JS library
  called react-simple-chatbot.\
   To learn more, check this out: https://lucasbassetti.com.br/react-simple-chatbot/<br><br>

## Key Classes

Some key classes for important functionalities.

- ### Text Editor

  We use [Sun Editor](http://suneditor.com/sample/index.html) to implement the user's e-portfolio pages and templates.

  This editor is a lightweight, flexible, customizable text editor for web applications.

  The configurations of this editor that used in our application can be found in following path.

```
├── COMP30022
│    └── client
│         └── src
│              └── components
│                   └── SunEditor.js
```

- ### User Portfolios Management

  User's portfolios are displayed as cards implemented using [Ant Design](https://ant.design/components/card/). 

  Each portfolio will have four buttons displayed at the bottom of the card: settings, edit, view and share. Settings button is implemented as a dropdown list with several more options: change visibility of portfolio to other users, change whether to share portfolio as template and to delete the current portfolio. 

  Below is the path to the file where configurations will take place.

  ```
  ├── COMP30022
  │    └── client
  │         └── src
  │              └── pages
  │                   └── folioList.js
  ```

- ### Templates

  Similarly to user's portfolios, templates portfolios are displayed as cards using the same design, except with few options at the bottom.

  Each portfolio in template page will have three basic options: view, share and clone to user's portfolios if that portfolio belongs to another user. However, if the user is not logged in or the folio in template page belongs to user, clone button will not show up.

  Path to the file for future configurations is shown below.

  ```
  ├── COMP30022
  │    └── client
  │         └── src
  │              └── pages
  │                   └── template.js
  ```

- ### Email

  The email functionality is achieved through the utilization of module of [Nodemailer](https://nodemailer.com/about/) with zero dependencies which makes the installation and implementation much easier. 

  In terms of preparation, a email account set to less secure app access is required so that  sending emails will not require manual verification. Configurations can be found in following path.

  ```
  ├── COMP30022
  │    └── controllers
  │         └── emailController.js
  ```

  Below is the snippet of code if modification will be made.

  ```javascript
  const output = `<p>${message}</p>`;
  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "exportfolio.notify@gmail.com",
      pass: "bountyprogrammers",
    },
  });
  
  // setup email data with unicode symbols
  let mailOptions = {
    from: "exportfolio.notify@gmail.com", // sender address
    to: receiver, // list of receivers
    subject: "Exportfolio: A user has enquired for your information!", // Subject line
    html: output, // html body
  };
  ```

  

## Database Structure

-   **User**

| Property     | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| firstName    | String type, created through user controller, first name of user |
| lastName     | String type, created through user controller, last name of user |
| email        | String type, created through user controller, email address of user |
| password     | String type, created through user controller, password of user account |
| emailConsent | Boolean type, consent of other people send email to current user |

```javascript
 {
 	 "_id":{"$oid":"5f70e313c5df74000812edb0"},
	 "firstName":"Hao Qi",
	 "lastName":"Chen",
	 "email":"haoqic@student.unimelb.edu.au",
	 "password":"$2a$10$QuL0yJjlKwPPebxc/mWMMebIt2km.Oq2c3UoVj5Y14KROS9NZHwV.",
	 "__v":0,
	 "emailConsent":false
 }
```

-   **Portfolio**

| Property        | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| name            | String type, created through folio controller, name of portfolio |
| user            | User ID obtained, finding current user in portfolio controller |
| createdAt       | Date type, record the first time that current portfolio has been created |
| updatedAt       | Date type, can be updated through user's portfolio page, record last update time |
| shareAsTemplate | Boolean type, consent of if current portfolio has been shared as template |
| visible         | Boolean type, consent of if current portfolio can be seen by other users |

```javascript
 {
	 "_id":{"$oid":"5f6b1356ff6a530d3e8d1a45"},
	 "name":"My skills",
	 "user":{"$oid":"5f5a48e1e746ca001727ea51"},
	 "createdAt":{"$date":"2020-09-23T09:20:22.701Z"},
	 "updatedAt":{"$date":"2020-09-30T14:09:02.337Z"},
	 "__v":0,
	 "shareAsTemplate":false,
	 "visible":false
 }
```

- **Entity Relationship Diagram**

![image-20201106201503651](doc\entity relationship diagram.png)

## Deployment

- ### Heroku

  Heroku is the platform where Exportfolio is running on. It is well set up
  to take upgrades from github Master branch automatically.
  Heroku Deployment Address: https://exportfolio.herokuapp.com/

- ### MongoDB

  MongoDB is our backend database server(NoSQL). It is designed to hold two
  collections as discussed in [Database Structure](#database-structure).

## Contributors

This project exists thanks to all the people who contribute.

<table>
  <tr>
    <td align="center"><a href="https://github.com/HarryHaoyuan"><img src="https://avatars1.githubusercontent.com/u/61959614" width="120px;" alt=""/><br /><sub><b>Haoyuan Yu</b></sub></a></td>
    <td align="center"><a href="https://github.com/howac115"><img src="https://avatars0.githubusercontent.com/u/39285061" width="120px;" alt=""/><br /><sub><b>Haoqi Chen</b></sub></a></td>
    <td align="center"><a href="https://github.com/matthewkkkk"><img src="https://avatars3.githubusercontent.com/u/53592281" width="120px;" alt=""/><br /><sub><b>Tianze Liu</b></sub></a></td>
    <td align="center"><a href="https://github.com/PeiyuOwO"><img src="https://avatars2.githubusercontent.com/u/56665146" width="120px;" alt=""/><br /><sub><b>Peiyu Wu</b></sub></a></td>
    <td align="center"><a href="https://github.com/yutaow97"><img src="https://avatars0.githubusercontent.com/u/43752155" width="120px;" alt=""/><br /><sub><b>Yutao Wang</b></sub></a></td>
  </tr>
</table>


## License

Copyright 2020 Bounty Programmers

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
