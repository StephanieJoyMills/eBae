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

const useStyles = makeStyles(signupPageStyle);


function registerIds(key, data){
    returnPolicyPromise = createReturnPolicy(key, true),
    paymentPolicyPromise = createPaymentPolicy(key),
    fulfillmentPromise = createFulfillmentPolicy(key, "USPS", "USPSPriorityFlatRateBox"),
		registerLocation(key,); // todo
		returnPolicyPromise.then((returnPolicy) =>
    returnPolicyId = returnPolicy.data.returnPolicyId)
		.catch(error => {
		  returnPolicyId = error.response.data.errors[0].parameters[0].value;
    });
		paymentPolicyPromise.then((paymentPolicy) =>
    paymentId = paymentPolicy.data.paymentPolicyId)
		.catch(error => {
		  paymentId = error.response.data.errors[0].parameters[2].value;
    });
		fulfillmentPromise.then((fulfillmentPolicy) =>
    fulfillmentId = fulfillmentPolicy.data.fulfillmentPolicyId)
		.catch(error => {
		  fulfillmentId = error.response.data.errors[0].parameters[0].value;
    });
	  console.log(returnPolicyId, paymentId, fulfillmentId);
}

function enroll(data){
  getKey().then(function(resp)
    {
      key = resp.data;
      registerIds(key, data);
    });
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
  "https://api.ebay.com/sell/inventory/v1/location/eBaeDefault")
}


async function passInfo(data) {
  data.refund = String(data.refund);
	enroll(data);
  let res = await axios({
    method: "post",
    url: `https://23.100.26.70/cachevars`,
    data: data
  });
  // (get url from server & redirect)
}

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
                        title="Effortless additions"
                        description="Right click on product to quickly add them into eBay"
                        icon={Timeline}
                        iconColor="rose"
                      />
                      <InfoArea
                        className={classes.infoArea}
                        title="Cross Site Compatible"
                        description="User eBae with each and everone of your online stores"
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
                            color: "rgb(136,136,136)",
                            fontSize: "18px",
                            fontWeight: "100",
                            marginTop: "15px",
                            marginBottom: "37px",
                            borderBottom: "solid rgba(0, 0, 0, 0.5) 0.5px"
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
                            <Button round color="primary">
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
