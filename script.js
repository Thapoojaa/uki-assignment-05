document.addEventListener("DOMContentLoaded", () => {
    // Theme Toggle
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
    const savedTheme = localStorage.getItem("theme") || "light";
    body.setAttribute("data-theme", savedTheme);
    themeToggle.checked = savedTheme === "dark";

    themeToggle.addEventListener("change", () => {
        const newTheme = themeToggle.checked ? "dark" : "light";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });

    // Page Navigation
    const homePage = document.getElementById("homePage");
    const signupPage = document.getElementById("signupPage");
    const signupBtn = document.getElementById("signupBtn");
    const backBtn = document.getElementById("backBtn");
    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".nav-links");

    // Form Elements
    const signupForm = document.getElementById("signupForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const savedUserData = document.getElementById("savedUserData");
    const savedName = document.getElementById("savedName");
    const savedEmail = document.getElementById("savedEmail");
    const clearDataButton = document.getElementById("clearData");

    // Toggle mobile menu
    menuIcon.addEventListener("click", () => {
        menuIcon.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    menuIcon.addEventListener("touchstart", () => {
        menuIcon.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            menuIcon.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });

    // Set current year in footer
    document.getElementById("currentYear").textContent = new Date().getFullYear();

    // Page Navigation with Transitions
    signupBtn.addEventListener("click", () => {
        homePage.classList.remove("active");
        homePage.classList.add("fade-out");
        setTimeout(() => {
            homePage.classList.remove("fade-out");
            signupPage.classList.add("active");
            signupPage.classList.add("fade-in");
            setTimeout(() => signupPage.classList.remove("fade-in"), 300);
        }, 300);
    });

    backBtn.addEventListener("click", () => {
        signupPage.classList.remove("active");
        signupPage.classList.add("fade-out");
        setTimeout(() => {
            signupPage.classList.remove("fade-out");
            homePage.classList.add("active");
            homePage.classList.add("fade-in");
            setTimeout(() => homePage.classList.remove("fade-in"), 300);
        }, 300);
    });

    // Form Validation
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const showError = (input, message) => {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.id = `${input.id}-error`;
        errorDiv.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDiv);
        }
        input.setAttribute('aria-invalid', 'true');
        input.classList.add('error');
        input.closest('.input-container').classList.add('shake');
        setTimeout(() => input.closest('.input-container').classList.remove('shake'), 300);
    };

    const removeError = (input) => {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.classList.add('fade-out');
            setTimeout(() => formGroup.removeChild(errorDiv), 300);
        }
        input.setAttribute('aria-invalid', 'false');
        input.classList.remove('error');
    };

    // Form Progress Indicator
    const updateFormProgress = () => {
        const inputs = [nameInput, emailInput, passwordInput];
        const filledInputs = inputs.filter(input => input.value.trim() !== '').length;
        const progress = (filledInputs / inputs.length) * 100;
        let progressBar = signupForm.querySelector('.form-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'form-progress';
            signupForm.prepend(progressBar);
        }
        progressBar.style.width = `${progress}%`;
    };

    // Update progress on input change
    [nameInput, emailInput, passwordInput].forEach(input => {
        input.addEventListener('input', updateFormProgress);
    });

    // Add Tooltips
    const addTooltip = (input, message) => {
        const formGroup = input.closest('.form-group');
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = message;
        formGroup.appendChild(tooltip);
    };

    addTooltip(nameInput, 'Enter your full name');
    addTooltip(emailInput, 'Use a valid email address');
    addTooltip(passwordInput, 'Minimum 8 characters');

    // Real-time Validation
    [nameInput, emailInput, passwordInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input === nameInput && input.value.trim()) {
                removeError(input);
            }
            if (input === emailInput) {
                if (input.value.trim() && validateEmail(input.value.trim())) {
                    removeError(input);
                } else if (input.value.trim()) {
                    showError(input, "Please enter a valid email");
                }
            }
            if (input === passwordInput) {
                if (input.value.trim() && validatePassword(input.value.trim())) {
                    removeError(input);
                } else if (input.value.trim()) {
                    showError(input, "Password must be at least 8 characters");
                }
            }
        });
    });

    // Load saved data
    if (localStorage.getItem("userName")) {
        savedUserData.classList.remove("hidden");
        savedName.textContent = "Name: " + localStorage.getItem("userName");
        savedEmail.textContent = "Email: " + localStorage.getItem("userEmail");
    }

    // Form Submission
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const submitBtn = signupForm.querySelector('.btn-primary');
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<span class="spinner"></span> Signing Up...';

        setTimeout(() => {
            let isValid = true;
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!name) {
                showError(nameInput, "Name is required");
                isValid = false;
            } else {
                removeError(nameInput);
            }

            if (!email) {
                showError(emailInput, "Email is required");
                isValid = false;
            } else if (!validateEmail(email)) {
                showError(emailInput, "Please enter a valid email");
                isValid = false;
            } else {
                removeError(emailInput);
            }

            if (!password) {
                showError(passwordInput, "Password is required");
                isValid = false;
            } else if (!validatePassword(password)) {
                showError(passwordInput, "Password must be at least 8 characters");
                isValid = false;
            } else {
                removeError(passwordInput);
            }

            if (isValid) {
                localStorage.setItem("userName", name);
                localStorage.setItem("userEmail", email);
                savedUserData.classList.remove("hidden");
                savedUserData.classList.add("fade-in");
                savedName.textContent = "Name: " + name;
                savedEmail.textContent = "Email: " + email;

                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = "Sign-up successful! 🎉";
                signupForm.insertBefore(successMessage, signupForm.firstChild);

                nameInput.value = "";
                emailInput.value = "";
                passwordInput.value = "";

                setTimeout(() => {
                    successMessage.remove();
                    signupPage.classList.remove("active");
                    signupPage.classList.add("fade-out");
                    setTimeout(() => {
                        signupPage.classList.remove("fade-out");
                        homePage.classList.add("active");
                        homePage.classList.add("fade-in");
                        setTimeout(() => homePage.classList.remove("fade-in"), 300);
                    }, 300);
                }, 2000);
            }

            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = '<span class="save-icon"></span> Sign Up';
        }, 1000);
    });

    // Clear data button
    clearDataButton.addEventListener("click", () => {
        savedUserData.classList.add("fade-out");
        setTimeout(() => {
            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");
            savedUserData.classList.add("hidden");
            savedUserData.classList.remove("fade-out");
            savedName.textContent = "";
            savedEmail.textContent = "";
        }, 300);
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
});
