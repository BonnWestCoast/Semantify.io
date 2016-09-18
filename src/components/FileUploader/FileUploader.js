/**
 * created by Alexey Karpov
 */

import React, { Component, PropTypes } from 'react'

let inputStyle = {
  width: '0.1px',
  height: '0.1px',
  opacity: '0',
  overflow: 'hidden',
  position: 'absolute',
  zIndex: '-1',
}

let inputLabelStyle = {
  marginLeft: '0.5em',
}

export default class FileUploader extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    children: PropTypes.string,
  }

  // uploading file button handler
  fileUpload({ target }) {
    let fileReader = new FileReader()
    let file = target.files[0]

    fileReader.onloadend = () => {
      if (this.props.onChange) this.props.onChange(fileReader.result)
    }

    if (file) {
      fileReader.readAsText(file)
    }
  }

  render() {
    let labelText = this.props.children || 'Choose from file'

    return (
      <div style={{display: 'inline-block'}}>
        <input type="file" onChange={::this.fileUpload} style={inputStyle} name="file" id="file"/>
        <label htmlFor="file" style={inputLabelStyle} className="btn btn-primary">{labelText}</label>
      </div>
    )
  }
}
