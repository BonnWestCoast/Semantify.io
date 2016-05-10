import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import uploadSchemaValidation from './uploadSchemaValidation';

@reduxForm({
  form: 'uploadSchema',
  fields: ['schema'],
  validate: uploadSchemaValidation
})
export default
class UploadSchemaForm extends Component {
  static propTypes = {
    active: PropTypes.string,
    asyncValidating: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  }

  render() {
    const {
      handleSubmit,
      fields: {schema}
      } = this.props;
    const styles = require('./UploadSchemaForm.scss');

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className={'form-group' + (schema.error && schema.touched ? ' has-error' : '')}>
            <label htmlFor={schema.name} className="col-sm-2">Schema</label>
            <div className={'col-sm-8 ' + styles.inputGroup}>
              <textarea rows="20" className="form-control" id={schema.name} {...schema}/>
              {schema.error && schema.touched && <div className="text-danger">{schema.error}</div>}
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" onClick={handleSubmit}>
                <i className="fa fa-paper-plane"/> Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
