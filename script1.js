/* script.js */
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("recruitment-form");
    
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const name = document.getElementById("name").value;
            const position = document.getElementById("position").value;
            const salary = document.getElementById("salary").value;
            
            let employees = JSON.parse(localStorage.getItem("employees")) || [];
            employees.push({ id: employees.length + 1, name, position, salary });
            localStorage.setItem("employees", JSON.stringify(employees));
            
            form.reset();
            alert("Employee added successfully!");
        });
    }
    
    const employeesTable = document.querySelector("#employees-table tbody");
    if (employeesTable) {
        let employees = JSON.parse(localStorage.getItem("employees")) || [];
        employeesTable.innerHTML = employees.map(emp => `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.position}</td>
            </tr>
        `).join('');
    }
    
    const payrollTable = document.querySelector("#payroll-table tbody");
    if (payrollTable) {
        let employees = JSON.parse(localStorage.getItem("employees")) || [];
        payrollTable.innerHTML = employees.map(emp => `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.salary}</td>
                <td>$0</td>
            </tr>
        `).join('');
    }
});