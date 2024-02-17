// Sample data for not adopted and adopted pets
let notAdoptedPets = [
    { name: "Buddy", type: "Dog", age: 3, status: "Available" },
    { name: "Whiskers", type: "Cat", age: 2, status: "Available" }
];

let adoptedPets = [
    { name: "Koda", type: "Dog", age: 4, status: "Adopted" },
    { name: "Mittens", type: "Cat", age: 1, status: "Adopted" }
];

// Function to display not adopted pets
function displayNotAdoptedPets() {
    const notAdoptedSection = document.getElementById("notAdopted");
    notAdoptedSection.innerHTML = "<h2>Not Adopted Pets</h2>";
    const ul = document.createElement("ul");
    notAdoptedPets.forEach(pet => {
        const li = document.createElement("li");
        li.textContent = `${pet.name} - ${pet.type}, Age: ${pet.age}, Status: ${pet.status}`;
        ul.appendChild(li);
    });
    notAdoptedSection.appendChild(ul);
}

// Function to display adopted pets
function displayAdoptedPets() {
    const adoptedSection = document.getElementById("adopted");
    adoptedSection.innerHTML = "<h2>Adopted Pets (Previous Date)</h2>";
    const ul = document.createElement("ul");
    adoptedPets.forEach(pet => {
        const li = document.createElement("li");
        li.textContent = `${pet.name} - ${pet.type}, Age: ${pet.age}, Status: ${pet.status}`;
        ul.appendChild(li);
    });
    adoptedSection.appendChild(ul);
}

// Event listener for adding new pets
const addPetForm = document.getElementById("addPetForm");
addPetForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    const formData = new FormData(addPetForm);
    const newPet = {
        name: formData.get("petName"),
        type: formData.get("petType"),
        age: parseInt(formData.get("petAge")),
        status: "Available"
    };
    notAdoptedPets.push(newPet); // Add the new pet to the list
    updateAdoptionStatus(); // Update the display
    addPetForm.reset(); // Clear the form fields
});

// Event listener for updating pet profiles
// Event listener for updating pet profiles
const updatePetForm = document.getElementById("updatePetForm");
updatePetForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    const formData = new FormData(updatePetForm);
    const petIndex = parseInt(formData.get("petIndex"));
    const newStatus = formData.get("petStatus");
    
    if (!isNaN(petIndex) && petIndex >= 0 && petIndex < notAdoptedPets.length) {
        const updatedPet = notAdoptedPets[petIndex];
        updatedPet.status = newStatus;

        if (newStatus === "Adopted") {
            // Move the pet to the adopted list
            adoptedPets.push(updatedPet);
            // Remove the pet from the not adopted list
            notAdoptedPets.splice(petIndex, 1);
        }

        updateAdoptionStatus(); // Update the display
        updatePetForm.reset(); // Clear the form fields
    } else {
        alert("Invalid pet index");
    }
});


// Event listener for deleting adopted pets
const deletePetForm = document.getElementById("deletePetForm");
deletePetForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    const formData = new FormData(deletePetForm);
    const petIndex = parseInt(formData.get("adoptedPetIndex"));
    
    if (!isNaN(petIndex) && petIndex >= 0 && petIndex < adoptedPets.length) {
        adoptedPets.splice(petIndex, 1); // Remove the selected adopted pet from the list
        updateAdoptionStatus(); // Update the display
        deletePetForm.reset(); // Clear the form fields
    } else {
        alert("Invalid pet index");
    }
});

// Function to remove adopted pets from the list
function removeAdoptedPets() {
    adoptedPets = adoptedPets.filter(pet => pet.status !== "Adopted");
}

// Function to update the adoption status
function updateAdoptionStatus() {
    displayNotAdoptedPets();
    displayAdoptedPets();
}


