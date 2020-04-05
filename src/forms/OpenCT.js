import React from 'react';
import PropTypes from 'prop-types';
import {
  parseCT,
  numSequencesInCT,
} from '../parse/parseCT';

class OpenCT extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sequenceId: '',
      
      errorReadingFile: false,
      fileContents: null,
      
      errorMessage: '',
    };
  }

  render() {
    return (
      <div
        style={{
          width: this.props.width,
          height: '100%',
          backgroundColor: '#fcfcfc',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            flexGrow: '1',
            maxHeight: '800px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              flexGrow: '1',
              maxWidth: '1200px',
              margin: '16px',
              border: 'thin solid #bfbfbf',
              borderRadius: '32px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {this._titleAndContent()}
          </div>
        </div>
      </div>
    );
  }

  _titleAndContent() {
    return (
      <div
        style={{
          flexGrow: '1',
          margin: '32px 64px 32px 64px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {this._title()}
        {this._content()}
      </div>
    );
  }

  _title() {
    return (
      <div>
        <p className={'unselectable-text'} style={{ margin: '0px 8px 0px 8px', fontSize: '24px' }} >
          Open a CT File
        </p>
        <div
          style={{
            height: '0px',
            borderWidth: '0px 0px thin 0px',
            borderStyle: 'solid',
            borderColor: '#bfbfbf',
            margin: '8px 0px 0px 0px',
          }}
        ></div>
      </div>
    );
  }

  _content() {
    return (
      <div
        style={{
          flexGrow: '1',
          margin: '24px 16px 0px 16px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {this._sequenceIdSection()}
        {this._fileSection()}
        {this._errorMessageSection()}
        {this._submitSection()}
      </div>
    );
  }

  _sequenceIdSection() {
    return (
      <div
        style={{
          margin: '0px 0px 0px 0px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {this._sequenceIdLabel()}
        {this._sequenceIdInput()}
      </div>
    );
  }

  _sequenceIdLabel() {
    return (
      <p
        className={'unselectable-text'}
        style={{ margin: '0px 8px 0px 0px', fontSize: '12px', display: 'inline-block' }}
      >
        Sequence ID:
      </p>
    );
  }

  _sequenceIdInput() {
    return (
      <input
        type={'text'}
        value={this.state.sequenceId}
        onChange={event => this._onSequenceIdInputChange(event)}
        spellCheck={'false'}
        placeholder={' ...the name of your sequence'}
        style={{ flexGrow: '1' }}
      />
    );
  }

  _onSequenceIdInputChange(event) {
    this.setState({
      sequenceId: event.target.value,
    });
  }

  _fileSection() {
    return (
      <div style={{ margin: '32px 0px 26px 0px' }} >
        <input
          type={'file'}
          onChange={event => this._onFileInputChange(event)}
        />
      </div>
    );
  }

  _onFileInputChange(event) {
    if (event.target.files.length > 0) {
      let fr = new FileReader();
      fr.onerror = () => {
        this.setState({
          errorReadingFile: true,
          fileContents: null,
          errorMessage: '',
        });
      };
      fr.onload = () => {
        this.setState({
          errorReadingFile: false,
          fileContents: fr.result,
          errorMessage: '',
        });
      };
      fr.readAsText(event.target.files[0]);
    }
  }

  _errorMessageSection() {
    if (this.state.errorMessage.length === 0) {
      return <div></div>;
    } else {
      return (
        <div>
          <p
            className={'unselectable-text'}
            style={{
              margin: '0px 0px 0px 0px',
              fontSize: '14px',
              color: 'red',
            }}
          >
            <b>{this.state.errorMessage}</b>
          </p>
        </div>
      );
    }
  }

  _submitSection() {
    return (
      <div style={{ margin: '6px 0px 0px 0px' }} >
        <button
          onClick={() => this._submit()}
          style={{ padding: '4px 32px 4px 32px', fontSize: '12px' }}
        >
          Submit
        </button>
      </div>
    );
  }

  _submit() {
    let sequenceId = this._parseSequenceId();
    if (sequenceId === null) {
      return;
    }
    let ct = this._parseCT();
    if (ct === null) {
      return;
    }
    this.props.submit(
      sequenceId,
      ct.sequence,
      ct.partners,
      ct.numberingOffset,
    );
  }

  /**
   * Returns null if the sequence ID is empty.
   * 
   * @returns {string|null} 
   */
  _parseSequenceId() {
    let id = this.state.sequenceId.trim();
    if (id.length === 0) {
      this.setState({ errorMessage: 'Sequence ID is empty.', });
      return null;
    } else {
      return id;
    }
  }

  /**
   * @typedef {Object} OpenCT~ParsedCT 
   * @property {string} sequence 
   * @property {Array<number|null>} partners 
   * @property {number} numberingOffset 
   */

  /**
   * Returns null if the user has not uploaded a file, if the file
   * is unable to be read, if the CT file is invalid, or if the CT
   * file specifies a structure of length zero.
   * 
   * @returns {OpenCT~ParsedCT|null}
   */
  _parseCT() {
    if (this.state.fileContents === null) {
      if (this.state.errorReadingFile) {
        this.setState({ errorMessage: 'Unable to read selected file.' });
      } else {
        this.setState({ errorMessage: 'No file uploaded.' });
      }
      return null;
    }
    let ct = parseCT(this.state.fileContents);
    if (ct === null) {
      if (numSequencesInCT(this.state.fileContents) === 0) {
        this.setState({ errorMessage: 'No structure found in CT file.' });
      } else if (numSequencesInCT(this.state.fileContents) > 1) {
        this.setState({ errorMessage: 'CT file contains multiple structures.' });
      } else {
        this.setState({ errorMessage: 'Invalid CT file.' });
      }
      return null;
    }
    if (ct.sequence.length === 0) {
      this.setState({ errorMessage: 'Structure has a length of zero.' });
      return null;
    }
    return ct;
  }
}

OpenCT.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  submit: PropTypes.func,
};

OpenCT.defaultProps = {
  width: '100vw',
  submit: () => {},
};

export {
  OpenCT,
};
