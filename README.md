# Getting Started with Create React App

## Descrption :
The DPRS project is an advanced and comprehensive solution that provides a comprehensive dashboard with detailed data analysis capabilities, including day, week, and month-wise data visualization through various graphs. The dashboard also includes a work hours summary and weekly work data, along with a work list that allows for easy verification, update, and deletion of DPRS entries. The DPRS module allows for easy addition of DPRS entries by member and project name, along with the ability to track work hours and management support hours, and in/out times of members. The master module includes a comprehensive list of both members and clients, with the ability to add, update, and delete entries for both. The member list includes detailed information such as first name, last name, email, phone, role, designation, department, password, and profile, while the client list includes client name, code, and country. The report module provides detailed activity reports and summaries, which can be filtered by date, member name, and project. The profile module allows users to view and update their personal details, and also includes a password reset feature. The project also includes a login page, where users can log in with their email and password, and a password recovery feature that allows users to reset their password via email.

## Instalation:
### Downloads :
we need some tool and IDEs. 
#### VSCODE : (https://code.visualstudio.com/download)
#### Node : (https://nodejs.org/en/download/)
#### MongoDb : (https://www.mongodb.com/try/download/community) [we can now used community server]
##### if you not geting MongoDB Compass while installing MONGODB then install 
#### MongoDBCompass : (https://www.mongodb.com/try/download/compass)

### Installation Commands :
Open your project folder and Run code in terminal\
```
npm i
cd '.\Daily Project Work Entry\'
npm uninstall --save chart.js react-chartjs-2
npm install --save chart.js react-chartjs-2
npm i --save chart.js@3.9.1
npm i
cd .\Backend\
npm i
cd..
npm run both 

```

## You Need to Change
#### you need to change MongoDb  connect link
<br>
[Daily Project Work Entry\Backend\db.js] 

```
const mongoURI = "mongodb://localhost:27017/DailyProjectWork?directConnection=true&readPreference=primary&appname=DailyProjectWork"; 
```

mongoURI change with your link

[Daily Project Work Entry\Backend\routers\auth.js]
```
let MyPassword = 'xxxxxxxx'
let MyEmailId = 'xxxxx@gmail.com'
```
here Password is Two-step verification 
<br>
<br>


## Available Scripts

In the project directory, you can run:

### `npm start`
### npm i 
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
