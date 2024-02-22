# Marvel Comics Developer API React Project

This project is a React application that fetches data from the Marvel Comics Developer API. The project uses npm version 20.11.0 and Saas version 1.71.0.

React Technologies which are used on this project: 

1- useState and useEffect Hooks:

2- State management within the component is handled using the useState hook.
Component lifecycle events are tracked using the useEffect hook.

3- react-infinite-scroll-component is used to load more data as the page is scrolled.
Fetch API:

4- The fetch API is used to retrieve data from the Marvel API.
Form Handling:

5- A form is used to collect the character name from the user and search for characters based on that name. Form events (submit, reset) are listened to.
Hash Generation Function:

6- A function is created to generate a hash using a timestamp, private key, and public key for secure access to the API.
Event Listener and Scroll Monitoring:

7- The scroll event on the window is listened to in order to track certain events when the page is scrolled.
Conditional Rendering:

8- Conditional rendering is used to display characters only if character data is available and comic data is not.




## Getting Started

To run the project locally, make sure you have Node.js installed on your machine. Then, follow the steps below:

1. Clone the repository:


git clone https://github.com/your-username/your-repository.git
cd your-repository

Install dependencies:

npm install
Run the development server:
bash
Copy code
npm run dev
Open your browser and navigate to http://localhost:5173/ to view the application.

env
Copy code
REACT_APP_MARVEL_API_KEY=your-api-key
Replace your-api-key with the actual API key you obtained.

Project Structure
The project is organized with the following structure:

src/
components/
 Search/: Contains the main Search component.
  Characters/: Subcomponent for mapping and displaying Characters datas.
  Comics/: Subcomponent for mapping and displaying Comics datas.



Available Scripts
In the project directory, you can run the following scripts:

npm run dev: Runs the development server.

Task Details:

Functional spec
Home
● List characters with name and image  ✓✓✓✓
● List have to 30 limits and it has to be infinite scroll  ✓✓✓✓
Detail
● Show characters details (name, image, description)  ✓✓✓✓
● List comics where the character appears  ✓✓✓✓
● Comics have to limit with 10 and ordered by publish date desc  ✓✓✓✓
Bonus
● Unit Test XXXX
● Snapshot test XXXX
● Anything else! XXXX

Notes: The description, image, and comics sections of some data are returning empty through the API. I have directly checked this from the API, and I believe the error is not on my end but originates from the API.
