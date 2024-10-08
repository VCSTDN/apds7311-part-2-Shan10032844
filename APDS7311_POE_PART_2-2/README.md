CHELDEN BOOYSEN - ST10067040
CLIVELLE NARAYAN - ST10031932
TRE FROST - ST10079944
MATTHEW CROSSON - ST10212422
CHE PILLAY- ST10040834
SHANNON ADENDORFF - ST10032844


Customer Portal Application: This is a customer portal application with user registration and login functionality, built using Node.js, Express, MongoDB, and CSRF Protection.


Features
-User Registration: Users can sign up with a username and password.
-User Login: Registered users can log in with their credentials.
-CSRF Protection: The application uses CSRF tokens for enhanced security.
-MongoDB Integration: User data is stored securely in a MongoDB database.
-Password Hashing: User passwords are hashed using bcrypt for security.

Technologies Used
-Node.js
-Express
-MongoDB (Mongoose)
-bcrypt
-CSRF Protection (csurf)
-HTML, CSS, JavaScript (Frontend)

Getting Started

-Node.js: Make sure you have Node.js installed on your system. You can download it here.
-MongoDB: Install MongoDB or use a cloud MongoDB service like MongoDB Atlas.

Installation
1. Clone the repository:
	git clone <repository-url>
	cd <repository-name>

2.Install dependencies:
	npm install

3. Set up MongoDB:
- If you're using MongoDB Atlas, replace the MongoDB URI in db.js with your own connection string.
- If you're running MongoDB locally, make sure your MongoDB server is running, and the URI is set to your local MongoDB server (mongodb://127.0.0.1:27017/apds).

4. Set up CSRF protection: This app uses the csurf middleware for CSRF protection. It automatically includes a CSRF token in requests for added security.


Running the Application
1. Start the server:
npm start
2. Access the application: Open a web browser and navigate to:
http://localhost:3000


File Structure
-backend/: Contains the backend server code, including authentication logic and the MongoDB connection.
-models/User.js: Mongoose model for user data.
-auth.js: Authentication routes for registration and login.
-db.js: MongoDB connection configuration.

-public/: Contains the frontend code (HTML, CSS, JavaScript).
-index.html: Frontend page for user registration and login.
-style.css: Styles for the application.
-script.js: JavaScript for handling frontend interactions.
-app.js: Main Express server file. Sets up the server, routes, and middleware.

API Endpoints
1. POST /auth/register

Registers a new user.
Body: { "username": "<username>", "password": "<password>" }
Response: 201 status code with a message of success or error.

2.POST /auth/login
Logs in a registered user.
Body: { "username": "<username>", "password": "<password>" }
Response: 200 on success, 401 on invalid credentials.

3.GET /auth/csrf-token
Fetches the CSRF token to be used in requests.
Response: CSRF token in JSON format.


Security Measures
-CSRF Protection: Uses csurf to protect against Cross-Site Request Forgery attacks.
-Password Hashing: User passwords are hashed using bcrypt before being stored in the database.


