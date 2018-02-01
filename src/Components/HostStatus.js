import React from 'react'
import PropTypes from 'prop-types'

const HostStatus = ({hasHost, isHost, onSubmit}) => {
    if (hasHost && !isHost) return null;
    var buttonText = hasHost ? "Stop Hosting" : "Host";
    return (
        <div>
            <form onSubmit={onSubmit}>
                <button type="submit" className="button" value={buttonText}>{buttonText}</button>
            </form>
        </div>
    );
}

HostStatus.propTypes = {
    hasHost: PropTypes.bool.isRequired,
    isHost: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default HostStatus;
