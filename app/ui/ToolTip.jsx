import React from 'react';

function ToolTip({ children, tooltip }) {
  return (
    <div className="group relative inline-block">
      {children}
      <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-sky-500 top-9 right-0 z-10 text-white p-1 rounded absolute mt-2 whitespace-nowrap">
        {tooltip}
      </span>
    </div>
  );
}

export default ToolTip;
