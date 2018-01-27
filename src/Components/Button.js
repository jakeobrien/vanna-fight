import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ text, onClick }) => {

  return (
    <form onSubmit={e => {
            e.preventDefault();
            onClick();
        }}>
        <button type="submit" className="button" value={text}>{text}</button>
    </form>

  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button
