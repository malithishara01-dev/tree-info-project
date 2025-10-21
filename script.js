// ** IMPORTANT: Replace with the actual URL from your Google Apps Script Web App deployment **
const API_URL = 'https://script.google.com/macros/s/AKfycbycqarQF__VxioaLmq-NorHzxMOqrjWDgee2cnl4r1c83JA6g6MUf6VbUPpLD2awszCzg/exec';

document.addEventListener('DOMContentLoaded', () => {
    // 1. GET THE PLANT ID FROM THE URL
    // When the QR code is scanned, the URL will look like: 
    // https://yourdomain.com/index.html?id=918
    const params = new URLSearchParams(window.location.search);
    const plantId = params.get('id');

    if (plantId) {
        fetchTreeData(plantId);
    } else {
        document.getElementById('local-name').textContent = "Error: No Plant ID Found in URL.";
    }
});

async function fetchTreeData(id) {
    // 2. CALL THE GOOGLE APPS SCRIPT API
    try {
        // Append the plant ID to the API URL
        const response = await fetch(`${API_URL}?id=${id}`);
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check if the API returned actual data (your Apps Script should handle this)
        if (data && data.status === 'success' && data.tree) {
            // 3. DISPLAY THE DATA ON THE PAGE
            renderTreeInfo(data.tree); 
        } else {
             document.getElementById('local-name').textContent = `Tree ID ${id} not found.`;
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById('local-name').textContent = "Failed to load tree data. Check API connection.";
    }
}

// 4. FUNCTION TO POPULATE THE HTML ELEMENTS
function renderTreeInfo(tree) {
    // Fill the header details
    document.getElementById('local-name').textContent = tree.Local_Name || 'N/A';
    document.getElementById('common-name').textContent = tree.Common_Name || 'N/A';

    // Fill the info-row details (assuming your sheet headers match these IDs)
    document.getElementById('scientific-name').textContent = tree.Scientific_Name || 'N/A';
    document.getElementById('family').textContent = tree.Family || 'N/A';
    // ... continue for all other fields (Origin, Conservation_Status, etc.)

    // Fill the long text sections
    document.getElementById('medicinal-value').textContent = tree.Medicinal_Value || 'No data.';
    // ... and others like Ecological_Value, Commercial_Value
    
    // Optional: Initialize the map if Lat/Lng data exists
    // if (tree.Latitude && tree.Longitude) {
    //     initMap(tree.Latitude, tree.Longitude);
    // }
}

// Function for map integration (requires Google Maps API key)
// function initMap(lat, lng) {
//     const treeLocation = { lat: parseFloat(lat), lng: parseFloat(lng) };
//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 15,
//         center: treeLocation,
//     });
//     new google.maps.Marker({
//         position: treeLocation,
//         map: map,
//     });
// }