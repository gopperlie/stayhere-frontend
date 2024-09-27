Welcome to StayHere
StayHere is a web application that allows users to book hotel rooms and enables admin users to manage reservations. It features role-based authentication for both regular users and admin users, ensuring proper access control.

Project Overview
Features:
User Authentication: Users and admins need to authenticate using their credentials.
User Role Management: Separate roles for users and admins. Admins can modify or cancel reservations.
Hotel Booking System: Users can browse available rooms and book them for specific dates.
Admin Panel: Admins can manage bookings, including editing and canceling reservations.
Technology Stack
Frontend:
React: A JavaScript library for building user interfaces.
TypeScript: Adds type safety to JavaScript code for more reliable and maintainable code.
MUI (Material UI): Provides styled components for building a responsive and accessible UI.
React Router DOM: Handles navigation and routing for the web application.
Backend:
Express.js: A Node.js framework for building the backend API.
PostgreSQL: A powerful, open-source relational database to manage the data.
JavaScript: Used for backend logic and API creation.
Repository Links
Backend Repository: StayHere Backend
Frontend Repository: StayHere Frontend
Installation and Setup
Frontend:
Clone the frontend repository:
bash
Copy code
git clone https://github.com/gopperlie/stayhere-frontend.git
Navigate to the project directory and install dependencies:
bash
Copy code
cd stayhere-frontend
npm install
Start the development server:
bash
Copy code
npm run dev
Backend:
Clone the backend repository:
bash
Copy code
git clone https://github.com/gopperlie/stayhere-backend.git
Navigate to the project directory and install dependencies:
bash
Copy code
cd stayhere-backend
npm install
Set up your PostgreSQL database and configure environment variables.
Start the server:
npm run dev
Usage
Once both the frontend and backend servers are running, navigate to the web application in your browser to sign up, log in, and book a hotel room. Admin users will have access to additional features, such as managing bookings.

License
This project is licensed under the MIT License.
