<p align="center">
  <img src="https://codingly-assets.s3-eu-west-1.amazonaws.com/Codingly+Logo.png" width="200px" height="200px"/>
  </br>
  <a href="https://codingly.io">codingly.io</a>
  <br/>
</p>

## The Auction House

This front-end application is provided as-is, as a part of the [Serverless Framework Bootcamp - Node.js, AWS & Microservices](https://www.udemy.com/course/serverless-framework?referralCode=3BE4411C3364176D6722) course.

## Cloning and installing
Clone this repository.
```
git clone https://github.com/codingly-io/sls-course-frontend
cd sls-course-auctions-frontent
```

Install the NPM dependencies for this project.
```
npm install
```

## Setting up variables
Create a `.env` file in the root folder of this project. You need to specify two variables:

* `REACT_APP_REFRESH_RATE`: The rate at which auctions will be fetched (in milliseconds).

* `REACT_APP_AUCTIONS_ENDPOINT`: Your Auction Service API endpoint.

* `REACT_APP_AUTH0_DOMAIN`: Your Auth0 application domain.

* `REACT_APP_AUTH0_CLIENT_ID`: Your Auth0 application client ID.

For an example, you can take a look at the [.env.example](.env.example) file in this repository.

## Running the application
You can run the application by typing in:
```
npm start
```
The application should now be running at [http://localhost:3000](http://localhost:3000).
