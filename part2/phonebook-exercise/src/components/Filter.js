import React from 'react';

const Filter = ({ newSearch, handleSearchChange }) => {
    return (
        <p>filter show with <input value={newSearch} onChange={handleSearchChange}></input></p>
    )
}

export default Filter