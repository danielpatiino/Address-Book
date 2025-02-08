// Address Book Data (Pre-filled)
let addressBook = [
    { name: "John Doge", phone: "777-999-777", email: "JohnDoge@gmail.com" },
    { name: "James Frog", phone: "888-222-888", email: "JamesFrog@gmail.com" }
];

// Entry Class
class Entry {
    constructor(name, phone, email) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
}

// Display Entries
function displayEntries(entries = addressBook) {
    const entryList = document.getElementById("entryList");
    entryList.innerHTML = "";

    entries.forEach((entry, index) => {
        let row = `<tr>
            <td>${entry.name}</td>
            <td>${entry.phone || "N/A"}</td>
            <td><a href="mailto:${entry.email}">${entry.email}</a></td>
            <td>
                <button class="delete-btn" onclick="deleteEntry(${index})">Delete</button>
            </td>
        </tr>`;
        entryList.innerHTML += row;
    });
}

// Filter Entries
function filterEntries() {
    let query = document.getElementById("searchInput").value.toLowerCase();
    let filtered = addressBook.filter(entry =>
        entry.name.toLowerCase().includes(query) ||
        entry.phone.includes(query) ||
        entry.email.toLowerCase().includes(query)
    );
    displayEntries(filtered);
}

// Add New Entry
document.getElementById("entryForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();

    if (!name) {
        alert("Name cannot be empty.");
        return;
    }

    if (!phone && !email) {
        alert("At least one contact method (Phone or Email) must be provided.");
        return;
    }

    if (email && !validateEmail(email)) {
        alert("Invalid email format.");
        return;
    }

    let newEntry = new Entry(name, phone, email);
    addressBook.push(newEntry);
    displayEntries();
    document.getElementById("entryForm").reset();
});

// Validate Email
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

// Delete Entry
function deleteEntry(index) {
    if (confirm("Are you sure you want to delete this contact?")) {
        addressBook.splice(index, 1);
        displayEntries();
    }
}

// Initial Load
displayEntries();


