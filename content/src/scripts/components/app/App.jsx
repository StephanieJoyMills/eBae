import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

function App(props) {
  useEffect(() => {
    document.addEventListener("click", () => {
      props.dispatch({
        type: "ADD_COUNT"
      });
    });
  }, []);

  return <div>Click Count: {props.count}</div>;
}

export default connect(mapStateToProps)(App);
