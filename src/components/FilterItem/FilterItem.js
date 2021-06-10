import { Checkbox, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './FilterItem.css'
import getCountryName from '../../utils/getCountryName';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

const useStyles = makeStyles(theme =>
    createStyles({
      smallRadioButton: {
        "& svg": {
          width: "0.5em",
          height: "0.5em"
        }
      }
    })
  );

function FilterItem (props) {
    const [checked, setChecked] = useState('');
    const classes = useStyles();

    useEffect(()=>{
        props.setFilter(checked)
    },[checked])

    const handleChange = event => {
        if (event.target.value === checked) {
            setChecked('')
        } else {
            setChecked(event.target.value)
        }
    }
    

    return (
        <div className='filter'>
            <p>{props.filterTitle}</p>
            <div className='filter-options'>
                <FormGroup component="fieldset">
                    <RadioGroup row aria-label="position" value={checked} name="filter">
                        <Grid container spacing={1} >
                        { 
                            props.filterTitle !== 'Source' ?
                            props.filterItems.map(item => {
                                return (
                                    <Grid item xs={4} key={item}>
                                        <FormControlLabel value={item} control={<Radio color="primary" onClick={handleChange} />} 
                                        label={
                                        <Typography style={{fontSize:'13px'}}>
                                            {props.filterTitle === 'Country' ? getCountryName(item) : capitalizeFirstLetter(item)}
                                        </Typography>} className={classes.smallRadioButton}/>
                                    </Grid>
                                )
                            }) :
                            props.filterItems?.map(item => {
                                return (
                                    <Grid item xs={4} key={item.id}>
                                        <FormControlLabel value={item.id} control={<Radio color="primary" onClick={handleChange} />} 
                                        label={<Typography style={{fontSize:'13px'}}>
                                            {item.name}
                                        </Typography>} className={classes.smallRadioButton}/>
                                    </Grid>
                                )
                            })
                        }
                        </Grid>
                    </RadioGroup>
                </FormGroup>
            </div>
        </div>
    )
}

export default FilterItem