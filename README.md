# E-Commerce Website

This is a full-stack e-commerce website built using **Next.js**, **React**, and **Tailwind CSS**. The project allows users to browse and filter products, add them to the cart, and make purchases. It also features dynamic product listings fetched from an external API and displays user reviews and social media share buttons.

## Features

- **Responsive Design:** The website is fully responsive and works well on all devices.
- **Product Filtering:** Users can filter products by category, size, and price range using an interactive slider.
- **State Management:** The project uses React's Context API for state management, making it easy to manage the shopping cart, product data, and user interactions across the app.
- **Notifications:** Toast notifications are used for smooth user experience, displaying success, error, and informational messages.
- **User Reviews & Social Media Sharing:** Components for user reviews and social media sharing buttons have been integrated to enhance engagement.
- **Dynamic Data Fetching:** The product listings and details are fetched from a third-party API (Sanity.io), with proper handling of CORS issues and API errors.

## Tech Stack

- **Next.js** for server-side rendering and routing.
- **React** for UI components and state management.
- **Tailwind CSS** for styling and responsive design.
- **Sanity.io** as the headless CMS to manage product data.
- **React Icons** for adding icons throughout the site.
- **Toast** for notification handling.

## Day 1: Laying the Foundation of the Marketplace

On Day 1, I focused on laying the foundation for the e-commerce marketplace. The tasks included:

- **Choosing the Marketplace Type:** I decided on the General E-Commerce, considering factors such as the target audience, types of products, and user experience.
- **Defining the Primary Purpose:** I outlined the main goal of the marketplace, which is to provide an easy-to-use platform for users to browse, search, and purchase products from various categories.
- **Defining Business Goals:** My primary business goal is to solve the following problems:
  - **Limited Access to Physical Stores:** By providing an online marketplace, customers will have access to products that may not be available in local physical stores.
  - **Business Expansion Challenges:** The platform will help businesses expand their reach beyond geographical limitations and target a broader audience.
  - **Lack of Convenience:** The marketplace aims to provide a convenient and efficient shopping experience, allowing users to shop from anywhere, at any time.
  - **High Operational Costs:** By operating online, businesses can reduce overhead costs associated with maintaining physical stores and focus on scaling their operations.
- **Establishing Relationships Between Entities:** I mapped out the relationships between the key entities involved, such as customers, products, categories, orders, and shipping, to ensure smooth navigation and a cohesive user flow.
- **Competitor Analysis:** I conducted a thorough competitor analysis to understand the strengths and weaknesses of other e-commerce websites in the market. This helped me identify opportunities for differentiation and improvement.
- **Market Research Analysis:** I performed market research to understand the needs and preferences of the target audience, which guided the design and feature selection of the marketplace.
- **SWOT Analysis:** I performed a SWOT analysis to evaluate the strengths, weaknesses, opportunities, and threats for the marketplace, which informed my strategic decisions moving forward.

This phase was essential for setting clear goals and preparing for the next steps in the development of the e-commerce website.

## Day 2: Technical Documentation and System Design

On Day 2, I focused on creating detailed technical documentation and preparing the foundational elements for the project. The tasks included:

- **Frontend Requirements:** I outlined the key requirements for the frontend, specifying the features, user interface (UI) design, and overall functionality needed for the marketplace.
- **API Endpoints:** I defined the necessary API endpoints that would be used to fetch product data, handle user authentication, and manage orders.
- **API Integration:** I documented how to integrate a third-party API into the project.
- **Sanity Schema Draft:** I created a draft of the Sanity schema, which outlined the structure of the content in the headless CMS, including products, categories, and orders. This draft was crucial in establishing the content model and how it would be fetched and displayed in the app.
- **Collaboration Notes:** Although there were no collaborators for this project, I documented about my independently done working.
- **Workflow Visualization and Explanation:** I visualized and explained the user flow and the flow of data between the frontend and backend. This helped in mapping out the processes that users would follow while interacting with the website.
- **System Architecture:** I created a high-level system architecture diagram to represent how the different parts of the website (frontend, backend, API, and Sanity CMS) interact with each other. This provided a clear blueprint for the technical structure of the project.

This day was essential for creating the technical foundation of the project and ensuring a smooth development process in the coming days.

## Day 3: API Integration, Data Fetching, and Display

On Day 3, I focused on integrating the API into the project, fetching data, and ensuring it was properly displayed. The tasks included:

- **Fetching Data from the API:** I fetched data from the external API, including product details, categories, and other relevant information, ensuring the data was in the correct format for processing.
- **Importing Data into Sanity:** After fetching the data, I imported it into Sanity CMS. This step allowed me to store and manage the content in an organized manner within the CMS.
- **Fetching Data from Sanity:** I then fetched the data from Sanity CMS using the appropriate API queries to ensure the content was up-to-date and available for display.
- **Displaying Data on the Frontend:** Finally, I displayed the data fetched from Sanity on the frontend of the website, rendering product listings, categories, and other relevant content dynamically to create a seamless user experience.

This day was crucial in establishing a smooth data flow from the API to Sanity and then displaying the content dynamically on the frontend of the marketplace.

## Day 4: Building Dynamic Components

On Day 4, I focused on building all the dynamic components of the website to enhance functionality and user experience. The tasks included:

