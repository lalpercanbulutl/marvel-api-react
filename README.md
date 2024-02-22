# Marvel Comics Developer API React Project

This project is a React application that fetches data from the Marvel Comics Developer API. The project uses npm version 20.11.0 and Saas version 1.71.0.

## Getting Started

To run the project locally, make sure you have Node.js installed on your machine. Then, follow the steps below:

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository

Install dependencies:
bash
Copy code
npm install
Run the development server:
bash
Copy code
npm run dev
Open your browser and navigate to http://localhost:5173/ to view the application.
Marvel Comics Developer API Key
To fetch data from the Marvel Comics Developer API, you'll need to obtain an API key. Visit the Marvel Developer Portal to create an account and generate your API key. Once you have the key, create a .env file in the project root and add the following:

env
Copy code
REACT_APP_MARVEL_API_KEY=your-api-key
Replace your-api-key with the actual API key you obtained.

Project Structure
The project is organized with the following structure:

src/
components/
Search/: Contains the main Search component.
Characters/: Subcomponent for handling character search.
Comics/: Subcomponent for handling comic search.
other-components/: Additional components used in the project.


Available Scripts
In the project directory, you can run the following scripts:

npm run dev: Runs the development server.
