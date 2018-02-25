# Twitterify
Connect with other people.

Twitterify is a [Chaser](https://chaserhq.com/) Project.


## Feature List
* User can signup and login
* Authenticated User can post a tweet (max of 200 characters)
* Autheticated User can reply to tweets
* On replying someone, they would be notified via email
* User is able to view all tweets and replies
* Authenticated User can like tweets


## Getting Started
Twitterify is hosted on Heroku and can be accessed here:
- [Production](https://mini-twitterify.herokuapp.com/)

## Prerequisites
 These are what you need installed on your computer to use the application:

 - Web Browser (Chrome, or Mozilla, or Safari, or Opera, or Microsoft Edge )

 #### For Developers:
 - [Node.js](https://nodejs.org/en/download/)
 - [Yarn](https://yarnpkg.com/en/docs/install)
 - [MongoDb](https://www.mongodb.com/download-center#community)


## Setup
#### Local Copy
To create a local copy, run the following in your terminal:
```bash
git clone https://github.com/ajibs/mini-twitter.git
```
Then change into the local directory, run the following in your terminal:
```bash
cd mini-twitter
```

#### Install Node.js and Yarn
If you don't have Node.js installed, please go ahead and grab it [here](https://nodejs.org/). This project uses ES6+ features and requires Node version `8.9.4`

Yarn is a package manager for Node.js and can be installed from [here](https://yarnpkg.com/en/docs/install).

To confirm that you have Node.js installed, run the following in your terminal:
```bash
node -v
```
You should get something like `v8.9.4`.

To confirm that you have Yarn installed, run the following in your terminal:
```bash
yarn -v
```
You should get something like `1.3.2`.

#### Setup Database and .env file
You can setup a database on [mlab](https://mlab.com/). You should also create a `.env` file using `.env.sample` as a prototype. 

Signup on [Mailtrap](https://mailtrap.io/) and fill in the details in `.env` to ensure the email functionality works.

#### Install Node.js Modules
To install all dependencies, run the following in your terminal:
```bash
yarn
```


## Development
To kickstart the application and continue full-stack development on this project, run the following in your terminal:
```bash
yarn dev
```


## Built With
- [Git](https://git-scm.com/) - Version Control
- [Node.js](https://nodejs.org/) - JS Runtime Environment
- [Yarn](https://yarnpkg.com) - Package Manager
- [Express](https://expressjs.com/en/starter/installing.html) - Web Framework
- [Pug](https://pugjs.org/api/getting-started.html) - Templating Engine
- [Webpack](https://webpack.js.org/) - Build Tool
- [Babel](https://babeljs.io/) - Transpiler
- [Eslint](https://eslint.org/) - Linting Tool
- [mLab](https://mlab.com/) - Database
- [Heroku](https://heroku.com) - Hosting and Continuous Deployment
- [VS Code](https://code.visualstudio.com/) - Code Editor
- [Chrome](https://www.google.com/chrome/browser/desktop/index.html) - Browser


## Author
* [Bolu Ajibawo](https://github.com/ajibs)