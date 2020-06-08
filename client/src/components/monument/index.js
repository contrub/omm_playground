import React from 'react';
import {
  useParams
} from "react-router-dom";

function Monument() {
  let { id } = useParams();
  console.log("Link choose:",id)
  return (
    <div>
      <h1>
        ID: {id}
      </h1>
    </div>
  )
}

export default Monument;
