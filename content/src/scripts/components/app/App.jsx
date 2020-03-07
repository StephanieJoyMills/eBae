import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: "flex"
  // },
  details: {
    // display: "flex",
    // flexDirection: "column"
  },
  content: {
    // flex: "1 0 auto"
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

function App(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [values, setValues] = React.useState({
    name: "Product Name",
    price: 100,
    description: "This is the description of your product",
    quantity: 200,
    image: ""
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    // document.addEventListener("click", () => {
    //   props.dispatch({
    //     type: "ADD_COUNT"
    //   });
    // });
  }, []);

  return (
    <div
      style={{
        all: "unset",
        width: "34vw",
        height: "33vh",
        zIndex: 1000,
        position: "fixed",
        marginLeft: "65vw",
        marginTop: "65vh"
      }}
    >
      <Card className={classes.root}>
        <Typography
          component="h4"
          variant="h4"
          style={{
            marginBottom: "17px",
            marginTop: "10px",
            marginLeft: "25px"
          }}
        >
          Add your product to eBay
        </Typography>
        <Grid container spacing={4}>
          <Grid item sm={4}>
            <img
              style={{
                width: "10vw",
                maxHeight: "25vh",
                // marginTop: "120px",
                textShadow: "2px 2px",
                boxShadow: "1px 0.5px 5px #ccc",
                backgroundColor: "white",
                borderRadius: "10px",
                marginLeft: "20px",
                marginRight: "0px"
              }}
              src="chrome-extension://lglmjaemoonckpkabihkagdfoandpjjg/images/image.png"
            ></img>
          </Grid>
          <Grid item sm={8}>
            <CardContent>
              <TextField
                id="product-name"
                label="Product Name"
                style={{
                  marginTop: "-5px",
                  width: "95%"
                  // border: "none",
                  // height: "20px",
                  // background: "none",
                  // padding: "6px 0 7px"
                }}
                value={values.name}
                onChange={handleChange("name")}
              />
              <Grid
                container
                spacing={3}
                style={{
                  marginBottom: "10px",
                  marginTop: "10px",
                  width: "100%"
                }}
              >
                <Grid item sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <FormControl
                      fullWidth
                      className={classes.margin}
                      variant="outlined"
                    >
                      <InputLabel
                        htmlFor="outlined-adornment-amount"
                        style={{
                          background: "white",
                          padding: "0px",
                          boxShadow: "0px"
                        }}
                      >
                        Price
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        // style={{ padding: "11px 15px" }}
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        value={values.price}
                        onChange={handleChange("price")}
                        labelWidth={60}
                      />
                    </FormControl>
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <FormControl
                      fullWidth
                      className={classes.margin}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Quantity
                      </InputLabel>
                      <OutlinedInput
                        // style={{ padding: "11px 15px" }}
                        id="outlined-adornment-amount"
                        value={values.quantity}
                        onChange={handleChange("quantity")}
                        labelWidth={60}
                      />
                    </FormControl>
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="h7" color="textSecondary">
                <TextField
                  id="outlined-multiline-static"
                  label="Multiline"
                  multiline
                  rows="3"
                  value={values.description}
                  onChange={handleChange("description")}
                  variant="outlined"
                  style={{ marginBottom: "10px", width: "95%" }}
                />
              </Typography>
              <div
                className={classes.controls}
                style={{
                  float: "right",
                  marginRight: "5%",
                  marginBottom: "15px"
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ padding: "5px 30px" }}
                >
                  Add to eBay
                </Button>
              </div>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default connect(mapStateToProps)(App);
