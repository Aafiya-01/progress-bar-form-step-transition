

const progressBar = document.getElementById('progress-bar');
const formSteps = document.querySelectorAll('.form-step');
let currentStep = 0;

function updateProgressBar() {
  const progress = (currentStep / (formSteps.length )) * 100;
  progressBar.style.width = progress + '%';
  progressBar.textContent = Math.round(progress) + '%';
}

function nextStep() {
  const currentFormStep = formSteps[currentStep];
  if (!validateCurrentStep(currentFormStep)) return; 

  if (currentStep < formSteps.length - 1) {
    formSteps[currentStep].classList.remove('active');
    currentStep++;
    formSteps[currentStep].classList.add('active');
    updateProgressBar();
  }
}

function prevStep() {
  if (currentStep > 0) {
    formSteps[currentStep].classList.remove('active');
    currentStep--;
    formSteps[currentStep].classList.add('active');
    updateProgressBar();
  }
}

function validateCurrentStep(step) {
  const inputs = step.querySelectorAll('input, textarea, select');
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      input.classList.add('is-invalid');
      isValid = false;
    } else {
      input.classList.remove('is-invalid');
    }
  });

  return isValid;
}

//add wala

function addEducationField() {
  const container = document.getElementById('educationContainer');

  const newItem = document.createElement('div');
  newItem.classList.add('education-item');

  newItem.innerHTML = `
      <label for="level" class="form-label">Choose level of Education:</label>
      <select name="level" required>
          <option value="">None</option>
          <option value="10">10th</option>
          <option value="12">12th</option>
          <option value="UG">Undergrad</option>
      </select> 
      <div class="invalid-feedback">Please select Level Of Education</div>

      <label for="year" class="form-label">Year of passing:</label>
      <input style="border: 0.7px solid black;" type="number" placeholder="yyyy" min="1980" max="2025">
      <div class="invalid-feedback">Please select years between 1980 and 2025</div>

      <label for="affilation" class="form-label">Affilation/ Board:</label>
      <input style="border: 0.7px solid black;" type="text" placeholder="Enter Affilation or Board">
     
      <button type="button" class="btn btn-danger" onclick="removeField(this)">Remove</button>
  `;

// Append krenge
  container.appendChild(newItem);
}

function removeField(button) {
  button.parentElement.remove();
}

// Handle form submission && validation k liye

// (function () {
//   'use strict';
//   const forms = document.querySelectorAll('.needs-validation');

//   Array.prototype.slice.call(forms).forEach(function (form) {
//     form.addEventListener('submit', function (event) {
//       if (!form.checkValidity()) {
//         event.preventDefault();
//         event.stopPropagation();
//       } else {
//         event.preventDefault();
//         const displayArea = document.getElementById('displayData');
//         displayArea.innerHTML = `
//           <h3 style="color: green;margin: 20%;">Form Submitted Successfully!</h3>
//         `;
//         displayArea.style.display = "block";
//         form.style.display = "block";
//       }
//       form.classList.add('was-validated');
//     });
//   });
// })();

updateProgressBar();

// ------------------------------------------------------------------------------------------------------------
(function () {
  'use strict';

  var forms = document.querySelectorAll('.needs-validation');
  let count = 0; // Count for tracking added fields

  Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
          } else {
              event.preventDefault();

              // Input values 
              const firstName = document.getElementById('firstName').value;
              const lastName = document.getElementById('lastName').value;
              const phone = document.getElementById('phone').value;
              const employeeId = document.getElementById('employeeId').value;
              const address = document.getElementById('address').value;
              const gender = document.querySelector('input[name="gender"]:checked').value;
              const dob = document.getElementById('dob').value;

              // input for Education Details
              const educationContainer = document.getElementById('educationContainer');
              const educationItems = educationContainer.querySelectorAll('.education-item');
              const educationDetails = [];

              educationItems.forEach((item, index) => {
                  const level = item.querySelector('select[name="level"]').value;
                  const year = item.querySelector('input[placeholder="yyyy"]').value;
                  const affiliation = item.querySelector('input[placeholder="Enter Affilation or Board"]').value;

                  if (level && year && affiliation) {
                      educationDetails.push({
                          level,
                          year,
                          affiliation,
                      });
                  }
              });

              // Display data
              const displayArea = document.getElementById('displayData');
              displayArea.innerHTML = `
                  <h3>Employee Information</h3>
                  <h3 style="color: green;margin: 5%;">Form Submitted Successfully!</h3>
                  <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                  <p><strong>Phone Number:</strong> ${phone}</p>
                  <p><strong>Employee ID:</strong> ${employeeId}</p>
                  <p><strong>Address:</strong> ${address}</p>
                  <p><strong>Gender:</strong> ${gender}</p>
                  <p><strong>Date of Birth:</strong> ${dob}</p>
                  <h3>Education Details</h3>
                  ${educationDetails
                      .map(
                          (edu, index) => `
                      <p><strong>Education ${index + 1}:</strong></p>
                      <p>Level: ${edu.level}</p>
                      <p>Year of Passing: ${edu.year}</p>
                      <p>Affiliation/Board: ${edu.affiliation}</p>
                      <hr>
                  `
                      )
                      .join('')}
              `;
              displayArea.style.display = 'block';
              form.style.display = 'none';
          }
          form.classList.add('was-validated');
      }, false);
  });
})();