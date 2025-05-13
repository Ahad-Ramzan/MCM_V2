import React from 'react'

const FormSearchSimple = ({ onSearchChange }) => {
  return (
    <form
      className="ps-form--search-simple"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="form-control"
        type="text"
        placeholder="Pesquisar"
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button type="submit">
        <i className="icon icon-magnifier"></i>
      </button>
    </form>
  )
}

export default FormSearchSimple
