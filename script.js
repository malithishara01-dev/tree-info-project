// ----------------------------------------------------------------------------------
// 1. PASTE THE GOOGLE SCRIPT URL YOU COPIED IN TASK 1 HERE:
// ----------------------------------------------------------------------------------
const GOOGLE_SCRIPT_API_BASE = 'https://script.google.com/macros/s/AKfycbyWWFHP0cymDVvqKTN5Fx3i0-AdsWok0YTc1VU-NpUM8xOvpbnbyHk56kRlZbK4tt4rIA/exec'; 
// ----------------------------------------------------------------------------------

// Get the ID parameter from the Netlify URL (e.g., '835')
const urlParams = new URLSearchParams(window.location.search);
const plantId = urlParams.get('id');

// If an ID is found, try to fetch the data
if (plantId) {
    const fetchUrl = `${GOOGLE_SCRIPT_API_BASE}?id=${plantId}`;

    fetch(fetchUrl)
        .then(response => response.json())
        .then(data => {
            // Check if valid data was returned from the script (using a column name from your sheet)
            if (data && data.Scientific_Name) {
                // SUCCESS: Update the website fields

                // **2. CUSTOMIZE: Update the element IDs below to match your HTML**
                document.getElementById('scientific-name').innerText = data.Scientific_Name; 
                document.getElementById('family').innerText = data.Family;
                document.getElementById('medicinal-value').innerText = data.Medicinal_Value; 
                // ... add other fields like Origin, Status, etc.
                
                document.getElementById('error-message').innerText = ""; // Clear error
            } else {
                // Data not found in the sheet for that ID
                document.getElementById('error-message').innerText = "Plant ID found in URL, but no matching data found in the Google Sheet.";
            }
        })
        .catch(error => {
            // Network failure—this is the error that likely causes the "Loading..." state
            document.getElementById('error-message').innerText = "Failed to connect to the data source.";
            console.error('Fetch error:', error);
        });
} else {
    // No Plant ID Found in URL
    document.getElementById('error-message').innerText = "Error: No Plant ID Found in URL.";
}

---

## 🚀 Task 3: Redeploy Your Website to Netlify

The change won't appear until you update your site on Netlify.

1.  **Save** your local JavaScript file.
2.  **Commit and Push** the changes to your GitHub/GitLab repository.
3.  Netlify will automatically build and deploy the new version of your website with the correct API link.

Once these steps are complete, the website should successfully load the data for `?id=835` (Sudu handun) instead of getting stuck on loading.

