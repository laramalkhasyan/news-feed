import React from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import './Home.css';
import SourceItem from '../SourceItem/SourceItem';

function Home ({source}) {
    const history = useHistory();

    const goToSearch = item => {
        history.push({
            pathname: '/search',
            state: { data: item }
        })
    }

    return (
    <div className="home">
        <div className='home-title-wrapper'>
            <p className='home-title'>Sources</p>
        </div>
        <div className='home-list-wrapper'>
            <Grid container spacing={6}>
                {source ? source.map(item => {
                    return (
                        <Grid item key={item.id} xs={12} sm={6} md={4} lg={4} onClick={() => goToSearch(item)}>
                            <SourceItem {...item} />
                        </Grid>
                    )
                }) : null}
            </Grid>
        </div>
    </div>
    )
}

export default Home