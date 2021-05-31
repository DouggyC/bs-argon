# Balanced Scorecard

# Preview

![Balanced ScoreCard3](https://user-images.githubusercontent.com/19741669/117911875-17cc1a00-b311-11eb-9620-144828cf33c2.gif)

## Link

GitHub: https://github.com/Hisaacs/Balanced-Score-Card

# Preview


2. Install dependencies:

```
  npm install

```

Also see: [Cloning a repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository).


## User Story

```
As a USER
I want to Login and view my top 10 loss sales results by vendor.
and want to select a vendor and see top 5 products with the highest losses.

As a MANAGER

I want to Login and view my team's overall top 10 loss sales results by vendor,
and select an individual vendor with their top 5 products with the highest losses. 
I also want to view individual team members results and display their top 10 vendors 
and top 5 products with the hight losses

```
## Usage

```
Users can use this React application to view and manage loss sales for their individual category, 
and can add commentary to individual products. A manager can view all team members by slecting with 
a dropdown and display individual results.

- Authentication with Passport and json web tokens, bcrypt for password hashing when stored in the 
  database.
- Emails distributed by Nodemailer if user forgot password and requires a reset.
- MYSQL database in Heroku with Sequelized ORM.

```
See #Technologies section for additional packages used.

## Technologies

This project was built using:

  ## Node
  - [convert-excel-to-json ^1.7.0](https://www.npmjs.com/package/convert-excel-to-json)
  - [express ^4.17.1](https://www.npmjs.com/package/express)
  - [express-fileupload ^1.2.1](https://www.npmjs.com/package/express-fileupload)
  - [express-session ^1.17.1](https://www.npmjs.com/package/express-session)
  - [if-env ^1.0.4](https://www.npmjs.com/package/if-env)
  - [mysql ^2.18.1](https://www.npmjs.com/package/mysql)
  - [mysql2 ^2.2.5](https://www.npmjs.com/package/mysql2)
  - [nodemailer ^6.6.0](https://www.npmjs.com/package/nodemailer)
  - [password-hash ^1.2.2](https://www.npmjs.com/package/password-hash)
  - [sequelize ^6.6.2](https://www.npmjs.com/package/sequelize)
  - [concurrently ^6.0.2](https://www.npmjs.com/package/concurrently)
  - [nodemon ^2.0.7](https://www.npmjs.com/package/nodemon)
  - 

  ## Client
  - [@fortawesome/fontawesome-free ^5.15.2](https://www.npmjs.com/package/@fortawesome/fontawesome-free)
  - [bootstrap ^4.6.0](https://www.npmjs.com/package/bootstrap/)
  - [chart.js ^2.9.4](https://www.npmjs.com/package/chart.js?activeTab=readme)
  - [classnames ^2.2.6](https://www.npmjs.com/package/classnames)
  - [moment ^2.29.1](https://www.npmjs.com/package/moment)
  - [node-sass ^4.14.1](https://www.npmjs.com/package/node-sass)
  - [node-sass-package-importer ^5.3.2](https://www.npmjs.com/package/node-sass-package-importer)
  - [nouislider ^14.6.3](https://www.npmjs.com/package/nouislider)
  - [react ^17.0.1](https://www.npmjs.com/package/react/)
  - [react-chartjs-2 ^2.11.1](https://www.npmjs.com/package/chartjs-react)
  - [react-copy-to-clipboard ^5.0.3](https://www.npmjs.com/package/react-copy-to-clipboard)
  - [react-datetime ^3.0.4](https://www.npmjs.com/package/react-datetime)
  - [react-dom ^17.0.1](https://www.npmjs.com/package/react-dom)
  - [react-router-dom ^5.2.0](https://www.npmjs.com/package/react-router-dom)
  - [react-scripts 4.0.1](https://www.npmjs.com/package/react-scripts)
  - [reactstrap ^8.9.0](https://www.npmjs.com/package/reactstrap)
  - [sweetalert2 ^10.16.7](https://www.npmjs.com/package/sweetalert2)

# License

This project uses the MIT License. See the full details here: https://choosealicense.com/licenses/mit/ 

To see the app functionality, run the following command:

```
npm start

```
# Acknowledgements

- Trilogy Education & UWA Coding Bootcamp - for making this bootcamp possible.
- NPM package managed - for providing the open source package to assiste in building amazing software.
- Instructors Luca, Sam and Mark - for spending time in teaching and sharing their knowledge.

## Questions

If you have any questions please feel free to contact me directly at [hamisaacs@gmail.com](hamisaacs@gmail.com). You can find more of my work at [Hisaacs](https://github.com/Hisaacs).

