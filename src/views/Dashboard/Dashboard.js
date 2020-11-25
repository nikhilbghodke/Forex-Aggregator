import React,{useState, useEffect} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import Avatar from '@material-ui/core/Avatar';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Rating from '@material-ui/lab/Rating';
import CurrencyMenu from "components/CurrencyMenu/CurrencyMenu.js"
import Charts from 'components/Charts/Charts.js'
import axios from "axios"
import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { IconButton } from "@material-ui/core";
import { ArrowDownward, NavigateBefore } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [providers,setProviders]=useState([])
  const [from, setFrom] = React.useState("USD");
  const [to,setTo]=React.useState("EUR")
  const [filter,setFilter]=React.useState("Lowest")
  
  const getData=async ()=>{
    let res= await axios.get("/allforexProviders?limit=10")
    console.log(res.data)
    setProviders(res.data)
  }
  
  useEffect(()=>{
    getData()
    let id=setInterval(getData,60000)
    return ()=>clearInterval(id)
  },[])

  const getCards=()=>{

    return (providers.map((provider,idx)=>(
    <GridItem xs={12} sm={12} md={4} key={provider._id}>
      <Card chart>
        <CardHeader color="success">
          <Charts data={provider.rates.reduce((prev,rate)=>{
            
            let date=new Date(rate.createdAt.valueOf())
            date.setHours(date.getHours() + 5);
            date.setMinutes(date.getMinutes() + 30);
            console.log(date)
            prev.data.labels.push(date.getHours()+":"+date.getMinutes());
            //prev.data.dataseries[0].push(rate[`${from}${to}`].rate)
            prev.data.series[1].push(rate[`${from}${to}`].bid)
            prev.data.series[2].push(rate[`${from}${to}`].ask)
            prev.low=Math.min(prev.low,rate[`${from}${to}`].bid)
            prev.high=Math.max(prev.high,rate[`${from}${to}`].ask)
            return prev
          },{data:{labels:[],series:[[],[],[]]},high:0,low:100})}/>
        </CardHeader>
        <CardBody>
          <Link to="provider/reuter">
        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
          <div style={{display:"flex",justifyContent:"space-between"}}>
    <h4 className={classes.cardTitle}>{provider.title}</h4>
          <Rating  size="small" value={parseInt(provider.stars)} readOnly />
          </div>
          <p className={classes.cardCategory}>
          
            Bid rate{"  "}
            <span className={classes.successText}>
              <ArrowUpward className={classes.upArrowCardCategory} /> 75$
            </span>
          </p>
          <p className={classes.cardCategory}>
            Offer rate {"  "}
            <span className={classes.dangerText}>
              <ArrowDownward className={classes.upArrowCardCategory} /> 70$
            </span>
            
          </p>
          </Link>
        </CardBody>
        
        <CardFooter chart>
          <div className={classes.stats}>
            <AccessTime /> updated 4 minutes ago
          </div>
        </CardFooter>
      </Card>
  </GridItem>)))
  }
  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Alerts Set/Fulfilled</p>
              <h3 className={classes.cardTitle}>
                49/100 
              </h3>
            </CardHeader>
            <CardFooter stats>
            <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Forex Providers</p>
              <h3 className={classes.cardTitle}>10</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Money Saved</p>
              <h3 className={classes.cardTitle}>$7500</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Users</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      {/* //Menu bar for filter */}
      <CurrencyMenu showFilter={true} to={to} from={from} filter={filter} setFilter={setFilter} setFrom={setFrom} setTo={setTo}/>


      {/* forexcard */}
      <GridContainer>
        {providers.length>0?getCards():""}
        
        









        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      
    </div>
  );
}
