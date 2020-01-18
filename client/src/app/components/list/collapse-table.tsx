
import * as React from "react";
import { Divider } from "@material-ui/core";


function Tbody({ schema, details }) {
  return (
    <>
      {Object.keys(details).map((key, i) => {
        return (
          <React.Fragment key={i}>
            <span className="details-row-wrapper">
              <div className="details-row">
                <div
                  className="details-title"
                  style={{ minWidth: "130px" }}
                >
                  {(schema[key] && schema[key].title) || key}
                </div>
                <div className="details-value">
                  {(schema[key] &&
                    schema[key].display &&
                    schema[key].display(details[key], details)) ||
                    details[key]}
                </div>
              </div>
              <div className="details-divider">
                <Divider />
              </div>
            </span>
          </React.Fragment>
        );
      })}
    </>
  );
}

export function CollapseTable({ schema, details }) {
  return (
    <div className="details-table">
      <div className="details-rows" style={{ width: "100%" }}>
        <Tbody {...{ schema, details }} />
      </div>
    </div>
  );
}
