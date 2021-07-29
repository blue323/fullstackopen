import React from 'react';

const Filter = ({ newSearch, handleSearchChange }) => {
    return (
        <p>find countries <input value={newSearch} onChange={handleSearchChange}></input></p>
    )
}

export default Filter