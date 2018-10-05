import React from 'react';
import PropTypes from 'prop-types';
import MultiSelect from './../../Widgets/MultiSelect/MultiSelect';
import TextInput from './../../Widgets/NumberInput/NumberInput';
import TagsInput from 'react-tagsinput';

class CustomTagsInput extends React.Component {
    /* istanbul ignore next */
  constructor(props, context) {
    super(props, context);
    this.state = {buttondisabled: true};
    this.state = {dropDownOptions: []};
    this.state = {dropDownValue: '', numberInputValue: null};
    this.state = {vendorTagsInput: []};
  }

  componentDidMount() {
    this.setState({ dropDownOptions: this.props.options });
    this.setState({ buttondisabled: true });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value && nextProps.value.length > 0 && JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) {
        let dropDownOptionsToRemove = nextProps.value.map(outputValue => outputValue.split(':')[0]);
        let dropDownOptions = nextProps.options.filter(e => {
            if(dropDownOptionsToRemove.indexOf(e.value) == -1) {
                return e;
            }
        });
        this.setState({dropDownOptions});
        this.setState({vendorTagsInput: nextProps.value});
    } else {
        this.setState({ dropDownOptions: nextProps.options });
        this.setState({vendorTagsInput: nextProps.value})
    }
    if(nextProps.resetCustomComponents) {
        this.setState({dropDownValue: '', numberInputValue: null});
    }
  }

  handleNumberInput(outputValue) {
    let fieldValue = outputValue !== undefined ? outputValue.target.value : '';
    let numberValue = fieldValue && Number(fieldValue.replace(/[^0-9.]/g,""));
    let minValue = this.props.fieldProperties.minimum !== undefined ? this.props.fieldProperties.minimum : '';
    let maxValue = this.props.fieldProperties.maximum !== undefined ? this.props.fieldProperties.maximum : '';
    if(minValue && numberValue !== "" && numberValue < Number(minValue)) {
        numberValue = minValue;
    }
    if(maxValue && numberValue > Number(maxValue)) {
        numberValue = maxValue;
    }
    this.setState({numberInputValue: numberValue});
    if(!(this.state.dropDownValue === '' || this.state.dropDownValue === null || this.state.dropDownValue === undefined) && numberValue !== '') {
        this.setState({buttondisabled: false});
    } else {
        this.setState({buttondisabled: true});
    }
  }

  handleDropDownInput(selectedValue) {
    if((selectedValue && selectedValue !== '') && this.state.numberInputValue && this.state.numberInputValue !== '') {
        this.setState({buttondisabled: false});
    } else {
        this.setState({buttondisabled: true});
    }
    this.setState({dropDownValue: selectedValue});
  }

  handleSave() {
    if(!(this.state.dropDownValue === null || this.state.dropDownValue === '') &&  !(this.state.numberInputValue === undefined || this.state.numberInputValue === "" || this.state.numberInputValue === null)) {
        let vendorDropDownValue = this.state.dropDownValue.value + ': ' + this.state.numberInputValue;
        this.props.updatecustomTagsInputValue(vendorDropDownValue);
        this.setState({dropDownValue: '', numberInputValue: null});
        let filteredAry = this.state.dropDownOptions.filter(e => e !== this.state.dropDownValue);
        this.setState({dropDownOptions:filteredAry});
        this.setState(prevState => ({
            vendorTagsInput: [...prevState.vendorTagsInput, vendorDropDownValue]
        }));
        this.setState({buttondisabled: true});
    }
  }

  tagsInputChange(output) {
    this.props.updatecustomTagsInputValue(output);
    this.setState({
        vendorTagsInput: output
    });
    let dropDownOptionsToRemove = output.map(outputValue => outputValue.split(':')[0]);
    let dropDownOptions = this.props.options.filter(e => {
        if(dropDownOptionsToRemove.indexOf(e.value) == -1) {
            return e;
        }
    });
    this.setState({dropDownOptions});
  }

  render() {
    const buttonDisabled = this.state.buttondisabled ? 'icon iconAdd isDisabled' : 'icon iconAdd';
    return (
        <div>
            <div className='custom-tags'>
                <div style={{float:"left", width: "calc(50% - 25px)"}}>
                    <MultiSelect
                        name= {this.props.name + 'dropdown'}
                        value= {this.state.dropDownValue}
                        onChange={this.handleDropDownInput.bind(this)}
                        placeholder={this.props.placeholder}
                        multi={false}
                        closeOnSelect={this.props.closeOnSelect}
                        options={this.state.dropDownOptions}
                    />
                </div>
                <div style={{float:"left", width: "calc(50% - 25px)"}} className='tag-number-input'>
                    <TextInput
                        name={this.props.name + 'numberinput'}
                        defaultValue={this.state.numberInputValue !== null && this.state.numberInputValue !== undefined ? this.state.numberInputValue : this.props.defaultValue}
                        onChange={this.handleNumberInput.bind(this)}
                        placeholder={'Enter Number'}
                    />
                </div>
                <div style={{float:"left", width: "50px"}}>
                    <a className={buttonDisabled} onClick={this.handleSave.bind(this)}><span>Add</span></a>
                </div>
            </div>
            <div style={{clear:"left"}}>
                <TagsInput
                    inputProps={{className: 'react-tagsinput-input custom',
                    placeholder: ''}}
                    value={this.state.vendorTagsInput}
                    onlyUnique={true}
                    onChange={this.tagsInputChange.bind(this)}
                />
            </div>
        </div>
    );
  }
}

export default CustomTagsInput;