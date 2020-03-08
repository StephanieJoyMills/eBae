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

function getKey(){
  return axios.request({
    method: "get",
    url: "https://23.100.26.70/get"
  });
}

function makeEbayRequest(key, data, url){
  return axios.request({
    method: "post",
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

function createReturnPolicy(key, accepted){
  return makeEbayRequest(key, {
    name: "eBae default",
    marketplaceId: "EBAY_US",
    refundMethod: "MONEY_BACK",
    returnsAccepted: accepted,
    returnShippingCostPayer: "BUYER",
    returnPeriod: {
      value: 30,
      unit: "DAY"
    }
  },
  "https://api.ebay.com/sell/account/v1/return_policy");
}

function createPaymentPolicy(key){
  return makeEbayRequest(key, {
    name: "eBaeDefault",
    marketplaceId: "EBAY_US",
		categoryTypes: [
				{
					name: "ALL_EXCLUDING_MOTORS_VEHICLES"
				}
			],
		paymentMethods: [
			{
				brands: ["VISA", "MASTERCARD"],
				paymentMethodType: "CREDIT_CARD"
			}
		]
  },
  "https://api.ebay.com/sell/account/v1/payment_policy");
}

function createFulfillmentPolicy(key, shippingCarrierCode, shippingServiceCode){
  return makeEbayRequest(key, {
    name: "eBaeDefault",
    marketplaceId: "EBAY_US",
		categoryTypes: [
				{
					name: "ALL_EXCLUDING_MOTORS_VEHICLES"
				}
			],
		globalShipping: "false",
		handlingTime: {
      unit: "DAY",
      value: "1"
		},
    shippingOption: [
      {
        costType: "FLAT_RATE",
        optionType: "DOMESTIC",
        shippingService: [
          {
            buyerResponsibleForShipping: "false",
            freeShipping: "true",
            shippingCarrierCode: shippingCarrierCode,
            shippingServiceCode: shippingServiceCode,
            shippingCost: {
              currency: "USD",
              value: "0.0"
            }
          }
        ]
      }
    ]
  },
  "https://api.ebay.com/sell/account/v1/fulfillment_policy");
}

function createItem(key, sku, itemName, aspects, description, imgurl){
  return makeEbayRequest(key, {
    product:  {
      title: itemName,
      aspects: aspects,
      description: description,
      imageUrls: [
        imgurl
      ]
    },
    condition: "NEW"
  },
  `https://api.ebay.com/sell/inventory/v1/inventory_item/${SKU}`);
}

function createOffer(key, sku, price, locationId, fulfillmentId, paymentId, returnPolicyId, description){
  return makeEbayRequest(key, {
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
    }
  },
  `https://api.ebay.com/sell/inventory/v1/offer`);
}

function publishOffer(key, offerId){
  makeEbayRequest(key, {
  },
    `https://api.ebay.com/sell/inventory/v1/offer/${offerId}/publish`);
}

function registerLocation(key, name, addressLine1, addressLine2, city, state, postalCode, country){
  return makeEbayRequest(key, {
    location: {
      address: {
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country
      }
    },
    name: name,
    merchantLocationStatus: "ENABLED",
    locationTypes: [
      "Home"
    ]
  },
  "https://api.ebay.com/sell/inventory/v1/location/1")
}

function checkFailed (then) {
  return function (responses) {
    const someFailed = responses.some(response => response.error)

    if (someFailed) {
      throw responses
    }

    return then(responses)
  }
}

function registerIds(){
  const promises = [
    createReturnPolicy(key, true),
    createPaymentPolicy(key),
    createFulfillmentPolicy(key, "USPS", "USPSPriorityFlatRateBox")
  ]
  const promisesResolved = promises.map(promise => promise.catch(error => ({ error })));
  axios.all(promisesResolved)
  .then(checkFailed(function(returnPolicy, paymentPolicy, fulfillmentPolicy){
    returnPolicyId = returnPolicy.data.returnPolicyId;
    paymentId = paymentPolicy.data.paymentPolicyId;
    fulfillmentId = fulfillmentPolicy.data.fulfillmentPolicyId;
  })).catch(errors => {
		returnPolicyId = errors[0].error.response.data.errors[0].parameters[0].value;
		paymentId = errors[1].error.response.data.errors[0].parameters[2].value;
		fulfillmentId = errors[2].error.response.data.errors[0].parameters[0].value;
  });
	console.log(returnPolicyId, paymentId, fulfillmentId);
}

function enroll(){
  getKey().then(function(resp)
    {
      key = resp.data;
      registerIds();
    });
}

function handleClick(){
  let sku = Math.floor(Math.random()*1000000);
  createItem(key, sku, itemName, aspects, description, imgurl)
  .then(() => createOffer(key, sku, price, locationId, fulfillmentId, paymentId, returnPolicyId, description).then((resp) => publishOffer(key, resp.data.offerId)));
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
      <Card className={classes.root}>
        <Typography
          component="h5"
          variant="h5"
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
                  onClick={(e) => handleClick()}
                >
                  Add to eBay
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ padding: "5px 30px" }}
                  onClick={(e) => enroll()}
                >
                  Add to eBay2
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
