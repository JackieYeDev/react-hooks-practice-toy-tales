import React, { useEffect, useState } from 'react';

import Header from './Header';
import ToyForm from './ToyForm';
import ToyContainer from './ToyContainer';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleSubmit(toyData) {
    setToys([...toys, toyData]);
  }

  function handleDonation(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(setToys(toys.filter((toy) => toy.id !== id)));
  }

  function handleLikes(id) {
    const toyHandler = toys.find((toy) => toy.id === id);
    fetch(`http://localhost:3001/toys/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likes: toyHandler.likes + 1 }),
    })
      .then((res) => res.json())
      .then((data) => updateToysList(data));
  }

  function updateToysList(newToy) {
    const toysList = toys.map((toy) => {
      if (toy.id === newToy.id) {
        return newToy;
      } else {
        return toy;
      }
    });
    setToys(toysList);
  }

  useEffect(() => {
    fetch('http://localhost:3001/toys')
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  return (
    <>
      <Header />
      {showForm ? <ToyForm onToySubmit={handleSubmit} /> : null}
      <div className='buttonContainer'>
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        handleDonation={handleDonation}
        handleLikes={handleLikes}
      />
    </>
  );
}

export default App;
