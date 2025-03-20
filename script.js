// Toggle forms
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const formTitle = document.getElementById('form-title');

showSignup.onclick = () => {
  loginForm.classList.add('hidden');
  signupForm.classList.remove('hidden');
  showSignup.parentElement.classList.add('hidden');
  showLogin.parentElement.classList.remove('hidden');
  formTitle.innerText = 'Signup';
};

showLogin.onclick = () => {
  signupForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
  showLogin.parentElement.classList.add('hidden');
  showSignup.parentElement.classList.remove('hidden');
  formTitle.innerText = 'Login';
};

// Signup
signupForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = e.target[0].value.trim();
  const email = e.target[1].value.trim();
  const password = e.target[2].value.trim();
  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.some(u => u.email === email)) {
    alert('Email already exists!');
    return;
  }
  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Signup successful!');
  window.location.href = 'user.html';
});






// Login
loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target[0].value.trim();
  const password = e.target[1].value.trim();
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return alert('Invalid credentials!');
  localStorage.setItem('currentUser', JSON.stringify(user));
  window.location.href = 'quiz.html';
});

// Quiz page user display
window.onload = function () {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (window.location.pathname.includes('quiz.html')) {
    if (!currentUser) {
      alert('Login first!');
      window.location.href = 'user.html';
    } else {
      document.getElementById('user-name').innerText = currentUser.username;
      document.getElementById('user-email').innerText = currentUser.email;
    }
  }
};

// Logout
function logoutUser() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}


