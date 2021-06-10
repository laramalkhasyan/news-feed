import React, { useEffect, useState } from 'react';
import './SourceItem.css';
import Card from '@material-ui/core/Card';
import getCountryName from '../../utils/getCountryName';
import getLanguageName from '../../utils/getLanguageName';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

function SourceItem ({name, description, country, language, category}){

    const [countryName, setCountryName] = useState('');
    const [languageName, setLanguageName] = useState('');

    useEffect(()=>{
        if(country){
            setCountryName(getCountryName(country))
        }
    },[countryName])

    useEffect(()=>{
        if(language){
            const temp = getLanguageName(language);
            setLanguageName(temp);
        }
    },[languageName])

    return (
        <Card className='card'>
            <div className='source-item'>   
                <div className='source-name'>
                    <p>
                        {name}
                    </p>
                </div>
                <div className='source-description'>
                    <p>
                        {description}
                    </p>
                </div>
                <div className='source-category'>
                    <p>
                        {capitalizeFirstLetter(category)}
                    </p>
                    <p>
                        {languageName}
                    </p>
                    <p>
                        {countryName}
                    </p>
                </div>
            </div>
        </Card>
        
    )
}

export default SourceItem