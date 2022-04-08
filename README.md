## Adding new cities

There is an option to pull all city data (descriptions, img src, etc.) from Opendatasoft; however, to reduce the number of API calls made per day (limit of 10,000) right now this data is being stored locally in `cities.json`. To initiate adding a new city simply add a new entry to this array and add the applicable key/value pairs.

To do this, you can update the [cities spreadsheet](https://docs.google.com/spreadsheets/d/1-mPapTDizDicf4FPlKVQuDeujC6zYCxJa7yAZ5Gfh40/edit#gid=0) and then convert from csv to json.

Pages that use this info:
`CityTemplate.js`
`ExploreAll.js`
`SuggestedCities.js`

Data for fact cards is pulled in via the Opendatasoft API. The value dataset lives on [The Grid](https://pivothub.youthfulcities.com/explore/dataset/refugee-data/table/) and has to be updated with values for each measurement for each new city. While contact information for individual resources isn't shown in the app, clicking "More information" takes the user to the [resource dataset](https://pivothub.youthfulcities.com/explore/dataset/resource-data/table/), which the # of resources was counted from. The search functionality uses Opendatasoft's text search provided by their API.

Page that uses this info:
`CityTemplate.js`

The value dataset on The Grid is used to populate `values.json`, which is for scoring. The per capita calcuation for each city is added.

Files that use this info:
`calcCity.js` (called by `SuggestedCities.js`)

Each measurement has a variable name assigned to it. Additional information for each measurement, including what category it falls into, the name to be used in the app, and what demographic it matches for scoring is found in `additionalInfo.js`. A record of which measurements are included/excluded and what demographics were assigned to them can be found [here](https://docs.google.com/spreadsheets/d/1-Z7SETCDvQp_h7UU15nTUc8p-i5EAWeNtc3xV1mChzk/edit#gid=581557288). The demographic measurements are only used to populate a suggested list for the user; they aren't used to determine scoring beyond that. See explaination of the scoring system below.

Pages that use this info:
`CreateProfile.js`

## How the scoring system works

On the initial "Create Profile" page the user chooses the # of people in their family and the age demographics in their family. This information is used to populate a suggested set of measurements according to `additionalInfo.js`. These are preselected in the following screens, but the user can choose to select or deselect any measurements they choose. Only measurements confirmed by the user are used to generate a score.

The values in `values.json` are filtered to include only the ones selected by the user. Each measurement has a type, "# of", "dollar value", or "numerical". The difference between "# of" and "numerical" is that "# of" is used for counting up resources; therefore scores for these values are calculated based on the per capita value instead of the absolute value.

Additional info in `additionalInfo.js` indicates whether a higher score is better or a lower score is better. For scores where higher is better, the normalization formula `(𝑥-𝑥_min)/(𝑥_max-𝑥_min)` is applied. For scores where lower is better, the normalization formula `1-(𝑥-𝑥_min)/(𝑥_max-𝑥_min)` is applied. This means the city with the highest value is awarded 1 point, the city with the lowest value is awarded 0 points, and everything else falls somewhere in between.

During testing it was noticed that scores seemed quite low even for the highest scoring cities. It was worried that refugees might be discouraged from checking out any of their suggested cities, so an additional step was added. For any "# of" score where there was at least 1 resource, the score was adjusted to fall between 0.3 - 1 instead of 0 - 1. The formula to do this is `value_new = (max_new − min_new / max_old − min_old) * (value_old − max_old) + max_new`. This means the city would be awarded at least 0.3 points. The reasoning behind this was that having at least 1 resource for a given measurement is significantly better than having none. This had little impact on how the cities ranked but did increase the scores slightly.

After scores for each measurement for each city are calculated, the scores are added together and the cities are sorted based on which cities scored the highest. Only the top 3 are shown to the user.

The calculations are performed client-side for ease of hosting and putting the test app together but could be moved to a simple server in the future.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
