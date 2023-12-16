const apiUrl = 'https://disease.sh/v3/covid-19';
const countrySelect = document.getElementById('countrySelect');
const chartContainer = document.getElementById('chartContainer');
let currentData = 'cases'; // Initialize with 'cases'
let covidChart;
// Function to create and display a bar chart
function createBarChart(data, dataType) {
  const ctx = document.getElementById('covidChart').getContext('2d');

  const chartData = {
    labels: [dataType],
    datasets: [
      {
        label: 'COVID-19 ' + dataType,
        
        data: [data[dataType]],
        backgroundColor: 'rgba(41, 128, 185, 0.4)',
        borderColor: 'rgba(41, 128, 185, 1)',
        borderWidth: 1,
      },
    ],
  };

 covidChart = new Chart(ctx, {
   type: 'bar',
   data: chartData,
   options: {
     scales: {
       x: {
         beginAtZero: true,
         grid: {
           color: 'rgba(0, 0, 0, 0.1)', // Customize grid color for x-axis
         },
         ticks: {
           color: 'black', // Customize label color for x-axis
         },
       },
       y: {
         beginAtZero: true,
         grid: {
           color: 'rgba(0, 0, 0, 0.4)', // Customize grid color for y-axis
         },
         ticks: {
           color: 'black', // Customize label color for y-axis
         },
       },
     },
      plugins: {
        legend: {
          labels: {
            color: 'black', // Customize label color for legend
          },
        },
      },
   },
 });
}

// Function to fetch COVID-19 data for a specific country and update the chart
function updateChart(country) {
    fetch(`${apiUrl}/countries/${country}`)

        .then(response => response.json())
        .then(data => {
          console.log(data);
       const  flag= document.querySelector('.flag')
       flag.innerHTML = `<img src="${data.countryInfo.flag}" alt="${data.country}">`

            // Check if the chart instance exists and destroy it
            if (covidChart) {
                covidChart.destroy();
            }
            // Create and display the bar chart with the updated data
            createBarChart(data, currentData);
        })
        .finally(() => {
            document.body.classList.remove('loading');
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function init(){
document.getElementById('casesButton').addEventListener('click', () => {
  currentData = 'cases';
  document.body.classList.add('loading');
  setTimeout(() => {
    updateChart(countrySelect.value);
  }, 200);
  // updateChart(countrySelect.value);
});

document.getElementById('deathsButton').addEventListener('click', () => {
  currentData = 'deaths';
  document.body.classList.add('loading');
  setTimeout(() => {
    updateChart(countrySelect.value);
  }, 200);
});

document.getElementById('recoveriesButton').addEventListener('click', () => {
  currentData = 'recovered';
  document.body.classList.add('loading');

  setTimeout(() => {
    updateChart(countrySelect.value);
  }, 200);
});

// Initially, display data for a specific country using the provided data and 'cases'
// Event listener for country select dropdown
document.getElementById('countrySelect').addEventListener('change', (event) => {
  document.body.classList.add('loading');

  setTimeout(() => {
    updateChart(countrySelect.value);
  }, 200);
});

// Populate the country dropdown (you need to implement this)
// You can fetch a list of available countries from the API and add options to the countrySelect element.
// The value of each option should be the country name.
// The country name should be displayed in the dropdown.
// You can use the following API endpoint to fetch the list of countries:
// https://disease.sh/v3/covid-19/countries
fetch(`${apiUrl}/countries`)

  .then((response) => response.json())
  .then((data) => {
    data
    .forEach((country) => {
        // console.log(data);
        

        const option = document.createElement('option');
        option.value = country.country;
        option.text = country.country;
        
        countrySelect.appendChild(option);
        // countrySelect.appendChild(flag);

      })
      setTimeout(() => {
        updateChart(countrySelect.value);
      }, 200);
    })
    .finally(() => {
      document.body.classList.remove('loading');
    })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });



}
// Event listeners for data buttons


//domcontentloaded
//load
//beforeunload

document.body.classList.add('loading');
document.addEventListener('DOMContentLoaded',init);


 
