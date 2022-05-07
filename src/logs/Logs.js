import React, { useEffect, useState } from "react";
import Base from "../Base";
import { getLogs } from "../helper/logHelper";
import HighlightNoti from "./HighlightNoti";
import MiniNoti from "./MiniNoti";

export default function Logs() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    ( async () => {
      let allLogs = await getLogs();
      if (allLogs){
        setLogs(allLogs.reverse());
        console.log(allLogs);
      }
    })();
  }, [])

  return (
    <Base activeNav="logs">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
              <p className="text-center my-5">
                  <b>Logs</b> are the list of interations and <b>transactions</b> made by the users.
              </p>
              {logs.map((item, index) => {
              return (item.notificationType==="mini" && <MiniNoti page="donor" index={index} message={item.message}/>) || (item.notificationType==="highlight" && <HighlightNoti page="donor" index={index} message={item.message}/>) ;
            })}
          </div>
        </div>
      </div>
    </Base>
  );
}
