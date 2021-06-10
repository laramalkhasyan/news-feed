import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withRouter } from 'react-router';
import './Search.css';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import Grid from '@material-ui/core/Grid';
import FilterItem from '../FilterItem/FilterItem';
import { categoryList, countryList } from '../../utils/getCountryName';
import ArticleItem from '../ArticleItem/ArticleItem';
import { getFilteredHeadlines, getSearchedSources, getFilteredSources, getSortByAndSource, getHeadlinesByKeyword } from '../../api/requests';
import InfiniteScroll from 'react-infinite-scroll-component';

const sortByOptions = ['relevancy','popularity','publishedAt']

function Search (props) {
    const [searchData, setSearchData] = useState();
    const [countryFilter, setCountryFilter] = useState();
    const [categoryFilter, setCategoryFilter] = useState();
    const [sourceFilter, setSourceFilter] = useState();
    const [sourceList, setSourceList] = useState();
    const [hasMore, setHasMore] = useState(true);
    const [formSearch, setFormSearch] = useState();
    const [sortBy, setSortBy] = useState();

    const handleSortByChange = (event) => {
        const name = event.target.value;
        setSortBy(name);
    }

    useEffect(()=>{
        if(countryFilter || categoryFilter) {
            getFilteredHeadlines(countryFilter, categoryFilter).then(res=>{
                setSearchData(res.data.articles)
            })
        }
    },[countryFilter, categoryFilter])

    // useEffect(()=>{
    //     if (sortBy || sourceFilter) {
    //         getSortByAndSource(sortBy, sourceFilter).then(res=>{
    //             setSearchData(res.data.articles)
    //         })
    //     }
    // },[sortBy, sourceFilter])

    useEffect(()=> {
        if (props.location.state.inputText){
            getHeadlinesByKeyword(props.location.state.inputText).then(res=>{
                setSearchData(res.data.articles)
                setFormSearch(true)
            })
        } else {
            const data = props.location.state.data
            getSearchedSources(data).then(res=>{
                setSearchData(res.data.articles)
                setFormSearch(false)
            })
            getFilteredSources(data.category,data.language,data.country).then(res=>{
                setSourceList(res)
            })
        }
    },[])

    const fetchData = () => {
        const page = searchData.length / 20 + 1;
        if((searchData?.length % 20) !== 0){
            setHasMore(false)
        }
        if(formSearch) {
            getHeadlinesByKeyword(props.location.state.inputText, page).then(res=>{
                const temp = searchData.concat(res.data.articles)
                setSearchData(temp)
            })
        }else {
            getFilteredHeadlines(countryFilter, categoryFilter, page).then(res=>{
                const temp = searchData.concat(res.data.articles)
                setSearchData(temp)
            })
        }
    }
    return (
        <div className='search-wrapper'>
            <div className='search-options'>
                <Button>Clear</Button>
                <FormControl className='search-sorting' disabled={Boolean(countryFilter || categoryFilter)}>
                    <InputLabel id="demo-simple-select-label">Sort by:</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={sortByOptions[2]}
                        onChange={handleSortByChange}
                        >
                        <MenuItem value={sortByOptions[2]}>{capitalizeFirstLetter(sortByOptions[2])}</MenuItem>
                        <MenuItem value={sortByOptions[1]}>{capitalizeFirstLetter(sortByOptions[1])}</MenuItem>
                        <MenuItem value={sortByOptions[0]}>{capitalizeFirstLetter(sortByOptions[0])}</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className='search-main'>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <div className='search-filters'>
                            <div style={{width:'100%'}}>
                                <input className='search-input' placeholder='Search...'/>
                            </div>
                            {
                                !sourceFilter ? 
                                <><FilterItem filterTitle='Country' filterItems={countryList} setFilter={setCountryFilter}/>
                                <FilterItem filterTitle='Category' filterItems={categoryList} setFilter={setCategoryFilter}/></> : null
                            }
                            
                            {
                                !(countryFilter || categoryFilter) ?
                                <FilterItem filterTitle='Source' filterItems={sourceList} setFilter={setSourceFilter}/>: null}
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                    <InfiniteScroll dataLength={searchData ? searchData.length : 20}
                        endMessage={
                        <p style={{ textAlign: 'center' }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                      loader={<h4>Loading...</h4>}
                      hasMore={hasMore}
                      next={fetchData}>
                        <ArticleItem article={searchData}/>
                    </InfiniteScroll>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default withRouter(Search)