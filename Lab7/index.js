window.onload = function () {
    fetchEmployee();
}

function fetchEmployee() {
    fetch('https://randomuser.me/api/?results=5')
        .then(response => response.json())
        .then(employee => { console.log(employee.results)
            let html = `
                <div><h3>Employees list</h3></div>
            `;
            //let employeeList = employee.results;
            (employee.results).forEach(emp => {
                html += `
            <div class="flexcontainer">
              <div><img src=${emp.picture.medium} /></div>
              
              <div class="flexcontainer2">
                <div>${emp.name.first} ${emp.name.last} </div>
                <div>${emp.phone}</div>
                <div>${emp.email}</div>
              </div>
            </div> 
            `
            })
            document.getElementById('employeeList').innerHTML = html;
        });
}