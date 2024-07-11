import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
import AuthProvider from './contexts/AuthProvider';

// Tailwind CSS is used in this project. To use tail wind css refer from this site --> https://tailwindcss.com/docs/guides/create-react-app
// All the styling and classes for styling are refered from the DaisyUI framework of tailwind css
/*
      npm i react-router-dom  --> for routing
      
      https://tailwindcss.com/docs/guides/create-react-app --> this documentation is followed to set up tailwind css
      
      npm i react-slick --save  --> this React-slick gives us the moving next and moving before effect as used in the <SpecialDishes/> component 
      npm i slick-carousel --save   --> this is to include the CSS of react-slick
      https://react-slick.neostack.com/docs/get-started  --> refer this doc to set up react-slick

      npm i react-icons   --> for icons

      npm install react-hook-form --> React Hook Form provides excellent API options and also aligns with the existing HTML standard for form validation
      this is a special react hook that handles this form input data , it validates the data as enterd, so manually using multiple usestates for each input feild is not required
      Follow this documentation --> https://react-hook-form.com/get-started

      npm i firebase  --> for authentication purpose
      
      Paired with Firebase it's relatively simple to deliver a safe authentication system that you can use both on the back end and the front end of your application.


      The React Context API is a way for a React app to effectively produce global variables that can be passed around among all the components. This is the alternative to "prop drilling" or moving props from grandparent to child to parent, and so on.
      React-Redux can be considered as an alternative of this, where a Redux store is being maintained and the variables in the redux store is accesible globally.
      Similarly in context API, various context objects are created that can be globally distributed.

      npm install sweetalert2  --> This package is used to have beautifull alerts

      npm i @tanstack/react-query  --> Tanstack React Query is used for fetching and updating the server state.
      Follow this --> https://tanstack.com/query/latest/docs/framework/react/overview
      The useQuery method is used to fetch data, whilst useMutation is used to send data from the client to the server. 
      However, Tanstack Query is a library that can handle any asynchronous operations.
      

      npm i axios --> The axios npm package provides an easy-to-use API that handles various HTTP request methods such as GET, POST, PUT, and DELETE.
      Axios is better than fetch() since axios is easy to uses, lightweigth and convinient since, direct functions for get(),post(),put() etc are provided.

      Stripe is used for payment integration
*/


// Tanstack
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <AuthProvider>    {/* This is for useContext */}

    <QueryClientProvider client={queryClient}>    {/* This is for Tanstack query */}
      <RouterProvider router={router} />      {/* this is the new syntax for react router. Instead of rendering <App/> component we rendered everything as mentioned in routing  */}
    </QueryClientProvider>
  
  </AuthProvider>
  
);

reportWebVitals();