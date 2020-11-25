import React from "react";
// @material-ui/core components
import { makeStyles,withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import ChartistGraph from "react-chartist";
import Avatar from '@material-ui/core/Avatar';
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Rating from '@material-ui/lab/Rating';
import CurrencyMenu from "components/CurrencyMenu/CurrencyMenu"
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Maps from "views/Maps/Maps"

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import { Box, IconButton, Typography } from "@material-ui/core";
import { ArrowDownward, NavigateBefore } from "@material-ui/icons";
import { Link } from "react-router-dom";
import avatar from "assets/img/faces/marc.jpg";
import cardStlyesObj from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import cardStyle from "assets/jss/material-dashboard-react/components/cardStyle";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};
const StyledRating = withStyles({
  iconFilled: {
    color: '#ffb400',
  },
  iconHover: {
    color: '#ffb400',
  },
})(Rating);
const useStyles = makeStyles(styles);
const cardStyles= makeStyles(cardStlyesObj)

export default function UserProfile() {
  const [value, setValue] = React.useState(3);
  const [from, setFrom] = React.useState("USD");
  const [to,setTo]=React.useState("EUR")
  const [filter,setFilter]=React.useState("Lowest")
  const classes = useStyles();
  const classes2= cardStyles()
  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Forex Provider</h6>
              <h4 className={classes.cardTitle}>Reuters</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
              <p>
              <Rating  value={4} readOnly />
              </p>
              
            </CardBody>
          </Card>
        </GridItem>
      <GridItem xs={12} sm={12} md={8}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              
              <div style={{display:"flex", justifyContent:"space-around"}}>
              <p className={classes.cardCategory}>
              
                Bid rate{"  "}
                <span className={classes2.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 75$
                </span>
              </p>
              <p className={classes2.cardCategory}>
                Offer rate {"  "}
                <span className={classes2.dangerText}>
                  <ArrowDownward className={classes2.upArrowCardCategory} /> 70$
                </span>
                
              </p>
              </div>
            <CurrencyMenu showFilter={false} to={to} from={from} filter={filter} setFilter={setFilter} setFrom={setFrom} setTo={setTo}  />
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>


        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Post something</h4>
              <p className={classes.cardCategoryWhite}>Will be shown to people following you</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Post Content</InputLabel>
                  <CustomInput
                    labelText="Posting regulary to stay in connect with your customers can help..."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Post</Button>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Review Providers</h4>
              <p className={classes.cardCategoryWhite}>Helpful for newbies and feedback for Provider</p>
            </CardHeader>
            <CardBody>
              <GridContainer alignItems="center">
                <GridItem xs={12} sm={12} md={12}>
                
                    <Typography component="legend">Ratting</Typography>
                    <StyledRating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      size="large"
                    />
                  
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Review Content</InputLabel>
                  <CustomInput
                    labelText="Posting regulary to stay in connect with your customers can help..."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                  
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Post</Button>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Previous Posts</h4>
              <p className={classes.cardCategoryWhite}>Will be shown to people following you</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <GridContainer spacing={4} alignItems="center" justify="center">
                      <GridItem xs={2}>
                      <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                      </GridItem>
                      <GridItem xs ={7}>
                        <Typography variant="body1" gutterBottom>
                        We are happy to announce that we are oppening our new store in Banner,Pune
                        </Typography>
                      </GridItem>
                      <GridItem xs ={3}>
                        <Typography variant="caption"> Nov 21, 2020</Typography>
                       
                      </GridItem>
                    </GridContainer>
                  </Card>
                  
                </GridItem>
                
              </GridContainer>
            </CardBody>
          
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Reviews</h4>
              <p className={classes.cardCategoryWhite}>Past Experiences of Customers</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <GridContainer spacing={4} alignItems="center" justify="center">
                      <GridItem xs={2}>
                      <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                      </GridItem>
                      <GridItem xs ={7}>
                        <Typography variant="body1" gutterBottom>
                          Great and Timely Service, would Consider again
                        </Typography>
                      </GridItem>
                      <GridItem xs ={3}>
                        
                        <Rating  value={4} readOnly size="small"/>
                        <Typography variant="caption"> Nov 21, 2020</Typography>
                      </GridItem>
                    </GridContainer>
                  </Card>
                  
                </GridItem>
                
              </GridContainer>
            </CardBody>
          
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Maps/>
        </GridItem>
        
      </GridContainer>
    </div>
  );
}
