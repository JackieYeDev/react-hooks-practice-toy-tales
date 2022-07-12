import React from 'react';
import ToyCard from './ToyCard';

function ToyContainer({ toys, handleLikes, handleDonation }) {
  return (
    <div id='toy-collection'>
      {toys.map((toy, index) => (
        <ToyCard
          key={index}
          toy={toy}
          handleLikes={handleLikes}
          handleDonation={handleDonation}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
