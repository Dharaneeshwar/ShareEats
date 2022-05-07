import React, { useEffect, useState } from "react";

function MiniNoti(props) {
  var [string, setString] = useState("");

  useEffect(() => {
    setString(props.message);
  });

  return (
    <div className="container py-3 px-3 rounded border border-darkblue bg-lightblue my-4 text-center">
      {string}
    </div>
  );
}

export default MiniNoti;
