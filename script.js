document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("recruitment-form");

    // Handle adding new employee
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
            renderEmployees(); // Refresh the table after adding
        });
    }

    // Render the employee table from localStorage (Employee Details Page)
    function renderEmployees() {
        const employeesTable = document.querySelector("#employees-table tbody");
        if (employeesTable) {
            let employees = JSON.parse(localStorage.getItem("employees")) || [];
            employeesTable.innerHTML = employees.map(emp => {
                // Salary Breakdown calculations
                const basicSalary = parseFloat(emp.salary) || 0;
                const DA = basicSalary * 0.11;  // 11% of Basic Salary
                const PF = basicSalary * 0.12; // 12% of Basic Salary
                const HRA = basicSalary * 0.40; // 40% of Basic Salary
                const extraAllowance = 2000;   // Fixed Extra Allowance

                return `
                    <tr id="employee-${emp.id}">
                        <td>${emp.id}</td>
                        <td>${emp.name}</td>
                        <td>${emp.position}</td>
                        <td>
                            <p><strong>Basic:</strong> ${basicSalary}</p>
                            <p><strong>DA (11%):</strong> ${DA}</p>
                            <p><strong>PF (12%):</strong> ${PF}</p>
                            <p><strong>HRA (40%):</strong> ${HRA}</p>
                            <p><strong>Extra Allowance:</strong> ${extraAllowance}</p>
                        </td>
                        <td>
                            <button onclick="editEmployee(${emp.id})">Edit</button>
                            <button onclick="deleteEmployee(${emp.id})">Delete</button>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }

    renderEmployees(); // Initial rendering for Employee Details page

    // Function to edit employee
    window.editEmployee = function (id) {
        let employees = JSON.parse(localStorage.getItem("employees")) || [];
        const employee = employees.find(emp => emp.id === id);

        if (employee) {
            // Pre-fill the form with current employee data
            document.getElementById("edit-id").value = employee.id;
            document.getElementById("edit-name").value = employee.name;
            document.getElementById("edit-position").value = employee.position;
            document.getElementById("edit-salary").value = employee.salary;

            // Show the modal
            document.getElementById("edit-modal").style.display = 'block';

            // Update form submit to handle the update
            const editForm = document.getElementById("edit-employee-form");
            editForm.addEventListener("submit", function (event) {
                event.preventDefault();

                // Update the employee's data in the array
                employee.name = document.getElementById("edit-name").value;
                employee.position = document.getElementById("edit-position").value;
                employee.salary = document.getElementById("edit-salary").value;

                localStorage.setItem("employees", JSON.stringify(employees));
                alert("Employee details updated!");

                renderEmployees(); // Refresh the table after update
                closeEditModal(); // Close the modal
            });
        }
    };

    // Function to delete employee
    window.deleteEmployee = function (id) {
        let employees = JSON.parse(localStorage.getItem("employees")) || [];
        employees = employees.filter(emp => emp.id !== id);

        localStorage.setItem("employees", JSON.stringify(employees));
        renderEmployees(); // Refresh the table after delete
    };

    // Function to close the edit modal
    window.closeEditModal = function() {
        document.getElementById('edit-modal').style.display = 'none';
    };

    // Render the payroll table from localStorage (Payroll Page)
    function renderPayroll() {
        const payrollTable = document.querySelector("#payroll-table tbody");
        if (payrollTable) {
            let employees = JSON.parse(localStorage.getItem("employees")) || [];
            payrollTable.innerHTML = employees.map(emp => {
                // Salary Breakdown calculations
                const basicSalary = parseFloat(emp.salary) || 0;
                const DA = basicSalary * 0.11;  // 11% of Basic Salary
                const PF = basicSalary * 0.12; // 12% of Basic Salary
                const HRA = basicSalary * 0.40; // 40% of Basic Salary
                const extraAllowance = 2000;   // Fixed Extra Allowance
                const totalSalary = basicSalary + DA + PF + HRA + extraAllowance;
                const bonus = DA + PF + HRA + extraAllowance;  // Bonus calculation (or any other formula)

                return `
                    <tr id="employee-${emp.id}">
                        <td>${emp.id}</td>
                        <td>${emp.name}</td>
                        <td>${basicSalary}</td>
                        <td>${bonus}</td>
                    </tr>
                `;
            }).join('');
        }
    }

    // Initial rendering when the page loads (for Payroll page)
    if (document.getElementById("payroll-table")) {
        renderPayroll(); // Call the renderPayroll function for the payroll page
    }

});
