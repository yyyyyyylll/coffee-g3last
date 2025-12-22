import React from 'react';
import Hero from './components/Hero';

function App() {
  const MainContent = (
    <div className="content-placeholder">
      <h2>Our Story</h2>
      <p>
        Welcome to the world of premium coffee. We source the finest beans from around the globe to bring you the perfect cup.
      </p>
      <p>
        Experience the aroma, the taste, and the passion in every sip.
      </p>
    </div>
  );

  return (
    <div>
      <div className="app-container">
        <Hero>
          {MainContent}
        </Hero>
      </div>
    </div>
  );
}

export default App;