- **Product Listing:** I created the dynamic product listing component, ensuring it could fetch and display products based on user selections and filters.
- **Product Description:** I implemented a dynamic Product Description section, allowing users to dynamically view the details of the specific product.
- **Cart Functionality:** I developed the cart functionality, enabling users to add, remove, and modify the quantity of products in their cart.
- **Wishlist:** I created a wishlist feature, allowing users to save products they are interested in purchasing later.
- **Checkout Process:** I built the checkout functionality to manage user orders, including the ability to review the cart, provide shipping details, and make payments.
- **Header and Footer:** I designed and implemented the header and footer of the website, ensuring they provided easy navigation and access to key information.
- **FAQs Section:** I created a dynamic FAQ section with searching functionality where common customer questions could be answered.
- **Review Section:** I implemented the review section to allow customers to leave feedback on products, increasing trust and engagement.
- **Gift Card Purchasing Component (UI):** I designed the UI for a gift card purchasing component, providing users with the option to buy gift cards.
- **Contact Form:** I built a contact form that allows users to easily get in touch with support or the business team.
- **About Section:** I created an about section to provide information about the business, mission, and values.
- **Category Filter:** I implemented a category filter to help users easily browse products based on specific categories.
- **Size Filter:** I developed a size filter, allowing users to select their preferred sizes when shopping.
- **Price Range Slider:** I added a price range slider to enable users to filter products based on their budget.
- **User Profile(UI):** I built the user profile section, where users can view and edit their account information, such as order history and preferences.
- **Analytics Dashboard (UI):** I designed the UI for an analytics dashboard to provide insights into user behavior, sales data, and other key metrics.
- **Subscription Management (UI):** I created the UI for subscription management, allowing users to manage their subscriptions to newsletters or product updates.
- **Search Functionality:** I implemented a search functionality to allow users to easily search for products by name, category, or other attributes.
- **Blog Section:** I added a blog section to the website, providing a platform for posting articles, updates, and news related to the marketplace and relevant topics.
- **Loader Component:** To enhance user experience, I also created a loader component that appears while data is being fetched. This ensures that users are informed and the website feels responsive, even during data load times.

This day was essential in developing the key features and functionalities that will allow users to interact with the marketplace efficiently.

## Day 5: Testing and Refinement

On Day 5, I focused on thoroughly testing the website and its components to ensure everything was functioning as expected. The tasks included:

- **Website Functionality Testing:** I tested the functionality of all the website components, ensuring that features like product listings, cart, checkout, wishlist, search, and filters were working as intended without any issues.
- **Responsiveness Testing:** I tested the responsiveness of the website across different devices and screen sizes, ensuring that the layout adapted properly for mobile, tablet, and desktop views.
- **API Response Testing (Postman):** I used Postman to test the API responses, making sure that the data fetched from external APIs was returned correctly and processed without errors. This also involved checking for proper error handling and response times.
- **Component Testing with CodeSandbox:** I tested individual components on CodeSandbox, specifically using the React library, to ensure that the components were working independently and could be integrated seamlessly into the main project.
- **Fallback UI Error Handling:** I implemented fallback UI for error scenarios to ensure that the website provided a user-friendly experience in case of failures or issues, such as when data fails to load or an API call is unsuccessful.
- **Image Optimization:** I tested and optimized images to ensure that they loaded quickly without compromising quality, helping to improve page load times and overall site performance.
- **Cross-Browser Testing:** I performed cross-browser testing to ensure that the website functioned properly across different browsers, including Chrome, Firefox, Safari, and Edge, and fixed any compatibility issues.
- **User Acceptance Testing (UAT):** I conducted User Acceptance Testing (UAT) to ensure that the website met the project requirements and was ready for end users. This step involved testing the overall user experience and identifying any areas that needed improvement.

This day was crucial for ensuring the stability, performance, and responsiveness of the website, as well as verifying that all features were functioning correctly before deployment.

## Day 6: Deployment, Testing, and Documentation

On Day 6, I focused on deploying the project, performing additional testing, and preparing the documentation. The tasks included:

- **Set Up Hosting Platform and Staging:** I set up the hosting platform and staging environment for the website to ensure smooth deployment and a live version for testing.
- **Deployment on Vercel:** I deployed the project on Vercel, making it accessible online for users to interact with and perform further testing.
- **Functional Testing:** After deployment, I performed functional testing on the live website to ensure that all components and features were working as expected in the staging environment.
- **Test Case Report:** I created a test case report to document the tests conducted, including the expected outcomes and results. This helped in tracking any issues and improvements.
- **Uploading Environment Variables on Hosting Platform:** I uploaded the necessary environment variables to the hosting platform (Vercel) to ensure that the API keys and other configuration settings were properly set for the live environment.
- **Performance Testing with Google Lighthouse:** I performed performance testing using Google Lighthouse to assess the website’s performance, including load times, accessibility, SEO, and best practices. I analyzed the results and identified areas for improvement.
- **Creating README.md:** I created and updated the `README.md` file, documenting the project’s purpose, features, and technical details, to provide clear guidance for future developers or stakeholders.

This day was crucial for finalizing the deployment, ensuring the website’s functionality on the live server, and preparing comprehensive documentation for future reference.

