'use client'

import React, {useState} from "react";

function CopyHeaderModal({ setModalShown, mockToCopyClipboard }) {

  //State to notify user mock is copied
  const [isMockCopied, setIsMockCopied] = useState("")


  //Function to copy mock to clipboard
  const handleCopy = () => {
    setIsMockCopied("Mock Copied ✅")
    navigator.clipboard.writeText(JSON.stringify(mockToCopyClipboard));

    setTimeout(() => {
      setIsMockCopied("")
    }, 1300);
  }

  return (
    <>
      <div
        aria-hidden="true"
        className=" flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white border-2 border-blue-500 rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold dark:text-black">
                Mock Header Information
              </h3>
              <button
                type="button"
                onClick={() => setModalShown(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className=" p-4 md:p-5 space-y-4">
              <p className="whitespace-normal break-words">
                {JSON.stringify(mockToCopyClipboard)}
              </p>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
              onClick={handleCopy}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                data-modal-hide="default-modal"
              >
               {isMockCopied ? isMockCopied : "Copy to Clipboard"} 
              </button>
              <button
                onClick={() => setModalShown(false)}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium focus:outline-none bg-white rounded-lg border border-gray-500 hover:bg-blue-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100"
                data-modal-hide="default-modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CopyHeaderModal;
