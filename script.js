const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

let successMsg = document.getElementById("success-message");
if (!successMsg) {
  successMsg = document.createElement("div");
  successMsg.id = "success-message";
  successMsg.style.color = "#28a745";
  successMsg.style.textAlign = "center";
  successMsg.style.marginTop = "15px";
  form.parentElement.appendChild(successMsg);
}

username.addEventListener("input", function () {
  checkRequired([username]);
  checkLength(username, 3, 15);
});
email.addEventListener("input", function () {
  checkRequired([email]);
  checkEmail(email);
});
password.addEventListener("input", function () {
  checkRequired([password]);
  checkLength(password, 6, 25);
  checkPasswordsMatch(password, confirmPassword);
});
confirmPassword.addEventListener("input", function () {
  checkRequired([confirmPassword]);
  checkPasswordsMatch(password, confirmPassword);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  successMsg.innerText = "";

  const usernameValid = checkRequired([username]) & checkLength(username, 3, 15);
  const emailValid = checkRequired([email]) & checkEmail(email);
  const passwordValid = checkRequired([password]) & checkLength(password, 6, 25);
  const confirmPasswordValid = checkRequired([confirmPassword]) & checkPasswordsMatch(password, confirmPassword);

  const allValid = [username, email, password, confirmPassword].every(input =>
    input.parentElement.classList.contains("success")
  );

  if (allValid) {
    form.reset();
    document.querySelectorAll(".form-group").forEach((group) => {
      group.className = "form-group";
      group.querySelector("small").innerText = "";
    });
    successMsg.innerText = "注册成功！";
  }
});

function checkRequired(inputs) {
  let isValid = true;
  inputs.forEach(input => {
    if (input.value.trim() === "") {
      isValid = false;
      setError(input, `${getFieldName(input)}不能为空`);
    } else {
      setSuccess(input);
    }
  });
  return isValid;
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    setError(input, `${getFieldName(input)}至少${min}个字符`);
    return false;
  } else if (input.value.length > max) {
    setError(input, `${getFieldName(input)}不能超过${max}个字符`);
    return false;
  } else {
    setSuccess(input);
    return true;
  }
}

function checkEmail(input) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(input.value.trim())) {
    setError(input, "邮箱格式不正确");
    return false;
  } else {
    setSuccess(input);
    return true;
  }
}

function checkPasswordsMatch(password, confirmPassword) {
  if (password.value !== confirmPassword.value) {
    setError(confirmPassword, "两次输入的密码不一致");
    return false;
  } else {
    setSuccess(confirmPassword);
    return true;
  }
}

function setError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group error";
  const small = formGroup.querySelector("small");
  if (small) small.innerText = message;
}

function setSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
  const small = formGroup.querySelector("small");
  if (small) small.innerText = "";
}

function getFieldName(input) {
  switch (input.id) {
    case "username": return "用户名";
    case "email": return "邮箱";
    case "password": return "密码";
    case "confirmPassword": return "确认密码";
    default: return input.id;
  }
}