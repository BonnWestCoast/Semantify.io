import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {UploadSchemaForm} from 'components';

@connect(
  () => ({}),
  {initialize})
export default class SchemaUpload extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    window.alert('Data submitted! ' + JSON.stringify(data));
    this.props.initialize('survey', {});
  }

  render() {
    return (
      <div className="container">
        <h1>Schema Upload</h1>
        <Helmet title="SchemaUpload"/>

        <UploadSchemaForm onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}
