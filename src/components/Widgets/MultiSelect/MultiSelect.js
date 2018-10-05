import React from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';
import { isArray } from 'util';

class MultiSelect extends React.Component {

    constructor(props, context) {
        super(props, context);
        // MultiSelect is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value.
        this.state = {
            stayOpen: false,
            disabled: false,
            dropUp: false
        };
        //this.determineDropUp = this.determineDropUp.bind(this);
    }

    /* istanbul ignore next */
    componentDidMount() {
        window.addEventListener('resize', this.determineDropUp);
        window.addEventListener('scroll', this.determineDropUp);
    }

    /* istanbul ignore next */
    componentWillReceiveProps(nextProps) {
        //this.determineDropUp(nextProps);
    }

    /* istanbul ignore next */
    componentWillUnmount() {
        window.removeEventListener('resize', this.determineDropUp);
        window.removeEventListener('scroll', this.determineDropUp);
    }

    /* istanbul ignore next */
   /* determineDropUp(props = {}) {
        let selectedDropDown = ReactDOM
            .findDOMNode(this.refs[this.props.name]);
        if (selectedDropDown) {
            let forms = selectedDropDown.closest('.form');
            let spaceBelow = forms.getBoundingClientRect().bottom - selectedDropDown.getBoundingClientRect().bottom;
            if (!(forms.getBoundingClientRect().bottom === 0 && selectedDropDown.getBoundingClientRect().bottom === 0) && spaceBelow < 150) {
                this.setState({
                    dropUp: true
                });
            }
        }
    }
*/
    buildOptionWithTitle(options) {
        let value = this.props.value;
        let isValidValue = !value;

        if(this.props.multi && value && value.length > 0) {
            isValidValue = false;
            value = JSON.parse(JSON.stringify(value));
        }
        let titleOptions = [];
        if(options && isArray(options) && options.length > 0) {
            titleOptions = options.map(option => {
                let op = {...option};
                op.title = option.label;
                if(this.props.multi && value && value.indexOf(option.value) > -1) {
                    value.splice(value.indexOf(option.value), 1);
                } else if(value && value === option.value) {
                    isValidValue = true;
                }
                return op;
            });
            if(this.props.multi && value && value.length === 0) {
                isValidValue = true;
            }
        } else {
            isValidValue = true;
        }
        if(this.props.hasError && !isValidValue) {
            this.props.hasError(true);
        }
        return titleOptions;
    }

    /* istanbul ignore next */
    render() {
        const className = this.state.dropUp ? 'drop-up' : '';
        let clearable = this.props.clearable === undefined ? true : this.props.clearable;
        return (
            <div ref={this.props.name}>
                <Select
                    deleteRemoves={false}
                    backspaceRemoves={false}
                    name={this.props.name}
                    className={className}
                    id={this.props.name}
                    value={this.props.value}
                    clearable={clearable}
                    onChange={this.props.onChange}
                    multi={this.props.multi}
                    removeSelected={false}
                    placeholder={this.props.placeholder}
                    closeOnSelect={this.props.closeOnSelect}
                    options={this.buildOptionWithTitle(this.props.options)}
                    disabled={this.props.disabled}
                    searchable={true}
                />
            </div>
        );
    }
}

export default MultiSelect;