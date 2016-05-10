import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {UploadSchemaForm} from 'components';
import {upload} from 'redux/modules/schema';

@connect(
  state => ({
    uploading: state.schema.uploading,
    uploaded: state.schema.uploaded,
    error: state.schema.uploadingError
  }),
  {initialize, upload})
export default class SchemaUpload extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    upload: PropTypes.func.isRequired,
    uploading: PropTypes.bool.isRequired,
    uploaded: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired
  }

  handleSubmit = (data) => {
    this.props.upload(data);
    this.props.initialize('uploadSchema', {});
  }

  render() {
    const {uploaded} = this.props;
    return (
      <div className="container">
        <h1>Schema Upload</h1>
        <Helmet title="SchemaUpload"/>

        
        <UploadSchemaForm onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}
