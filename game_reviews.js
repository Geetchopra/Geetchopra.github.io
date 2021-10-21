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

  


const dbRef = firebase.database().ref();
dbRef.child("games").get().then((snapshot) => {
  if (snapshot.exists()) {
    for (var i = 0; i < snapshot.numChildren(); i++) {
        //console.log(snapshot.child(i).val());
        list.push(snapshot.child(i).val());
    }
    update_table();
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});



//https://www.geeksforgeeks.org/how-to-convert-json-data-to-a-html-table-using-javascript-jquery/
function update_table() {
    var cols = [];
      
    for (var i = 0; i < list.length; i++) {
        for (var k in list[i]) {
            if (cols.indexOf(k) === -1) {
                  
                // Push all keys to the array
                cols.push(k);
            }
        }
    }
      
    // Create a table element
    var table = document.getElementById("review-table");

    var thead = document.createElement("thead");
    table.appendChild(thead);

    // Create table row tr element of a table
    //var tr = table.insertRow(-1);
      var tr = thead.insertRow(-1);

    for (var i = 0; i < cols.length; i++) {
          
        // Create the table header th element
        var theader = document.createElement("th");
        theader.innerHTML = cols[i].replace(String(i), "");
          
        // Append columnName to the table row
        tr.appendChild(theader);
    }

    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
      
    // Adding the data to the table
    for (var i = 0; i < list.length; i++) {
          
        // Create a new row
        trow = tbody.insertRow(-1);
        for (var j = 0; j < cols.length; j++) {
            var cell = trow.insertCell(-1);
              
            // Inserting the cell at particular place
            cell.innerHTML = list[i][cols[j]];
        }
    }
      
    // Add the newly created table containing json data
    var el = document.getElementById("review-table");
    sort_table();
    //el.innerHTML = "";
    el.appendChild(table);
}    

function sort_table() {
    
    // const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

    // const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
    //     v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    //     )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

    // // do the work...
    // document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    //     const table = th.closest('table');
    //     Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
    //         .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
    //         .forEach(tr => table.appendChild(tr) );
    // })));

    var table_config = {
        paging: false,
        lengthChange: false,
        info: false

    }
    $(document).ready( function () {
        $.fn.dataTable.moment( 'MMM YYYY' );

        var table = $('#review-table').DataTable(table_config);
        table
            .order( [ 4, 'des' ] )
            .draw();

        var el = document.querySelector("label");
        var child = el.firstChild;
        child = child.nextSibling;
        el.innerHTML = "";
        el.appendChild(child);
} );
}
    


