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
import Alerts from "components/Alerts/Alerts"
import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Grid, IconButton } from "@material-ui/core";
import { ArrowDownward, NavigateBefore } from "@material-ui/icons";
import { Link } from "react-router-dom";
import {API_URL} from "constants.js"
const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [providers,setProviders]=useState([])
  const [from, setFrom] = React.useState("USD");
  const [to,setTo]=React.useState("EUR")
  const [filter,setFilter]=React.useState("Rating")
  const[quantity,setQuantity]=React.useState(10)
  
  const getData=async ()=>{
    let res= await axios.get(`${API_URL}/allforexProviders?limit=`+quantity)
    //console.log(res.data)
    setProviders(res.data)
  }
  
  useEffect(()=>{
    getData()
    let id=setInterval(getData,5000)
    return ()=>clearInterval(id)
  },[quantity])

  const sortComparator=(a,b)=>{
    let bidA=a.rates.length!=0?a.rates[0][`${from}${to}`].bid:0
    let bidB=b.rates.length!=0?b.rates[0][`${from}${to}`].bid:0
    if(filter=="Lowest")
      return bidA-bidB
    if(filter=="Highest")
      return bidB-bidA
    if(filter=="Rating")
      return b.stars-a.stars 
  }

  const getCards=()=>{
    
    return (providers.sort(sortComparator).map((provider,idx)=>{
      let bidChange= provider.rates.length>1?((provider.rates[0][`${from}${to}`].bid-provider.rates[1][`${from}${to}`].bid)).toFixed(7):0;
      let askChange= provider.rates.length>1?((provider.rates[0][`${from}${to}`].ask-provider.rates[1][`${from}${to}`].ask)).toFixed(7):0;
      let spreadChange=(askChange-bidChange).toFixed(7)
      let bid= provider.rates.length!=0?provider.rates[0][`${from}${to}`].bid:0
      let ask= provider.rates.length!=0?provider.rates[0][`${from}${to}`].ask:0
      let spread=(ask-bid).toFixed(7)
      let endTime=new Date(provider.rates.length!=0?provider.rates[0].createdAt:Date.now).toLocaleTimeString()
      let startTime=new Date(provider.rates.length!=0?provider.rates[provider.rates.length-1].createdAt:Date.now).toLocaleTimeString()
      let highestBid=0,lowestBid=1000,highestAsk=0,lowestAsk=0,lowestSpread=Number.MAX_SAFE_INTEGER,highestSpread=Number.MIN_SAFE_INTEGER;
      for(let rate of provider.rates){
        let b=rate[`${from}${to}`].bid
        let a=rate[`${from}${to}`].ask
        let s=(a-b).toFixed(7)

        highestBid=Math.max(highestBid,b)
        lowestBid=Math.min(lowestBid,b)

        highestAsk=Math.max(highestAsk,a)
        lowestAsk=Math.min(lowestAsk,a)

        highestSpread=Math.max(highestSpread,s)
        lowestSpread=Math.min(lowestSpread,s)
      }

      return (
    <GridItem xs={12} sm={12} md={10} key={provider._id}>
      <Card chart>
        <CardHeader color={bidChange>0?"success":"primary"}>
          <Charts data={provider.rates.reduce((prev,rate)=>{
            
            let date=new Date(rate.createdAt.valueOf())
            // date.setHours(date.getHours() + 5);
            // date.setMinutes(date.getMinutes() + 30);
            console.log(date)
            prev.data.labels.unshift(date.getHours()+":"+date.getMinutes());

            prev.data.series[1].unshift(rate[`${from}${to}`].bid)
            prev.data.series[2].unshift(rate[`${from}${to}`].ask)
            prev.low=Math.min(prev.low,rate[`${from}${to}`].bid)
            prev.high=Math.max(prev.high,rate[`${from}${to}`].ask)
            return prev
          },{data:{labels:[],series:[[],[],[]]},high:0,low:100})}/>
        </CardHeader>
        <CardBody>
          <Link to={"provider/"+provider.title}>
        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
          <div style={{display:"flex",justifyContent:"space-between"}}>
    <h4 className={classes.cardTitle}>{provider.title}</h4>
          <Rating  size="small" value={parseInt(provider.stars)} readOnly />
          </div>
          <GridContainer>
            <GridItem xs={4}>
          <p className={classes.cardCategory}>
            Bid rate{"  "}
            <span className={bid>=0?classes.successText:classes.dangerText}>
            {bid>=0?<ArrowUpward className={classes.upArrowCardCategory} />:<ArrowDownward className={classes.upArrowCardCategory} />}
            {bid}
            </span>
          </p>
          </GridItem>
          <GridItem xs={4}>
          <p className={classes.cardCategory}>
            Ask rate {"  "}
            <span className={ask>=0?classes.successText:classes.dangerText}>
            {ask>=0?<ArrowUpward className={classes.upArrowCardCategory} />:<ArrowDownward className={classes.upArrowCardCategory} />} 
              {ask}
            </span>
          </p>
          </GridItem>
          <GridItem xs={4}>
          <p className={classes.cardCategory}>
            Spread rate {"  "}
            <span className={spread>=0?classes.successText:classes.dangerText}>
            {spread>=0?<ArrowUpward className={classes.upArrowCardCategory} />:<ArrowDownward className={classes.upArrowCardCategory} />} 
              {spread}
            </span>
          </p>
          </GridItem>
          <GridItem xs={4}>
          <p className={classes.cardCategory}>
            Latest Bid Change {"  "}
            <span className={bidChange>=0?classes.successText:classes.dangerText}>
            {bidChange>=0?<ArrowUpward className={classes.upArrowCardCategory} />:<ArrowDownward className={classes.upArrowCardCategory} />} 
              {bidChange}
            </span>
          </p>
          </GridItem>
          <GridItem xs={4}>
          <p className={classes.cardCategory}>
            Latest Ask Change {"  "}
            <span className={askChange>=0?classes.successText:classes.dangerText}>
            {askChange>=0?<ArrowUpward className={classes.upArrowCardCategory} />:<ArrowDownward className={classes.upArrowCardCategory} />} 
              {askChange}
            </span>
          </p>
          </GridItem>
          <GridItem xs={4}>
          <p className={classes.cardCategory}>
            Latest Spread Change {"  "}
            <span className={spreadChange>=0?classes.successText:classes.dangerText}>
            {spreadChange>=0?<ArrowUpward className={classes.upArrowCardCategory} />:<ArrowDownward className={classes.upArrowCardCategory} />} 
              {spreadChange}
            </span>
          </p>
          </GridItem>
          <GridItem xs={4}>
          <p className={classes.cardCategory}>
            Highest Bid {"   "}
            <span >
            {highestBid}
            </span>
          </p>
          </GridItem>
          <GridItem xs={4}>
          <p className={classes.cardCategory}>
            Highest Ask {"   "}
            <span >
            {highestAsk}
            </span>
          </p>
          </GridItem>
          <GridItem xs={4}>
          <p className={classes.cardCategory}>
            Highest Spread {"   "}
            <span >
            {highestSpread}
            </span>
          </p>
          </GridItem>
          <GridItem xs={4}>
          <p className={classes.cardCategory}>
            Lowest Bid {"   "}
            <span >
            {lowestBid}
            </span>
          </p>
          </GridItem>
          <GridItem xs={4}>
          <p className={classes.cardCategory}>
            Lowest Ask {"   "}
            <span >
            {lowestAsk}
            </span>
          </p>
          </GridItem>
          <GridItem xs={4}>
          <p className={classes.cardCategory}>
            Lowest Spread {"   "}
            <span >
            {lowestSpread}
            </span>
          </p>
          </GridItem>
          </GridContainer>
          </Link>
        </CardBody>
        
        <CardFooter chart>
          
          <div className={classes.stats}>
            <AccessTime /> updated {provider.rates.length!=0?(new Date().getMinutes()-new Date(provider.rates[0].createdAt).getMinutes()):0} minutes ago
          </div>
          <div className={classes.stats}>
            <AccessTime /> Start Time {startTime}
          </div>
          <div className={classes.stats}>
            <AccessTime /> Last Rate {endTime}
          </div>
        </CardFooter>
      </Card>
  </GridItem>)}))
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
      <CurrencyMenu showFilter={true} to={to} from={from} filter={filter} setFilter={setFilter} setFrom={setFrom} setTo={setTo} quantity={quantity} setQuantity={setQuantity}/>


      

      {/* forexcard */}
      <GridContainer justify="center">
        {providers.length>0?getCards():""}
      </GridContainer>
      <Alerts providers={providers}/>  
    </div>
  );
}
