import React, { useState } from 'react';

function ToyForm({ onToySubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
  });
  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:3001/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => onToySubmit(data));
  }
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  }
  return (
    <div className='container'>
      <form
        className='add-toy-form'
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <h3>Create a toy!</h3>
        <input
          type='text'
          name='name'
          placeholder="Enter a toy's name..."
          className='input-text'
        />
        <br />
        <input
          type='text'
          name='image'
          placeholder="Enter a toy's image URL..."
          className='input-text'
        />
        <br />
        <input
          type='submit'
          name='submit'
          value='Create New Toy'
          className='submit'
        />
      </form>
    </div>
  );
}

export default ToyForm;
