import React from 'react';
import Card from './card';
import About from './about';

function Home () {
  
  return (
    <div >
      <div className="card-container">
        <Card />
      </div>
      <div>
        <About />
      </div>
    </div>
  )
  
}
export default Home;
