# \[QueryNest]

Project Purpose

This project is a dynamic web application designed to empower users to inquire about and recommend alternative products. It provides a unique platform where individuals can share their reasons for boycotting specific products and engage with a community to receive or offer valuable recommendations.

## Live Site and Repositories

* **Live Site Link:** \[Insert your Live Site Link here]


## Key Features

This application comes packed with a comprehensive set of features to provide a seamless user experience:

* **Robust Deployment:** Ensures a stable and error-free live environment with no CORS, 404, or 504 issues.

* **Responsive Layout:** Features a beautifully designed header with a dynamic navbar and a meaningful footer, adapting to various screen sizes.

* **Conditional Navigation:** The navbar intelligently displays different menu items based on whether the user is logged in or not, showing relevant options like "My Queries," "Recommendations For Me," and "Logout" for authenticated users.

* **Secure Authentication:** Includes a complete **Login and Registration** system with email/password and Google Sign-in options, displaying clear error messages. It also implements **JWT authentication** for securing private routes, ensuring logged-in users remain authenticated across pages.

* **Interactive Homepage:** Features an engaging slider highlighting the website's purpose, a section for **Recent Queries**, and two additional creative, animated sections.

* **Private "Add Queries" Route:** Allows logged-in users to submit product queries with details like product name, brand, image, query title, and boycotting reason, along with user and timestamp information.

* **Personalized "My Queries" Section:** Users can view, update, and delete their own queries, displayed in a flexible column layout with a convenient "Add Query" banner.

* **Comprehensive "Queries" Page:** Displays all public queries in a card format, allowing users to view `recommendationCount` and navigate to detailed query pages.

* **Detailed "Query Details" Page:** Shows specific query information, including the creator's details. It also features a form to **Add Recommendations** for that query, storing comprehensive data and automatically incrementing the query's recommendation count.

* **"My Recommendations" Management:** Users can view all recommendations they have made in a table format and delete them if needed, which also decrements the associated query's recommendation count.

* **"Recommendations For Me" Overview:** Allows users to see all recommendations made by others specifically for their own queries.

* **Powerful Search Functionality:** A search bar on the "All Queries" page enables filtering queries by product name.

## NPM Packages Used

The following key NPM packages were utilized in this project to enhance functionality and user experience:

* **`date-fns`**: For efficient and reliable date manipulation.

* **`debounce`**: To control the frequency of function calls, particularly useful for search input handling.

* **`react-toastify`**: For adding beautiful and customizable notifications (toasts) to the application.

* `[Other React/Firebase/Tailwind related packages you used, if any]`

## Unimplemented Feature

The following feature is noted as currently unimplemented:

* **Layout Toggle on "All Queries" Page:** Functionality to switch between different grid layouts (e.g., 1, 2, or 3 columns) for displaying queries.
