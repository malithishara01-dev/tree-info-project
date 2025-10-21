// ----------------------------------------------------------------------------------
// **1. PASTE YOUR GOOGLE SCRIPT URL HERE!** (from Step 3)
// ----------------------------------------------------------------------------------
const GOOGLE_SCRIPT_API_BASE = 'https://script.google.com/macros/s/AKfycbycqarQF__VxioaLmq-NorHzxMOqrjWDgee2cnl4r1c83JA6g6MUf6VbUPpLD2awszCzg/exec'; 
// Example: 'https://script.google.com/macros/s/AKfycbx_T_v.../exec'
// ----------------------------------------------------------------------------------


// Get the ID parameter from the URL (e.g., '835')
const urlParams = new URLSearchParams(window.location.search);
const plantId = urlParams.get('id');

// If an ID is found in the URL, try to fetch the data
if (plantId) {
    // Combine the base URL with the plant ID to create the full request URL
    const fetchUrl = `${GOOGLE_SCRIPT_API_BASE}?id=${plantId}`;

    fetch(fetchUrl)
        .then(response => response.json())
        .then(data => {
            // Check if valid data was returned from the script
            if (data && data.Scientific_Name) {
                // SUCCESS: Update the website fields with data from the Google Sheet

                // Clear any error message
                document.getElementById('error-message').innerText = ""; 

                // Update the Scientific Name
                document.getElementById('scientific-name').innerText = data.Scientific_Name; 
                
                // Update the Family
                document.getElementById('family').innerText = data.Family;
                
                // Update the Medicinal Value
                document.getElementById('medicinal-value').innerText = data.Medicinal_Value;
                
                // Add logic to update the other fields (Origin, etc.) if needed
                
            } else {
                // Data was not found in the sheet (Plant ID is wrong or row is empty)
                document.getElementById('error-message').innerText = "Plant ID found in URL, but no matching data found in the Google Sheet.";
            }
        })
        .catch(error => {
            // Error if the network request fails (e.g., bad URL)
            document.getElementById('error-message').innerText = "Failed to connect to the data source. Check the API URL.";
            console.error('Fetch error:', error);
        });
} else {
    // If no ID is found (e.g., visiting the site with no ?id=)
    document.getElementById('error-message').innerText = "Error: No Plant ID Found in URL.";
}
