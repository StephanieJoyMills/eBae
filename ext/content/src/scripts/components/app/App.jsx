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
import axios from "axios";
const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

var key = "";
var fulfillmentId = -1;
var paymentId = -1;
var returnPolicyId = -1;

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

function getKey() {
  return axios.request({
    method: "get",
    url: "https://23.100.26.70/get"
  });
}

function getCachedVars() {
  return axios.request({
    method: "get",
    url: "https://23.100.26.70/getcachedvars"
  });
}

<<<<<<< HEAD
function makeEbayRequest(key, data, url) {
=======
function makeEbayPutRequest(key, data, url){
  return axios.request({
    method: "put",
    url: url,
    data: data,
    headers: {
      "Authorization": `Bearer ${key}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Content-Language": "en-US"
    }
  });
}

function makeEbayRequest(key, data, url){
>>>>>>> eb50f319dc74b8f21ae14d7b6473fff31b44eab9
  return axios.request({
    method: "post",
    url: url,
    data: data,
    headers: {
      Authorization: `Bearer ${key}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "Content-Language": "en-US"
    }
  });
}

<<<<<<< HEAD
function createItem(key, sku, itemName, aspects, description, imgurl) {
  return makeEbayRequest(
    key,
    {
      product: {
        title: itemName,
        aspects: aspects,
        description: description,
        imageUrls: [imgurl]
      },
      condition: "NEW"
    },
    `https://api.ebay.com/sell/inventory/v1/inventory_item/${SKU}`
  );
}

function createOffer(
  key,
  sku,
  price,
  locationId,
  fulfillmentId,
  paymentId,
  returnPolicyId,
  description
) {
  return makeEbayRequest(
    key,
    {
      sku: sku,
      marketplaceId: "EBAY_US",
      format: "FIXED_PRICE",
      availableQuantity: 9999,
      merchantLocationKey: locationId,
      categoryId: 30120, // could replace with call to suggestions in the futureu
      listingDescription: description,
      listingPolicies: {
        fulfillmentPolicyId: fulfillmentId,
        paymentPolicyId: paymentId,
        returnPolicyId: returnPolicyId
      },
      pricingSummary: {
        price: {
          currency: "USD",
          value: price
        }
=======
function createItem(key, sku, itemName, aspects, description, imgurl){
  return makeEbayPutRequest(key, {
    availability:{
      shipToLocationAvailability:{
        quantity: 9999
      }
    },
    product:  {
      title: itemName.replace(/\n$/, ""),
      aspects: aspects,
      description: description,
      imageUrls: [
        imgurl
      ]
    },
    condition: "NEW"
  },
  `https://api.ebay.com/sell/inventory/v1/inventory_item/${sku}`);
}

function createOffer(key, sku, price, locationId, fulfillmentId, paymentId, returnPolicyId, description){
  return makeEbayRequest(key, {
    sku: sku,
    marketplaceId: "EBAY_US",
    format: "FIXED_PRICE",
    availableQuantity: 1,
    merchantLocationKey: locationId,
    categoryId: 30120, // could replace with call to suggestions in the futureu
    listingDescription: description,
    listingPolicies: {
      fulfillmentPolicyId: fulfillmentId,
      paymentPolicyId: paymentId,
      returnPolicyId: returnPolicyId
    },
    pricingSummary: {
      price: {
        currency: "USD",
        value: price
>>>>>>> eb50f319dc74b8f21ae14d7b6473fff31b44eab9
      }
    },
    `https://api.ebay.com/sell/inventory/v1/offer`
  );
}

<<<<<<< HEAD
function publishOffer(key, offerId) {
  makeEbayRequest(
    key,
    {},
    `https://api.ebay.com/sell/inventory/v1/offer/${offerId}/publish`
  );
}

function listItem() {
  let sku = Math.floor(Math.random() * 1000000);
  createItem(key, sku, itemName, aspects, description, imgurl).then(() =>
    createOffer(
      key,
      sku,
      price,
      locationId,
      fulfillmentId,
      paymentId,
      returnPolicyId,
      description
    ).then((resp) => publishOffer(key, resp.data.offerId))
  );
=======
function publishOffer(key, offerId){
  return makeEbayRequest(key, {
  },
    `https://api.ebay.com/sell/inventory/v1/offer/${offerId}/publish`);
}

function listItem(cv, values){
  let sku = Math.floor(Math.random()*1000000);
  createItem(key, sku, values.name, {}, values.description, values.img)
  .then(() => createOffer(key, sku, values.price, cv.locationId, cv.fulfillmentId, cv.paymentId, cv.returnPolicyId, values.description).then((resp) => publishOffer(key, resp.data.offerId)
  .then((resp) => window.open('https://www.ebay.com/itm/' + resp.data.listingId))));
>>>>>>> eb50f319dc74b8f21ae14d7b6473fff31b44eab9
}

function handleClick(values) {
  getKey().then(function(resp) {
    key = resp.data;
<<<<<<< HEAD
    getCachedVars().then(function(res) {
      cv = JSON.parse(res.data);
      listItem(cv);
=======
    getCachedVars().then(function(res){
      let cv = res.data;
      listItem(cv, values);
>>>>>>> eb50f319dc74b8f21ae14d7b6473fff31b44eab9
    });
  });
}

function App(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [values, setValues] = React.useState({
    name: props.title,
    price: props.price,
    description: "This is the description of your product",
    quantity: 200,
    img: props.img
  });
  console.log(values.img);

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
        marginTop: "55vh"
      }}
    >
      <Card
        className={classes.root}
        style={{ boxShadow: "1px 0.5px 5px  rgb(76,162,244)" }}
      >
        <Typography
          component="h4"
          style={{
            marginBottom: "18px",
            color: "rgb(76,162,244)",
            fontSize: "18px",
            letterSpacing: "2px",
            marginTop: "25px",
            marginLeft: "90px",
            textTransform: "capitalize"
          }}
        >
          Let's add your product to eBay!
        </Typography>
        <Grid container spacing={4}>
          <Grid item sm={4}>
            <img
              style={{
                width: "10vw",
                objectFit: "cover",
                maxHeight: "25vh",
                minHeight: "25vh",
                boxShadow: "1px 0.5px 5px #ccc",
                marginTop: "10px",
                textShadow: "2px 2px",
                backgroundColor: "white",
                borderRadius: "10px",
                marginLeft: "20px",
                marginRight: "0px"
              }}
              // alt="chrome-extension://lglmjaemoonckpkabihkagdfoandpjjg/images/image.png"
              src={values.img}
            ></img>
          </Grid>
          <Grid item sm={8}>
            <CardContent>
              <TextField
                id="product-name"
                label="Product Name"
                style={{
                  marginTop: "-5px",
                  width: "95%",
                  textTransform: "capitalize"
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
                  label="Description"
                  multiline
                  rows="3"
                  value={values.description}
                  onChange={handleChange("description")}
                  variant="outlined"
                  style={{
                    marginBottom: "10px",
                    width: "95%",
                    fontSize: "15px"
                  }}
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
                  onClick={(e) => handleClick(values)}
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
