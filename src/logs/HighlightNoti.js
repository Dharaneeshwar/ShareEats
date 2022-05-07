import React, { useEffect, useState } from "react";

function HighlightNoti(props) {
    
    var [string,setString] = useState("");

    useEffect(() => {
        setString(props.message);
    });
    
    return (
    <div className="container py-3 px-3 rounded border border-darkblue bg-darkblue text-center text-white my-4">
      {string}
    </div>
  );
}

export default HighlightNoti;
