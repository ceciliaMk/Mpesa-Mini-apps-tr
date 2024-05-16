const fetch = require('node-fetch'); // Import node-fetch for making HTTP requests
//const stolenness = 'all';

// Define the bearer token
const BEARER_TOKEN = 'put your own'; // Replace 'YOUR_BEARER_TOKEN' with your actual bearer token

// Function to fetch data from the Bike Index API
async function fetchBikes() {
    const url = `https://bikeindex.org/api/v3/search?stolenness=all&per_page=10`;
    try {
      const response = await fetch(url, {
          headers: {
              'Authorization': `Bearer ${BEARER_TOKEN}`,
             'Content-Type':'application/json'
          }
      });
      const data = await response.json();
      const status = response.status;
      if (status == 200){
        console.log('success');
        return {status: true,data:body};

      } else{
        console.log(error);
      }

        return {status: false};

      } catch (error){
        console.error(error);

      }
    }

// Function to display the list of bikes
async function displayBikes() {
  try{
  // Call the fetchBikes function to fetch bikes data
  const bikes = await fetchBikes();
  const resultsList = document.getElementById('results');
  //resultsList.innerHTML = ''; // Clear previous results
  if (response.status === true) {
    const data = response.data;
    const bikeresults = data.results;
      bikeresults.forEach(bikeresult => {
          const li = document.createElement('li');
          const description = bikeresult.description;
        
          li.textContent = description;
        
          resultsList.append(li);
      });

  } else {
    const li = document.createElement('li');
    const message = 'No bikes found.';
    li.textContent = message;
    resultsList.append(li);
    
  }
} catch (error){
  console.error(error);
}
}
    
window.onload = displayBikes;