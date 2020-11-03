# ExPortfolio

[![standard-readme compliant](https://api.travis-ci.com/howac115/COMP30022.svg?token=J4ZPsoMp7ebKr4DtszSg&branch=master&status=passed)](https://travis-ci.com/github/howac115/COMP30022)

## Table of Contents

- [Documents](#documents)
- [Install](#install)
- [Usage](#usage)
- [Test](#test)
- [Key Algorithms](#key-algorithms)
	- [Chatbot](#chatbot)
	- [Path Protection](#path-protection)
	- [Email](#email)
	- [Fuzzy Search](#fuzzy-search)
- [Key Classes](#key-classes)
	- [Text Editor](#text-editor)
	- [User Portfolios Management](#user-portfolios-management)
	- [Templates](#templates)
- [Database Structure](#database-structure)
	- [User](#user)
	- [Portfolio](#portfolio)
- [Contribution](#contribution)
- [License](#license)



## Documents

- The [Product(ExPortfolio) Instructions](doc/instruction.pdf) for how to use our web application.
- A [User Story](doc/product-backlog.pdf) contains all functionalities that intended to achieve.
- A [Software Architecture](doc/architecture.pdf) you can use to see our app's architecture.
- An [API Documents](doc/api.pdf) to track all the APIs.



## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
$ npm install 
$ cd client
$ npm install 
$ cd ..
```



## Usage

The front end will run port 3000 and the back end will run in port 5000 cocurrently.

```sh
$ npm run dev
# open http://localhost:3000 to view it in the browser.
```



## Test

Run the test cases for the backend, this is automatically done every time right after pushing new code to github. this is done by Travis CI, to learn more, see https://travis-ci.com/

```sh
$ npm run test
# prints out test case and outcome.
```


## Key Algorithms

Demonstration of some key algorithms that used in the ExPortfolio Systems.

 - ### Chatbot

 - ### Email

 - ### Path Protection

 - ### Fuzzy Search

   Fuzzy search is utilised in the template searching. User can simply type part of a word to match some outcomes. 
   
   For instance, Ex can match both "exportfolio", "Exportfolio", "Ex Portfolio" and of course "Ex".



## Key Classes

Some key classes for important functionalities.

 - ### Text Editor 

   We use [Sun Editor](http://suneditor.com/sample/index.html) to implement the user's e-portfolio pages and templates. 

   This editor is a lightweight, flexible, customizable text editor for web applications.

   The configurations of this editor that used in our application can be found in following path.
```
├── COMP30022
│    └── client
│	        └── src
│  		         └── components
│                   └── SunEditor.js
```

 - ### User Portfolios Management

 - ### Templates



## Database Structure

 - ### User
 Property | Description
---- | ---
firstName | String type, created through user controller, first name of user
lastName |  String type, created through user controller, last name of user
email | String type, created through user controller, email address of user
password | String type, created through user controller, password of user account
emailConsent | 	Boolean type, consent of other people send email to current user
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

 - ### Portfolio
 Property | Description
---- | ---
name | String type, created through folio controller, name of portfolio
user | User ID obtained, finding current user in portfolio controller
createdAt | Date type,  record the first time that current portfolio has been created 
updatedAt | Date type,  can be updated through user's portfolio page, record laste update time
shareAsTemplate | Boolean type, consent of if current portfolio has been shared as template
visible | Boolean type, consent of if current portfolio can be seen by other users

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

## Deployment

 - ### Heroku

 - ### MongoDB

 - ### Nodemailer



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

