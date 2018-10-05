import React from 'react';
import ToggleSwitch from './../ToggleSwitch/ToggleSwitch';

class CustomToggleSwitch extends React.Component {

    /* istanbul ignore next */
    constructor(props, context) {
        super(props, context);  
        this.state = {selectedValue: '', innerToggle: false, isDisabled: true};
        this.state = {mainSwitchTitle: ''};      
    }

    componentDidMount() {
        if(this.props.value === undefined || this.props.value === null || this.props.value === '') {
            this.setState({ selectedValue: '', innerToggle: false, isDisabled: true, mainSwitchTitle:'Switch On'});
        }
        else {
            this.setState({ selectedValue: this.props.value, innerToggle: this.props.value, isDisabled: false, mainSwitchTitle:'Switch Off'});
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.value === undefined || nextProps.value === null || nextProps.value === '') {
            this.setState({ selectedValue: '', innerToggle: false, isDisabled: true, mainSwitchTitle:'Switch On'});
        }
        else {
            this.setState({ selectedValue: nextProps.value, innerToggle: nextProps.value, isDisabled: false, mainSwitchTitle:'Switch Off'});
        }
    }

    handleToggleMainSwitchChange(e) {
        if (e.target.checked) {
            this.setState({ selectedValue: false, innerToggle:false, isDisabled: false, mainSwitchTitle:'Switch Off'});
            this.props.handleCustomToggleSwitchChange(false);
        } else {
            this.setState({ selectedValue: '', innerToggle:false, isDisabled: true, mainSwitchTitle:'Switch On'});
            this.props.handleCustomToggleSwitchChange('');
        }
    }

    handleInnerToggleSwitchChange(e) {
        if (e.target.checked) {
            this.setState({ selectedValue: true, innerToggle: true});
            this.props.handleCustomToggleSwitchChange(true);
        } else {
            this.setState({ selectedValue: false, innerToggle: false});
            this.props.handleCustomToggleSwitchChange(false);
        }
    }

    /* istanbul ignore next */
    render() {
        let outerToggleCheck = this.props.value === true || this.props.value === false ? true : false;
        return(
            <div>
                <div style={{float:"left"}}>
                    <div className="switch-container">
                    <div className="customToggleSwitch"></div>
                        <label>
                            <input className="switch pushbutton" type="checkbox" checked={outerToggleCheck} onChange={this.handleToggleMainSwitchChange.bind(this)}/>
                            <div>
                                <span><i className="glyphicon glyphicon-off" title={this.state.mainSwitchTitle} /></span>                    
                            </div>
                        </label>
                    </div>
                </div>
                <div>
                </div>
                <div style={{float:"left", marginLeft: '-20px'}}>
                <ToggleSwitch
                    isChecked={this.state.innerToggle}
                    handleToggleSwitchChange={this.handleInnerToggleSwitchChange.bind(this)}
                    isDisabled= {this.state.isDisabled}
                />
                </div>
            </div>
        );
        
       /* let className = 'switch-toggle switch-3 switch-candy ' + this.state.selectedClass;
        let object = {name: "state-d",
                     type: "radio"};
        let anchorClass = '';
        let onObject = {}, offObject = {}, naObject= {};
        if (this.state.onCheck) {
            onObject = Object.assign({}, object, {checked: true});
            anchorClass = "on";
        } else {
            onObject = Object.assign({}, object);
        }
        if (this.state.noValCheck) {
            naObject = Object.assign({}, object, {checked: true})
        } else {
            naObject = Object.assign({}, object);
        }
        if (this.state.offCheck) {
            anchorClass = "off";
            offObject = Object.assign({}, object, {checked: true})
        } else {
            offObject = Object.assign({}, object);
        }

        return (
        <div className={className}>
            <input id={"on"+this.props.key} {...onObject } onChange={this.handleOn.bind(this)}/>
            <label htmlFor={"on"+this.props.key} className="glyphicon glyphicon-ok onMargin" title="yes"></label>

            <input id={"na"+this.props.key} {...naObject} onChange={this.handleNoVal.bind(this)}/>
            <label htmlFor={"na"+this.props.key} className="glyphicon glyphicon-off" title="nil"></label>

            <input id={"off"+this.props.key} {...offObject} onChange={this.handleOff.bind(this)}/>
            <label htmlFor={"off"+this.props.key} className="glyphicon glyphicon-remove offMargin" title="no"></label>           
            <a className={anchorClass}></a>
        </div> 
        );*/
    }

}

export default CustomToggleSwitch;
