import React, { useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappShareButton,
  XIcon,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";
import { EmailIcon } from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

function ShareButton({ url, title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="share-buttons">
      <CopyToClipboard text={url} onCopy={handleCopy}>
        <button
          style={{
            border: "0",
            font: "inherit",
            color: "black",
            cursor: "pointer",
          }}
        >
          {copied ? "Copied!" : "copy"}
        </button>
      </CopyToClipboard>
      <div>
        <FacebookShareButton url={url} quote={title}>
          <FacebookIcon round={true} size={32} />
        </FacebookShareButton>{" "}
        <TwitterShareButton url={url} title={title}>
          <XIcon round={true} size={32} />
        </TwitterShareButton>{" "}
        <EmailShareButton subject={title} url={url}>
          <EmailIcon round={true} size={32} />
        </EmailShareButton>{" "}
        <WhatsappShareButton url={url}>
          <WhatsappIcon round={true} size={32} />
        </WhatsappShareButton>
      </div>
    </div>
  );
}

export default ShareButton;
