import React, {Component} from 'react';
import qrcode from '../img/qr-code.png';

class QRCode extends Component {
  render() {
    return (
      <div className="qr-code">
        <img alt="Hello" src={qrcode}></img>
      </div>
    );
  }
}

export default QRCode;