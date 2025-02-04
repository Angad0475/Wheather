import React, { lazy, Suspense, useState } from "react";
import './App.css';

// Lazy load the components
const DarkMode = lazy(() => import('./components/DarkMode/DarkMode'));
const WeatherApp = lazy(() => import('./components/weather/Weather'));

function App() {
   const [timeoutReached, setTimeoutReached] = useState(false);

   // Set timeout for showing the components
   setTimeout(() => {
      setTimeoutReached(true);
   }, 5000);  // 5-second timeout

   // Define loading screen
   const loadingScreen = (
      <div className="loading-screen">
         <div className="square-container">
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
         </div>
      </div>
   );

   let content;

   if (timeoutReached) {
      // Show content after timeout
      content = (
         <Suspense fallback={loadingScreen}>
            <WeatherApp />
         </Suspense>
      );
   } else {
      // Show loading animation while waiting
      content = loadingScreen;
   }

   return (
      <>
         <Suspense fallback={loadingScreen}>
            {/* Lazy load the DarkMode component */}
            <DarkMode />
         </Suspense>

         {/* Show WeatherApp after timeout */}
         {content}
      </>
   );
}

export default App;
