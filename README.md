# INGCO Technical Test - User Management App

This project is a single-page application (SPA) built with **React** to fulfill the requirements of the INGCO technical test. It displays a list of users in a table with pagination, sorting, creation of new users, and supports filtering based on first name and last name.

## Features

- Fetches and displays user data from an API
- Pagination of results
- User creation modal form
- Conditional rendering (only shows users with `status: true`)
- Responsive UI using [Radix UI](https://www.radix-ui.com/)
- TypeScript support

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/agomezcuervo/ingco-test.git
   cd ingco-test
   npm install
   npm run dev
