import React from 'react';
import CustomTagsInput from './Widgets/CustomTagsInput/CustomTagsInput';
import _ from 'lodash';

class CustomFormGenerator extends React.Component {
  /* istanbul ignore next */
  constructor(props, context) {
    super(props, context);
    this.state = {customTagsOutput : [],
                  fieldProperties: {
                    minimum: 1,
                    maximum: 100
                  }};
  }
  updatecustomTagsInputValue (customTagsInputValues) {
    let vendorValues = this.state.customTagsOutput;
    if (_.isArray(customTagsInputValues)) {
      vendorValues = [];
      vendorValues = customTagsInputValues.map(inputValue => {
        let values = inputValue.split(':');
        let name = values[0];
        let value = values[1];
        return vendorValues.push({name, value: Number(value)});
      });
    } else {
      let values = customTagsInputValues.split(':');
      let name = values && values.length > 0 && values[0];
      let value = values && values.length > 1 && values[1].trim();
      vendorValues.push({name, value: Number(value)});
    }
    this.setState({customTagsOutput: vendorValues});
  }
  render() {
    let customTagsInputOptions = [];
    let customTagsInputData = [{keyName:'AP', displayName:'Andhra Pradesh'},
                                  {keyName:'TG', displayName:'Telangana'},
                                  {keyName:'TN', displayName:'Tamil Nadu'},
                                  {keyName:'KA', displayName:'Karnataka'},
                                  {keyName:'KE', displayName:'Kerala'},
                                  {keyName:'MP', displayName:'Madya Pradesh'}
                                ];
    customTagsInputData && customTagsInputData.map((dropDownObject) => {
      customTagsInputOptions.push({ value: dropDownObject.keyName, label: dropDownObject.displayName })
    });
    let customTagsInputValue = [];
    this.state.customTagsOutput && this.state.customTagsOutput.map((country) => {
      customTagsInputValue.push(country.name + ': ' + country.value);
    });
    let dropDownOptionsToRemove = customTagsInputValue.map(outputValue => outputValue.split(':')[0]);
    let dropDownOptions = customTagsInputOptions.filter(e => {
        if(dropDownOptionsToRemove.indexOf(e.value) === -1) {
            return e;
        }
    });
    customTagsInputOptions = dropDownOptions;
    return (<div>
          <CustomTagsInput
            name={"GDP Share"}
            value= {customTagsInputValue}
            placeholder={"Enter GDP value"}
            multi={true}
            fieldProperties={this.state.fieldProperties}
            closeOnSelect={true}
            options={customTagsInputOptions.length > 0 ? customTagsInputOptions : []}
            updatecustomTagsInputValue={this.updatecustomTagsInputValue.bind(this)}
        />
          {"You have chosen: "+this.state.customTagsOutput}
    </div>);
  }
}
export default CustomFormGenerator;
