import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { authCheck } from "../../../../event/src/actions";
import Fab from "@material-ui/core/Fab";
import Badge from "@material-ui/core/Badge";
import LockIcon from "@material-ui/icons/Lock";

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};
const mapDispatchToProps = {
  authCheck
};

function PR(props) {
  useEffect(() => {
    props.authCheck();
  }, []);
  if (!props.auth) {
    return <div></div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PR);
