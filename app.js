const tablinks = document.querySelectorAll(".tab-links");
const tabcontents = document.querySelectorAll(".tab-contents");
const sidemenu = document.querySelector("#sidemenu");

const menuToggle = document.querySelector(".fa-solid");
const navMenu = document.querySelector("nav ul");

// Initialize EmailJS with your user ID
emailjs.init("79WcCohVglrt-DCdj"); // Replace with your actual public key from EmailJS

// Form submission event handler
document
  .querySelector("form[name='submit-to-google-sheet']")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const msgElement = document.getElementById("msg");

    // Send form data using EmailJS
    emailjs
      .send("service_xhcw59g", "template_mhfxps7", {
        to_name: "Sanjay Kumar", // The recipient's name
        from_name: form.elements["Name"].value, // Sender's name
        from_email: form.elements["Email"].value, // Sender's email
        message: form.elements["Message"].value, // Message content
      })
      .then(
        () => {
          // Show success message
          msgElement.innerText = "Message sent successfully!";
          msgElement.style.color = "green";
          form.reset();
        },
        (error) => {
          // Show error message
          msgElement.innerText = "Error sending message. Try again later.";
          msgElement.style.color = "red";
          console.error("EmailJS Error:", error);
        }
      );
  });

// Function to open the mobile menu
function openmenu() {
  document.querySelector("#sidemenu").style.right = "0";
}

// Function to close the mobile menu
function closemenu() {
  document.querySelector("#sidemenu").style.right = "-200px";
}

// Function to open the tab and save the active tab in localStorage
function opentab(event, tabname) {
  const tablinks = document.querySelectorAll(".tab-links");
  const tabcontents = document.querySelectorAll(".tab-contents");

  // Remove 'active-link' class from all tab links
  for (let tablink of tablinks) {
    tablink.classList.remove("active-link");
  }

  // Remove 'active-tab' class from all tab contents
  for (let tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }

  // Add 'active-link' class to the clicked tab link
  event.currentTarget.classList.add("active-link");

  // Add 'active-tab' class to the selected tab content
  document.getElementById(tabname).classList.add("active-tab");

  // Save the active tab name in localStorage
  localStorage.setItem("activeTab", tabname);
}

// On page load, check if there's a saved active tab in localStorage
window.onload = function () {
  const activeTab = localStorage.getItem("activeTab");
  if (activeTab) {
    // Find the tab link and content to activate based on saved tab name
    const activeTabLink = document.querySelector(
      `.tab-links[onclick*="${activeTab}"]`
    );
    const activeTabContent = document.getElementById(activeTab);

    // If the active tab exists, mark it as active
    if (activeTabLink && activeTabContent) {
      activeTabLink.classList.add("active-link");
      activeTabContent.classList.add("active-tab");
    }
  } else {
    // If no active tab is saved, you can manually activate a default tab (optional)
    opentab({ currentTarget: document.querySelector(".tab-links") }, "skills"); // default tab
  }
};
