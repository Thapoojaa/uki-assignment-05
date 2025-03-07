document.addEventListener("DOMContentLoaded", () => {
    // Page Navigation
    const homePage = document.getElementById("homePage");
    const signupPage = document.getElementById("signupPage");
    const signupBtn = document.getElementById("signupBtn");
    const backBtn = document.getElementById("backBtn");

    // Form Elements
    const signupForm = document.getElementById("signupForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const savedUserData = document.getElementById("savedUserData");
    const savedName = document.getElementById("savedName");
    const savedEmail = document.getElementById("savedEmail");
    const clearDataButton = document.getElementById("clearData");

    // Set current year in footer
    document.getElementById("currentYear").textContent = new Date().getFullYear();

    // Page Navigation
    signupBtn.addEventListener("click", () => {
        homePage.classList.remove("active");
        signupPage.classList.add("active");
    });

    backBtn.addEventListener("click", () => {
        signupPage.classList.remove("active");
        homePage.classList.add("active");
    });

    // Load saved data when the page loads
    if (localStorage.getItem("userName")) {
        savedUserData.classList.remove("hidden");
        savedName.textContent = "Name: " + localStorage.getItem("userName");
        savedEmail.textContent = "Email: " + localStorage.getItem("userEmail");
    }

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim(); // Not saving password

        if (name && email && password) {
            // Save user data in localStorage
            localStorage.setItem("userName", name);
            localStorage.setItem("userEmail", email);

            // Display saved data
            savedUserData.classList.remove("hidden");
            savedName.textContent = "Name: " + name;
            savedEmail.textContent = "Email: " + email;
            alert("Sign-up successful! Data saved.");

            // Clear input fields after saving
            nameInput.value = "";
            emailInput.value = "";
            passwordInput.value = "";
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Clear data button
    clearDataButton.addEventListener("click", () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        savedUserData.classList.add("hidden");
        savedName.textContent = "";
        savedEmail.textContent = "";
        alert("Data cleared.");
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 64, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
});

