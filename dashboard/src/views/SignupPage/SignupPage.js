/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import PlacesAutocomplete from "react-places-autocomplete";
import Switch from "@material-ui/core/Switch";
const axios = require("axios");
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";
// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Searchbar from "./Location";

import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.js";

import image from "assets/img/bg7.jpg";
import image2 from "assets/img/xapple-icon.png";

const useStyles = makeStyles(signupPageStyle);

async function registerIds(key, data) {
  (returnPolicyPromise = createReturnPolicy(key, true)),
    (paymentPolicyPromise = createPaymentPolicy(key)),
    (fulfillmentPromise = createFulfillmentPolicy(
      key,
      "USPS",
      "USPSPriorityFlatRateBox"
    )),
    registerLocation(
      key,
      data.address[0],
      "",
      data.address[1],
      data.address[2],
      "94112",
      data.address[3]
    ); // todo
  returnPolicyPromise
    .then((returnPolicy) => (returnPolicyId = returnPolicy.data.returnPolicyId))
    .catch((error) => {
      returnPolicyId = error.response.data.errors[0].parameters[0].value;
    });
  fulfillmentPromise
    .then(
      (fulfillmentPolicy) =>
        (fulfillmentId = fulfillmentPolicy.data.fulfillmentPolicyId)
    )
    .catch((error) => {
      fulfillmentId = error.response.data.errors[0].parameters[0].value;
    });
  let res = await axios({
    method: "post",
    url: `https://23.100.26.70/cachevars`,
    data: {
      fulfillmentId: fulfillmentId,
      locationId: "eBaeDefault",
      paymentId: paymentId,
      returnPolicyId: returnPolicyId
    }
  });
  console.log(returnPolicyId, paymentId, fulfillmentId);
}

function enroll(data) {
  getKey().then(function(resp) {
    key = resp.data;
    registerIds(key, data);
  });
}

function registerLocation(
  key,
  name,
  addressLine1,
  addressLine2,
  city,
  state,
  postalCode,
  country
) {
  return makeEbayRequest(
    key,
    {
      location: {
        address: {
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          city: city,
          state: state,
          postalCode: postalCode,
          country: country
        },
    name: name,
    merchantLocationStatus: "ENABLED",
    locationTypes: [
      "WAREHOUSE"
    ]
  },
  "https://api.ebay.com/sell/inventory/v1/location/eBaeDefault")
}

async function passInfo(data) {
  data.refund = String(data.refund);
<<<<<<< HEAD
  data.address = data.address.split(",");
  enroll(data);
=======
  console.log("HI");
  console.log(data);
  console.log(data.address);
  data.addressSplit = data.address.split(",");
	enroll(data);
>>>>>>> c12fcf778b8cd59ea09d45dd972e57f379355c47
  // (get url from server & redirect)
}

function getKey() {
  return axios.request({
    method: "get",
    url: "https://23.100.26.70/get"
  });
}

function makeEbayRequest(key, data, url) {
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

function createReturnPolicy(key, accepted) {
  return makeEbayRequest(
    key,
    {
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
    "https://api.ebay.com/sell/account/v1/return_policy"
  );
}

function createPaymentPolicy(key) {
  return makeEbayRequest(
    key,
    {
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
    "https://api.ebay.com/sell/account/v1/payment_policy"
  );
}

function createFulfillmentPolicy(
  key,
  shippingCarrierCode,
  shippingServiceCode
) {
  return makeEbayRequest(
    key,
    {
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
    "https://api.ebay.com/sell/account/v1/fulfillment_policy"
  );
}

export default function SignUpPage({ ...rest }) {
  const [checked, setChecked] = React.useState([1]);
  const [values, setValues] = React.useState({
    shipping: "",
    refund: false,
    address: ""
    // price: props.price,
    // description: "This is the description of your product",
    // quantity: 200,
    // img: props.img
  });

  const handleChange = (prop) => (event) => {
    if (prop === "refund") {
      setValues({ ...values, [prop]: !values.refund });
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  function handleEdit(data) {
    setValues({ ...values, address: data });
  }
  //
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <div id='closepage'></div>
      <img
        style={{
          width: "4%",
          position: "fixed",
          zIndex: "100",
          marginTop: "30px",
          marginLeft: "105px"
        }}
        src={image2}
      ></img>
      <Header absolute color="transparent" brand="eBae" {...rest} />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={10} md={10}>
              <Card
                className={classes.cardSignup}
                style={{ marginTop: "-20px" }}
              >
                <h2 className={classes.cardTitle}>
                  You're on your way to eBay!
                </h2>
                <CardBody>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={5} md={5}>
                      <InfoArea
                        className={classes.infoArea}
                        title="Grow you user base.."
                        description="Expand your reach by levereging eBay's massive online marketplace"
                        icon={Group}
                        iconColor="info"
                      />
                      <InfoArea
                        className={classes.infoArea}
                        title="Fast integration. Faster sales"
                        description="Right click on product to quickly add them into eBay"
                        icon={Timeline}
                        iconColor="rose"
                      />
                      <InfoArea
                        className={classes.infoArea}
                        title="Cross Site Compatible"
                        description="User eBae with each and everyone of your online stores"
                        icon={Code}
                        iconColor="primary"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={5} md={5}>
                      <div className={classes.textCenter}></div>
                      <form
                        className={classes.form}
                        style={{ marginLeft: "20px" }}
                      >
                        <Typography
                          variant="h7"
                          style={{
                            color: "rgb(76,162,244)",
                            fontSize: "18px",
                            fontWeight: "100",
                            marginTop: "25px",
                            marginLeft: "30px",
                            marginBottom: "10px"
                            // borderBottom: "solid pink 0.5px"
                          }}
                          component="h2"
                        >
                          Let's add in the few last details..
                        </Typography>
                        <div style={{ marginLeft: "15px" }}>
                          <FormControl
                            className={classes.formControl}
                            style={{ width: "100%" }}
                          >
                            <InputLabel id="demo-simple-select-label">
                              Shipping
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={values.shipping}
                              onChange={handleChange("shipping")}
                            >
                              <MenuItem value={10}>UPS</MenuItem>
                              <MenuItem value={20}>FedEx</MenuItem>
                              <MenuItem value={30}>USPS</MenuItem>
                            </Select>
                          </FormControl>
                          <div
                            style={{
                              marginLeft: "-20px",
                              width: "113%"
                            }}
                          >
                            <Searchbar onEdit={(data) => handleEdit(data)} />
                          </div>
                          <FormControlLabel
                            style={{ marginTop: "25px" }}
                            control={
                              <Switch
                                checked={values.refund}
                                onChange={handleChange("refund")}
                                value={true}
                              />
                            }
                            label="Allow Refund"
                          />

                          <div
                            className={classes.textCenter}
                            style={{ marginTop: "40px" }}
                            onClick={(e) => passInfo(values)}
                          >
                            <Button
                              round
                              color="primary"
                              style={{ backgroundColor: "rgba(62,130,212,1)" }}
                            >
                              Ready to go!
                            </Button>
                          </div>
                        </div>
                      </form>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
