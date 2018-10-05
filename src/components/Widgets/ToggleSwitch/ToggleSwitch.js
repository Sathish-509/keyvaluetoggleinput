import React from 'react';
import PropTypes from 'prop-types';

class ToggleSwitch extends React.Component {

    render() {
        let threeColorDisableClassName= "";
        if(this.props.isDisabled) {
            threeColorDisableClassName= 'threeColorDisableClassName';
        }
        return (
            <div className="switch-container">
                <label>
                    <input className="switch" type="checkbox" checked={this.props.isChecked} onChange={this.props.handleToggleSwitchChange} disabled={this.props.isDisabled}/>
                    <div className={threeColorDisableClassName}>
                        <span><i className="glyphicon glyphicon-ok" title="Yes"/></span>
                        <span><i className="glyphicon glyphicon-remove" title="No"/></span>
                        <div></div>                        
                    </div>
                </label>
            </div>
        );
    }

}

ToggleSwitch.propTypes = {
    isChecked: PropTypes.bool,
    handleToggleSwitchChange: PropTypes.func
};

export default ToggleSwitch;
