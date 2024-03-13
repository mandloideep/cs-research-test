# React Test for Research Project

### Professor: Dr Xiwei Wang

### Submission by Deep Mandloi

This is a test project given by Professor Dr Xiwei Wang, designed to demonstrate my skills in full-stack web development using React for the frontend and Express for the backend.

> **Note:** The project is currently hosted on a private GitHub repository. Pending approval from Professor Dr. Xiwei Wang, the repository can be made public to allow broader access and visibility.

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

What things you need to install the software and how to install them:

- [Node.js](https://nodejs.org/en/download/current)
  npm (comes installed with Node.js)

## Installing

A step-by-step series of examples that tell you how to get a development environment running.

## Backend Setup

Navigate to the backend directory from the root of the project:

```bash
cd backend
```

Install the necessary packages:

```bash
npm install
```

Start the Express server (default port is 3000):

```bash
npm start
```

## Frontend Setup

Open a new terminal window or tab. Then, navigate to the frontend directory from the root of the project:

```bash
cd frontend
```

Install the necessary packages:

```bash
npm install
```

Start the React development server (default port is 5173):

```bash
npm run dev
```

### Accessing the Application

The frontend can be accessed at http://localhost:5173.
The backend API is available at http://localhost:3000.
Running the Tests

## Built With

#### Frontend

- React: The web framework used for building the UI.
- React Router: Manages navigation within the single-page application.
- Vite: A modern frontend build tool that provides a fast development environment.
- Tailwind CSS & ShadCN UI: Used for styling and UI components, leveraging utility-first CSS for responsive design.
- Axios: Handles asynchronous HTTP requests to the backend API.

#### Backend

- Express: The backend framework used for creating API endpoints.
- express-validator: Middleware for validating and sanitizing API request data.
- CORS: Middleware to enable cross-origin requests.

# Project Overview

## Task Completion Summary

### Task 1: Setting Up the React Project

- Initialized a React project named "LoginApp".
- Created a "LoginForm" component for user login.
- Implemented React Router for navigation between the login page and dashboard.

### Task 2: Designing the Login Page

- Designed and styled a login form with username and password fields, ensuring an appealing UI.
- Implemented form validation to check for field completion before submission.

### Task 3: Implementing API Integration

- Established a Node.js server using Express.js.
- Created a RESTful API endpoint ("/api/login") for user authentication.
- Integrated the login form with the API, handling authentication and providing feedback for both success and failure cases.

### Task 4: Dashboard Page

- Developed a dashboard page, displayed post-login, featuring a welcome message and a logout option.

## Additional Functionalities

### Frontend Enhancements:

- Implemented a dark mode toggle for user preference.
- Added a signup page for new user registration.

### Backend Enhancements:

- Utilized validator middleware for robust data validation.
- Included signup functionality with API endpoint ("/api/signup") for user registration.

# Brief Explanation of Implementation Choices

The project leverages React and Vite for the frontend to benefit from fast refresh and modern JavaScript features, enhancing developer experience and productivity. React Router was chosen for its declarative routing approach, simplifying navigation in the single-page application.

For styling, Tailwind CSS was combined with ShadCN UI to quickly prototype and implement a consistent look and feel across the application, emphasizing responsiveness and accessibility.

The backend is powered by Express, providing a lightweight framework for setting up API endpoints with ease. express-validator was utilized for robust request validation and sanitation, ensuring data integrity and security. CORS middleware was integrated to resolve cross-origin resource sharing issues, essential for the frontend to communicate with the backend during development.

# Challenges Faced

During development, several challenges were encountered:

- **State Management:** Ensuring a smooth state transition between user authentication states and theme changes across components required careful planning and implementation of React Context and Hooks.
- **API Integration:** Handling asynchronous API calls with Axios and managing response states presented a learning curve, particularly in error handling and state updating based on server responses.
- **Responsive Design:** Achieving a consistent and responsive design across different devices and screen sizes was addressed by leveraging Tailwind CSS's utility classes, though it required meticulous attention to detail.

## Future Enhancements

- **Interactive Errors on Signup:** Plan to implement real-time validation feedback on the signup page, allowing users to correct errors as they type, rather than after submitting the form.
- **Monorepo Structure:** Transitioning to a monorepo structure to streamline the management of the frontend and backend codebases, facilitating shared utilities or components and simplifying dependency management.
- **Better State Management:** Implementing more robust state management solutions like Redux or Recoil to handle global state more efficiently, especially for more complex user interactions and data handling.
- **Input Validation with Zod:** Integrating Zod for TypeScript-based input validation, enhancing both client-side and server-side data integrity by leveraging its powerful schema definition and validation capabilities.
- **Containerization with Docker:** Utilizing Docker for containerizing the application, ensuring consistency across development, testing, and production environments, and simplifying deployment and scalability.
- **Database Integration:** Moving beyond mock data to integrate with a database system (e.g., PostgreSQL, MongoDB) for persistent storage of user data and authentication records, including the implementation of ORM/ODM for database interactions.
- **Password Hashing and Security:** Implementing password hashing (e.g., using bcrypt) for secure storage of user credentials, alongside other security best practices such as HTTPS enforcement, secure headers, and protection against common vulnerabilities.
- **API Documentation:** Utilizing tools like Swagger or Postman for comprehensive API documentation, making it easier for developers to understand and consume the backend services.
- **Testing and CI/CD:** Enhancing the project with more extensive unit and integration tests using Jest or similar frameworks, and setting up Continuous Integration/Continuous Deployment (CI/CD) pipelines for automated testing and deployment processes.
- **Accessibility Enhancements:** Ensuring the application meets accessibility standards, improving usability for all users by following WCAG guidelines.
- **Internationalization (i18n):** Adding support for multiple languages to make the application accessible to a broader audience.
- **Responsive Design Improvements:** Continuing to refine the application's responsiveness and mobile usability, ensuring a seamless experience across all devices.

# Conclusion

This project not only fulfills the given tasks but also introduces additional features and planned enhancements that extend its functionality and user experience. Through this project, I've deepened my understanding of React and Express development patterns and look forward to further refining these skills.
