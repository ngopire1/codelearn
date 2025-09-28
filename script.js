let currentUser = '';
let registeredUsers = {}; // Store registered users in memory
let captchaAnswer = 0;

// Generate simple CAPTCHA
function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = num1 + num2;
    document.getElementById('captcha-question').textContent = `${num1} + ${num2} = ?`;
}

function showWelcomeScreen() {
    document.getElementById('welcome-screen').style.display = 'flex';
    document.getElementById('register-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'none';
}

function showLoginScreen() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('register-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'flex';
    // Clear any previous error messages when switching to login
    document.getElementById('login-error').classList.add('hidden');
}

function showRegisterScreen() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('register-screen').style.display = 'flex';
    generateCaptcha();
}

function register() {
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const captchaInput = parseInt(document.getElementById('captcha').value);
    
    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!email.toLowerCase().includes('@gmail.com')) {
        alert('Please enter a valid Gmail address');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    if (captchaInput !== captchaAnswer) {
        alert('CAPTCHA answer is incorrect');
        generateCaptcha(); // Generate new CAPTCHA
        document.getElementById('captcha').value = '';
        return;
    }
    
    const fullName = `${firstName} ${lastName}`;
    
    // Check if user already exists
    if (registeredUsers[fullName]) {
        alert('User already exists. Please go to login page.');
        return;
    }
    
    // Register user
    registeredUsers[fullName] = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    };
    
    // Show success message and redirect to login
    document.getElementById('login-success').classList.remove('hidden');
    showLoginScreen();
    
    // Clear registration form
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('reg-email').value = '';
    document.getElementById('reg-password').value = '';
    document.getElementById('confirm-password').value = '';
    document.getElementById('captcha').value = '';
}

function login() {
    const fullName = document.getElementById('login-name').value.trim();
    const password = document.getElementById('login-password').value;
    
    // Hide any previous error messages
    document.getElementById('login-error').classList.add('hidden');
    
    if (!fullName || !password) {
        showLoginError('Please enter both name and password');
        return;
    }
    
    // Check if user exists and password is correct
    if (registeredUsers[fullName] && registeredUsers[fullName].password === password) {
        currentUser = fullName;
        document.getElementById('user-display').textContent = registeredUsers[fullName].firstName;
        
        // Hide auth screens and show main app
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('register-screen').style.display = 'none';
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        
        // Clear login form and messages
        document.getElementById('login-name').value = '';
        document.getElementById('login-password').value = '';
        document.getElementById('login-success').classList.add('hidden');
        document.getElementById('login-error').classList.add('hidden');
        
        alert('Successfully logged in! Welcome to CodeLearn!');
    } else if (registeredUsers[fullName] && registeredUsers[fullName].password !== password) {
        showLoginError('Incorrect password. Please check your password and try again.');
    } else {
        showLoginError('Username not found. Please check your name or create a new account.');
    }
}

function showLoginError(message) {
    document.getElementById('login-error-message').textContent = message;
    document.getElementById('login-error').classList.remove('hidden');
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
        document.getElementById('login-error').classList.add('hidden');
    }, 5000);
}

function logout() {
    currentUser = '';
    document.getElementById('welcome-screen').style.display = 'flex';
    document.getElementById('register-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'none';
}

function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Remove active class from all nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.remove('hidden');
    event.target.classList.add('active');
}

function startLearning(language) {
    const lessons = {
        javascript: [
            "Variables and Data Types",
            "Functions and Scope", 
            "DOM Manipulation",
            "Async Programming"
        ],
        python: [
            "Basic Syntax",
            "Data Structures", 
            "Object-Oriented Programming",
            "File Handling"
        ],
        css: [
            "Selectors and Properties",
            "Flexbox and Grid",
            "Animations and Transitions", 
            "Responsive Design"
        ]
    };
    
    alert(`Starting ${language.toUpperCase()} learning path!\n\nLessons:\n${lessons[language].map((lesson, i) => `${i+1}. ${lesson}`).join('\n')}`);
}

function startProject(project) {
    const projects = {
        calculator: "Create a calculator with HTML structure, CSS styling, and JavaScript functionality for basic operations.",
        todo: "Build a Python script that can add, remove, and list tasks. Use file storage to persist data.",
        portfolio: "Design a responsive portfolio with CSS Grid, Flexbox, and media queries."
    };
    
    const projectCode = document.createElement('div');
    projectCode.innerHTML = `
        <h3>Project: ${project}</h3>
        <p>${projects[project]}</p>
        <div class="code-editor">
            <textarea placeholder="Start coding here..."></textarea>
        </div>
        <button class="btn" style="margin-top: 15px;" onclick="runCode()">Run Code</button>
    `;
    
    document.getElementById('projects-tab').innerHTML = projectCode.outerHTML;
}

function startChallenge(challenge) {
    const challenges = {
        fizzbuzz: "Write a program that prints numbers 1-100. For multiples of 3 print 'Fizz', for multiples of 5 print 'Buzz', and for multiples of both print 'FizzBuzz'.",
        palindrome: "Create a function that checks if a given string is a palindrome (reads same forwards and backwards).",
        sorting: "Implement bubble sort, merge sort, or quick sort algorithm."
    };
    
    const challengeCode = document.createElement('div');
    challengeCode.innerHTML = `
        <h3>Challenge: ${challenge}</h3>
        <p>${challenges[challenge]}</p>
        <div class="code-editor">
            <textarea placeholder="Write your solution here..."></textarea>
        </div>
        <button class="btn" style="margin-top: 15px;" onclick="submitChallenge()">Submit Solution</button>
        <button class="btn" style="margin-top: 15px; margin-left: 10px;" onclick="findPartner()">Find Partner</button>
    `;
    
    document.getElementById('challenges-tab').innerHTML = challengeCode.outerHTML;
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `<strong>You:</strong> ${message}`;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        messageInput.value = '';
        
        // Simulate response after delay
        setTimeout(() => {
            const responses = [
                "Great question! Let me think about that...",
                "I'm working on something similar. Want to collaborate?",
                "That's exactly what I was looking for. Thanks!",
                "Has anyone solved the palindrome challenge yet?",
                "The CSS grid project is really challenging but fun!"
            ];
            
            const responseDiv = document.createElement('div');
            responseDiv.className = 'message other';
            responseDiv.innerHTML = `<strong>Alex:</strong> ${responses[Math.floor(Math.random() * responses.length)]}`;
            
            chatMessages.appendChild(responseDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000 + Math.random() * 2000);
    }
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function runCode() {
    alert('Code execution feature would be implemented with a backend service in production!');
}

function submitChallenge() {
    alert('Solution submitted! You scored 85/100. Great job!');
}

function findPartner() {
    alert('Looking for partners... Found match with Sarah Chen! Starting collaborative session.');
}

// Initialize with some demo functionality
document.addEventListener('DOMContentLoaded', function() {
    generateCaptcha();
    
    // Add some dynamic animations
    const cards = document.querySelectorAll('.language-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});
