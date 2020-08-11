This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Project Assignment

Your task is to design and implement a web application using React.js. Use a service like Kinvey or Firebase for your back-end or create your own with Node.js and MongoDB or a framework in another language (ASP.NET, Spring, Symfony). It can be a discussion forum, blog system, e-commerce site, online gaming site, social network, or any other web application by your choice.

### Application Structure

The application should have:

•	public part (accessible without authentication)

•	private part (available for registered users)

1.1 Public Part

The public part of your projects should be visible without authentication. This public part could be the application start page, the user login and user registration forms, as well as the public data of the users, e.g. the blog posts in a blog system, the public offers in a bid system, the products in an e-commerce system, etc.

1.2 Private Part (User Area)

Registered users should have personal area in the web application accessible after successful login. This area could hold for example the user's profiles management functionality, the user's offers in a bid system, the user's posts in a blog system, the user's photos in a photo sharing system, the user's contacts in a social network, etc.

### General Requirements

Your Web application should use the following technologies, frameworks and development techniques:

At least 3 different dynamic pages (pages like about, contacts, etc. do not count towards that figure)

Use React.js for the client-side

Communicate to a remote service (via REST, sockets, GraphQL, or a similar client-server technique)

Implement authentication

Implement client-side routing

Demonstrate use of programming concepts, specific to the React library: stateless and state full components, bound forms, synthetic events, React Hooks, Context API, Component Styling…

Use a source control system, like GitHub

Brief documentation on the project and project architecture (as .md file)

### Other Requirements

Apply error handling and data validation to avoid crashes when invalid data is entered

Good UI and UX

### Bonuses

Use a state management solution

Write Unit Tests for your code

Use a file storage cloud API, e.g. Dropbox, Google Drive or other for storing the files

Connect to an external API, like Google Maps, AccuWeather, etc.

Anything that is not described in the assignment is a bonus if it has some practical use

Assessment Criteria

General Requirements – 50% 

Functionality Presentation – 20%

Adequately and clearly demonstrate the requested functionality. Know your way around the application and quickly demonstrate the code.

Answering Questions – 30 %

Answer questions about potential functionality outside the scope of the project.

Bonuses – up to 20 %

Additional functionality or libraries outside the general requirements, with motivated usage.

## Project description and functionalites

The app simulates online market platforms like OLX, Ebay etc. The private part consists of pages for editing ads, profile and specifics in the detials. Not logged user should be able to browse through categories, view ads in detais and apply search as well as ofcourse register. Logged in users can post-ads, edit or close ones created by them, follow/unfollow ones created by other users, view the profile page where the user can two sections, one for created ads the other for the followed ones as well as ofcourse logout. Users can search by multiple parameters(query,location and category) as well as filter the ads results by multiple filters(by price ascending, price descending and most recent)

All the react components are functional (different react hooks are applied). The app architecture consists of two types of componenets - route ones(big ones for each of the app routes) and small ones which are used repeatedly through out the route ones. Firebase is used for backend and authentication. A persisting state is implemented (after a refresh of the page, or changing its url, the state does not change) throgh context. For user notifications (as well as displaying errors) is used react-tostify. A pagination is implemented for displayed ads. All the forms have validation so no incorrect data is sent. Route guards are applied for the pages where authentication is required. For error handling besides the error notifications there are 2 pages - one for not found elements and other for network errors. For the styling is used Bootstrap. The app should be fully responsive (useable at 100% functionalites on any device) and is deployed at by https://the-olm.netlify.app netlify.

For any questions or suggestions contact me at smdnikolov@gmail.com





