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
    return (
      <Fab
        className="codegem-not-authed"
        href="http://localhost:3001/"
        target="_blank"
        color="primary"
        aria-label="add"
        style={{
          width: "33px",
          minHeight: "32px",
          height: "32px",
          paddingRight: "0px",
          marginRight: "16px",
          backgroundColor: "#888888",
          borderRadius: "25px"
        }}
      >
        <img
          style={{ width: "25px", filter: "brightness(40%)" }}
          src="chrome-extension://pgbomfemkbjoldfindlckipfgmomngmh/images/image.png"
        />
        <LockIcon
          style={{ color: "white", position: "absolute", width: "15px" }}
        ></LockIcon>
      </Fab>
    );
  } else {
    return (
      <Fab
        href="http://localhost:3001/"
        target="_blank"
        color="primary"
        aria-label="add"
        style={{
          width: "37px",
          height: "36px",
          paddingRight: "-2px",
          marginRight: "16px",
          backgroundColor: "white",
          borderRadius: "25px"
        }}
      >
        <img
          style={{ width: "27px", filter: "brightness(100%)" }}
          src="chrome-extension://pgbomfemkbjoldfindlckipfgmomngmh/images/image.png"
        />
      </Fab>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PR);
