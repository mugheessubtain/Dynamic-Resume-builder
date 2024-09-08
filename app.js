var _a;
function handleFormSubmit(event) {
    event.preventDefault();
    var form = document.getElementById("resume-form");
    var formData = new FormData(form);
    var resumeData = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        degree: formData.get("degree"),
        major: formData.get("major"),
        university: formData.get("university"),
        skills: formData.get("skills").split(",").map(function (skill) { return skill.trim(); }),
        jobTitle: formData.get("job-title"),
        companyName: formData.get("company-name"),
        startDate: formData.get("start-date"),
        endDate: formData.get("end-date") || "Present",
        responsibilities: formData.get("responsibilities"),
    };
    var fileInput = document.getElementById("profile-picture");
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            resumeData.profilePicture = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            generateResume(resumeData);
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
    else {
        generateResume(resumeData);
    }
}
function generateResume(data) {
    var resumeOutput = document.getElementById("resumeOutput");
    resumeOutput.innerHTML = "\n      <h2>".concat(data.name, "</h2>\n      <div class=\"image\">\n      ").concat(data.profilePicture ? "<img src=\"".concat(data.profilePicture, "\" alt=\"Profile Picture\" style=\"width: 150px; height: 150px; border-radius: 50%; margin-bottom: 20px;\">") : "", "\n      </div>\n      <p><strong>Email:</strong> ").concat(data.email, "</p>\n      <p><strong>Phone:</strong> ").concat(data.phone, "</p>\n      <h3>Education</h3>\n      <p><strong>Degree:</strong> ").concat(data.degree, "</p>\n      <p><strong>Major:</strong> ").concat(data.major, "</p>\n      <p><strong>University:</strong> ").concat(data.university, "</p>\n      <h3>Skills</h3>\n      <ul>\n        ").concat(data.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(""), "\n      </ul>\n      <h3>Work Experience</h3>\n      <p><strong>Job Title:</strong> ").concat(data.jobTitle, "</p>\n      <p><strong>Company Name:</strong> ").concat(data.companyName, "</p>\n      <p><strong>Start Date:</strong> ").concat(data.startDate, "</p>\n      <p><strong>End Date:</strong> ").concat(data.endDate, "</p>\n      <p><strong>Responsibilities:</strong></p>\n      <p>").concat(data.responsibilities, "</p>\n    ");
}
// Event listener for form submission
(_a = document.getElementById("resume-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", handleFormSubmit);
