
interface ResumeData {
    name: string;
    email: string;
    phone: string;
    profilePicture?: string; 
    degree: string;
    major: string;
    university: string;
    skills: string[];
    jobTitle: string;
    companyName: string;
    startDate: string;
    endDate?: string;
    responsibilities: string;
  }
  
  function handleFormSubmit(event: Event) {
    event.preventDefault();
  
    const form = document.getElementById("resume-form") as HTMLFormElement;
    const formData = new FormData(form);
  
    const resumeData: ResumeData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      degree: formData.get("degree") as string,
      major: formData.get("major") as string,
      university: formData.get("university") as string,
      skills: (formData.get("skills") as string).split(",").map(skill => skill.trim()),
      jobTitle: formData.get("job-title") as string,
      companyName: formData.get("company-name") as string,
      startDate: formData.get("start-date") as string,
      endDate: formData.get("end-date") as string || "Present",
      responsibilities: formData.get("responsibilities") as string,
    };
  
    const fileInput = document.getElementById("profile-picture") as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(event) {
        resumeData.profilePicture = event.target?.result as string;
        generateResume(resumeData);
      };
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      generateResume(resumeData);
    }
  }
  
  function generateResume(data: ResumeData) {
    const resumeOutput = document.getElementById("resumeOutput") as HTMLDivElement;
    resumeOutput.innerHTML = `
      <h2>${data.name}</h2>
      <div class="image">
      ${data.profilePicture ? `<img src="${data.profilePicture}" alt="Profile Picture" style="width: 150px; height: 150px; border-radius: 50%; margin-bottom: 20px;">` : ""}
      </div>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <h3>Education</h3>
      <p><strong>Degree:</strong> ${data.degree}</p>
      <p><strong>Major:</strong> ${data.major}</p>
      <p><strong>University:</strong> ${data.university}</p>
      <h3>Skills</h3>
      <ul>
        ${data.skills.map(skill => `<li>${skill}</li>`).join("")}
      </ul>
      <h3>Work Experience</h3>
      <p><strong>Job Title:</strong> ${data.jobTitle}</p>
      <p><strong>Company Name:</strong> ${data.companyName}</p>
      <p><strong>Start Date:</strong> ${data.startDate}</p>
      <p><strong>End Date:</strong> ${data.endDate}</p>
      <p><strong>Responsibilities:</strong></p>
      <p>${data.responsibilities}</p>
    `;
  }
  
  // Event listener for form submission
  document.getElementById("resume-form")?.addEventListener("submit", handleFormSubmit);
  
