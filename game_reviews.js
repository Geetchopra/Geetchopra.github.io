var list = [];

var firebaseConfig = {
    apiKey: "AIzaSyC59mp0aGtYHV3Ecm24pkVJT7yyVvp_TP4",
    authDomain: "personal-website-2d62d.firebaseapp.com",
    databaseURL: "https://personal-website-2d62d-default-rtdb.firebaseio.com",
    projectId: "personal-website-2d62d",
    storageBucket: "personal-website-2d62d.appspot.com",
    messagingSenderId: "925792512010",
    appId: "1:925792512010:web:3232e1bbe6d58f89c397f3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  


// Database reference
const dbRef = firebase.database().ref();

// Function to get data from Firebase and update the table
async function getDataAndUpdateTable() {
  try {
    const snapshot = await dbRef.child("games").get();
    if (snapshot.exists()) {
      const list = Object.values(snapshot.val());
      updateTable(list);
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
}

// Function to update the table
function updateTable(list) {
  // Get the table element
  const table = document.getElementById("review-table");

  // Create the table header
  const thead = document.createElement("thead");
  table.appendChild(thead);
  const tr = thead.insertRow(-1);

  // Get the column names from the first object in the list
  const cols = Object.keys(list[0]);

  // Create the table headers
  cols.forEach((col) => {
    const theader = document.createElement("th");
    theader.innerHTML = col.replace(String(col[0]), "");
    tr.appendChild(theader);
  });

  // Create the table body
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  // Sort the list by game score in descending order
  list.sort((a, b) => b[Object.keys(a)[4]] - a[Object.keys(a)[4]]);

  // Create the table rows
  list.forEach((item) => {
    const trow = tbody.insertRow(-1);
    cols.forEach((col) => {
      const cell = trow.insertCell(-1);
      cell.innerHTML = item[col];
    });
  });
}

// Call the function to get data and update the table
getDataAndUpdateTable();


