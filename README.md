# Shoply

Shoply is a mock shopping cart application built with React. I built this project to practice building a complete React application from scratch, including routing, reusable components, API data fetching, state management, responsive styling, and automated testing.

The project focuses more on the frontend architecture and user experience than on real e-commerce functionality. Products are fetched from an external API, while the cart and other interactions are handled on the client side.

## Features

* Browse products fetched from an external API
* View individual product information
* Add products to the shopping cart
* Increase or decrease product quantities
* Remove products from the cart
* View the total number of items in the cart
* Calculate the cart total
* Navigate between pages using React Router
* Responsive layout for different screen sizes
* Loading and error states while fetching products
* Reusable React components
* CSS Modules for component-level styling
* Automated component and UI testing with Vitest and React Testing Library

## Pages

### Home

The homepage introduces the store and provides navigation to the shopping section.

### Shop

Displays the available products fetched from the API. Products can be added to the cart from here.

### Cart

Shows the products currently in the cart, along with their quantities, individual prices, and the total cart price. Products can also be removed or have their quantities changed.

## Technologies Used

* React
* React Router
* JavaScript
* CSS Modules
* Vitest
* React Testing Library
* Vite

## Project Structure

The project is organized around reusable components and separate responsibilities for data fetching, routing, pages, and UI.

```text
src/
├── components/
│   └── ...
├── home/
│   └── ...
├── shop/
│   └── ...
├── cart/
│   └── ...
├── services/
│   └── productsApi.js
├── hooks/
│   └── ...
├── routes/
│   └── ...
├── App.jsx
└── main.jsx
```

The exact structure may change as the project grows, but the main idea is to keep components, pages, API logic, and application setup separated rather than putting everything into a single file.

## Data Fetching

Products are retrieved from an external API through a separate API service instead of making the request directly inside the UI components.

I also created a custom `useProducts` hook to handle the product-fetching logic and keep the components focused on displaying the data.

The hook handles:

* Loading state
* Successful requests
* Errors
* Request cancellation using `AbortController`

This keeps the data-fetching logic reusable and easier to maintain.

## Routing

React Router is used to handle navigation throughout the application.

The application has routes for the main pages, while the navbar is shared across the pages using a layout structure with React Router's `Outlet`.

This means the navigation does not need to be duplicated inside every page.

## Styling

The project uses CSS Modules instead of one large global stylesheet.

CSS Modules allow styles to stay scoped to the component they belong to, which helps prevent class-name conflicts and makes the styling easier to manage as the application grows.

## Testing

Testing was an important part of this project.

I used **Vitest** together with **React Testing Library** to test the application's components and user interactions.

The tests cover things such as:

* Components rendering correctly
* Navigation between pages
* Active navigation states
* User interactions
* Adding items to the cart
* Changing product quantities
* Removing items from the cart
* Cart calculations
* Loading and error states
* Different UI states and conditional rendering

Rather than testing implementation details, the tests focus mainly on how the application behaves from the user's perspective.

## Running the Project Locally

Clone the repository:

```bash
git clone git@github.com:mawais09701-bot/shoply.git
```

Move into the project directory:

```bash
cd shoply
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL shown by Vite in your browser.

## Running Tests

Run the test suite with:

```bash
npm test
```

To run the tests once without watch mode:

```bash
npm test:run
```

## What I Learned

This project was mainly about putting several React concepts together in one application instead of learning them individually.

While building Shoply, I got practical experience with:

* Structuring a React application
* Creating reusable components
* Working with React Router
* Using nested routes and layouts
* Fetching data from an API
* Creating custom hooks
* Managing loading and error states
* Handling asynchronous requests
* Cancelling requests with `AbortController`
* Managing shopping cart state
* Using CSS Modules
* Writing component tests
* Testing user interactions with React Testing Library
* Organizing a project so that different responsibilities are kept separate

It also helped me understand that building a React application is not just about making the UI work. How the application is structured, how data flows through it, and how confidently you can change the code without breaking existing functionality are just as important.

## Future Improvements

There are several things I could add if I continue developing the project:

* Product search
* Product filtering and sorting
* Product categories
* Individual product detail pages
* Persistent cart using local storage
* Checkout flow
* Better product loading placeholders
* Pagination or infinite scrolling
* More extensive integration tests

## Project Status

This project is complete as a learning project. The main goal was to practice building and testing a React application using the concepts I had learned so far.
