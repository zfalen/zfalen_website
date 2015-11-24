var React = require('react');

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon 
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');

const Demo = React.createClass({
  render() {
    const shareUrl = 'http://www.zachfalen.com';
    const title = 'Zachary M. Falen - Professional Portfolio';

    return (
      <div className="Demo__container">
        <div className="Demo__some-network">
          <FacebookShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button">
            <FacebookIcon
              size={60}
              round={true} />
          </FacebookShareButton>

        </div>

        <div className="Demo__some-network">
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button">
            <TwitterIcon
              size={60}
              round={true} />
          </TwitterShareButton>

        </div>

        <div className="Demo__some-network">
          <GooglePlusShareButton
            url={shareUrl}
            className="Demo__some-network__share-button">
            <GooglePlusIcon
              size={60}
              round={true} />
          </GooglePlusShareButton>

        </div>

        <div className="Demo__some-network">
          <LinkedinShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button">
            <LinkedinIcon
              size={60}
              round={true} />
          </LinkedinShareButton>

        </div>
      </div>
    );
  }
});

module.exports = Demo;