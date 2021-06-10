# News Feed WebPage

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How the project works

In the main page you will be able to see the sources of the news articles according to their county, language and category.
By clicking on any of the sources you will be redirected to the /search page, where you can see the news related to that source.
Also, in the main page you can search for any keyword, press enter and you will be redirected to the /search page where all the displayed articles are related to that keyword. However, in that case you will not be able to see the source filters on the left side. The main reason is that for me to get the sources I need some additional data like county, language and category, which I do not have as it is just searched by keyword. However, when you click on the sources on the main page the source filters would be available as the required data for the api is provided.

On the /search page I have combined the country and category filter and the sortBy and sources pairwise together, because the api provided the endpoints so that there is no other way but to combine than. For the sortBy and sources the codes are written but the api complains the there is not enough data provided for the filtered search but there is no additional data that I can give to pass this error. Thus, I commented that part to avoid unnecessary errors(but the codes are working). Also, I added infinite scroll to the filtered articles.