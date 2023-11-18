        // Get the form element
        var form = document.getElementById("reg-form");
        // Get the table element
        var table = document.getElementById("reg-table");
        // Get the localStorage object
        var storage = window.localStorage;
        // Check if there are any entries in the localStorage
        if (storage.getItem("entries")) {
            // Parse the entries from JSON string to array
            var entries = JSON.parse(storage.getItem("entries"));
            // Loop through the entries and append them to the table
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                var row = table.insertRow();
                var cell1 = row.insertCell();
                var cell2 = row.insertCell();
                var cell3 = row.insertCell();
                var cell4 = row.insertCell();
                var cell5 = row.insertCell();
                cell1.innerHTML = entry.name;
                cell2.innerHTML = entry.email;
                cell3.innerHTML = entry.password;
                cell4.innerHTML = entry.dob;
                cell5.innerHTML = entry.terms;
            }
        } else {
            // Initialize an empty array for entries
            var entries = [];
        }
        // Define a function to add an entry to the table and the localStorage
        function addEntry() {
            // Get the input values from the form
            var name = form.name.value;
            var email = form.email.value;
            var password = form.password.value;
            var dob = form.dob.value;
            var terms = form.terms.checked;
            // Validate the email format using a regular expression
            var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailRegex.test(email)) {
                alert("Invalid email address");
                return false;
            }
            // Validate the age range using the date of birth
            var today = new Date();
            var birthDate = new Date(dob);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 18 || age > 55) {
                alert("Age must be between 18 and 55");
                return false;
            }
            // Create an object for the entry
            var entry = {
                name: name,
                email: email,
                password: password,
                dob: dob,
                terms: terms
            };
            // Append the entry to the entries array
            entries.push(entry);
            // Stringify the entries array to JSON string
            var entriesString = JSON.stringify(entries);
            // Store the entries string in the localStorage
            storage.setItem("entries", entriesString);
            // Append the entry to the table
            var row = table.insertRow();
            var cell1 = row.insertCell();
            var cell2 = row.insertCell();
            var cell3 = row.insertCell();
            var cell4 = row.insertCell();
            var cell5 = row.insertCell();
            cell1.innerHTML = name;
            cell2.innerHTML = email;
            cell3.innerHTML = password;
            cell4.innerHTML = dob;
            cell5.innerHTML = terms;
            // Clear the form inputs
            form.reset();
            // Prevent the form from submitting and reloading the page
            return false;
        }
