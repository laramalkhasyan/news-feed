import api from './axios'

export async function getAllSources () {
    const data = await api.get('/v2/sources');
    return data.data.sources;
}

export async function getFilteredSources (category, language, country) {
    const data = await api.get('/v2/sources', { params: { category, language, country }});
    return data.data.sources;
}

export async function getSearchedSources (item,page=1) {
    const data = await api.get('/v2/everything', { params: { sources: item.id, pageSize: 20,page } } );
    return data;
}

export async function getFilteredHeadlines (countryFilter,categoryFilter, page=1) {
    const data = await api.get('/v2/top-headlines', { params: { country: countryFilter, category:categoryFilter, pageSize: 20, page } } );
    return data;
}

export async function getHeadlinesByKeyword (q,page=1) {
    const data = await api.get('/v2/top-headlines', { params: { q , pageSize: 20,page } } );
    return data;
}

export async function getSortByAndSource (sortBy, source) {
    const data = await api.get('/v2/everything', { params: { sortBy, source, pageSize: 20 } } );
    return data;
}