import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { authCheck } from "../../../../../event/src/actions";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    count: state.count
  };
};

const mapDispatchToProps = {
  authCheck
};

function App(props) {
  // console.log("AUTH OS", props.auth);
  // console.log("huh", props.count);

  useEffect(() => {
    props.authCheck();
  }, []);

  return (
    <div>
      Let's check if the user is logged in! {JSON.stringify(props)} and{" "}
      {props.count}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
