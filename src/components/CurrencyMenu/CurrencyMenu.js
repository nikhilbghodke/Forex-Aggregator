import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Card } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CurrencyMenu(props) {
  const classes = useStyles();
  const [from, setFrom] = React.useState("Dollar");
  const [to,setTo]=React.useState("Euro")
  const [filter,setFilter]=React.useState("Lowest")

  

  return (
    <Card style={{display:"flex",justifyContent:"space-evenly", marginBottom:"10px"}} elevation="10">
      
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="from">
          From
        </InputLabel>
        <Select
          labelId="from"
          id="from"
          name="from"
          value={from}
          onChange={(e)=>{
            setFrom(e.target.value)
          }}
          
        >
          <MenuItem value={"Dollar"}>Dollar</MenuItem>
          <MenuItem value={"Euro"}>Euro</MenuItem>
          <MenuItem value={"Ruppe"}>Indian Ruppe</MenuItem>
        </Select>
        <FormHelperText>You have this currency</FormHelperText>
      </FormControl>


      <FormControl className={classes.formControl}>
        <InputLabel shrink id="from">
          To
        </InputLabel>
        <Select
          labelId="from"
          id="from"
          name="from"
          value={to}
          onChange={(e)=>{
            setTo(e.target.value)
          }}
          
        >
          <MenuItem value={"Dollar"}>Dollar</MenuItem>
          <MenuItem value={"Euro"}>Euro</MenuItem>
          <MenuItem value={"Ruppe"}>Indian Ruppe</MenuItem>
        </Select>
        <FormHelperText>You want this currency</FormHelperText>
      </FormControl>
      {props.filter?
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="filter">
          Filter By
        </InputLabel>
        <Select
          labelId="filter"
          id="filter"
          name="filter"
          value={filter}
          onChange={(e)=>{
            setFilter(e.target.value)
          }}
        >
          <MenuItem value={"Ratting"}>Ratting</MenuItem>
          <MenuItem value={"Lowest"}>Lowest</MenuItem>
          <MenuItem value={"Highest"}>Highest</MenuItem>
        </Select>
        <FormHelperText>Filter By</FormHelperText>
      </FormControl>:<span/>}
      
    </Card>
  );
}
