import React, { useEffect, useRef, useState } from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { createMuiTheme, TextField, ThemeProvider } from '@material-ui/core';
import { useHistory } from "react-router-dom";

function Header () {
    const [openInput, setOpenInput] = useState(false);
    const [inputText, setInputText] = useState('');
    const textField = useRef(null);

    const history = useHistory();

    const onChangeInput = (e) => {
        setInputText(e.target.value);
    }

    useEffect(() => {
        function handleClickOutside(event) {
          if (textField.current && !textField.current.contains(event.target)) {
            setOpenInput(false);
            setInputText('')
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [textField]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(inputText){
            history.push({
                pathname: '/search',
                state: { inputText }
            })
        }
        setOpenInput(false);
        setInputText('')
    }

    const theme = createMuiTheme({
        overrides: {
            MuiInput: {
                underline: {
                    '&:after': {
                        borderBottom: 'none',
                    },
                    '&:hover:before': {
                        borderBottom: 'none',
                    },
                    '&:hover:not($disabled):before': {
                        borderBottom: '1px solid grey',
                    }
                },
            },
            MuiSvgIcon:{
                root:{
                    color: 'black'
                }
            }
        },
    });

    const onIconClick = (e) => {
        setOpenInput(!openInput)
    }
    return (
        <div className="header-wrapper">
            <div className='header'>
                    <p className='header-title'>News</p>
                <div>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                    {openInput ? 
                        <ThemeProvider theme={theme}>
                        <TextField
                            ref={textField}
                            autoFocus
                            style={{minWidth:'300px'}}
                            onChange={(e) => onChangeInput(e)}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment onClick={(e)=>handleSubmit(e)}>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                                )
                            }}
                        />
                        </ThemeProvider> : <SearchIcon className="header-search-icon" onClick={(e)=> onIconClick(e)} /> }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Header;