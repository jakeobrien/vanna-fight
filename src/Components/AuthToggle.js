import React from 'react'
import PropTypes from 'prop-types'

const AuthToggle = ({isLoggedIn, onSubmit}) => {
    // if (isLoggedIn) return null;
    var buttonText = isLoggedIn ? "Sign Out" : "Sign In";
    return (
        <div>
            <form onSubmit={onSubmit}>
                <button type="submit" className="button" value={buttonText}>{buttonText}</button>
            </form>
        </div>
    );
}

AuthToggle.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default AuthToggle;
