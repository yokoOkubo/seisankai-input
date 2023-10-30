import React from 'react'
import "./Newspaper.scss"

const Newspaper = () => {
  return (
    <div className="newspaper">
      西三会だより
      <iframe
        src="西三会だより2023年1月号.pdf"
        width="100%"
        height="100%"
        className="one"
      ></iframe>
      <iframe
        src="西三会だより2023年2月号.pdf"
        width="100%"
        height="100%"
        className="one"
      ></iframe>
    </div>
  );
}

export default Newspaper