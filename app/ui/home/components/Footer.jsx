import React from 'react'

function Footer() {
  return (
    <div className="m-5 h-[120px] w-full bg-home-orange flex justify-center items-end">
    &copy; {new Date().getFullYear()} All Rights{" "}
    <span className="footer-text-white"></span>
  </div>
  )
}

export default Footer