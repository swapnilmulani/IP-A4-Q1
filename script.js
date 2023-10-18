document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting

  // Retrieve form field values
  const firstName = document.querySelector("input[name='FirstName']").value;
  const lastName = document.querySelector("input[name='LastName']").value;
  const email = document.querySelector("input[name='EmailID']").value;
  const mobile = document.querySelector("input[name='MobileNumber']").value;

  // Validate form fields
  if (!validateForm(firstName, lastName, email, mobile)) {
    alert("Please fill out all fields correctly.");
    return;
  }

  // Create a Person object
  const person = new Person(firstName + " " + lastName, email, mobile);

  // Generate receipt text
  const receiptText = generateReceiptText(person);

  // Generate and save PDF
  generateAndSavePDF(receiptText);
});

// Define the Person class
class Person {
  constructor(name, email, mobile) {
    this.name = name;
    this.email = email;
    this.mobile = mobile;
  }
}

// Function to generate receipt text
function generateReceiptText(person) {
  const currentDate = new Date().toLocaleDateString();
  return `Order Receipt\nDate: ${currentDate}\nName: ${person.name}\nEmail: ${person.email}\nMobile: ${person.mobile}`;
}

// Function to validate form fields
function validateForm(firstName, lastName, email, mobile) {
  if (!firstName || !lastName || !email || !mobile) {
    return false;
  }
  // Add your specific validation logic here (e.g., email format, mobile format)
  return true;
}

// Function to generate and save PDF
function generateAndSavePDF(text) {
  const doc = new jsPDF();
  doc.text(text, 10, 10); // Add text to the PDF
  doc.save("receipt.pdf"); // Save the PDF with a filename
}