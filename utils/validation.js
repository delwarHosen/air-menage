// =========================
// Email Validation
// =========================
export const validateEmail = (email = "") => {
  if (!email.trim()) return "Email is required"

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address"
  }

  return true
}

// =========================
// Password Validation
// =========================
export const validatePassword = (password = "") => {
  if (!password.trim()) return "Password is required"

  if (password.length < 8) {
    return "Password must be at least 8 characters"
  }

  return true
}

// =========================
// Current Password
// =========================
export const validateCurrentPassword = (currentPassword = "") => {
  if (!currentPassword.trim()) {
    return "Current password is required"
  }

  if (currentPassword.length < 8) {
    return "Current password must be at least 8 characters"
  }

  return true
}

// =========================
// Confirm Password (RHF friendly)
// =========================
export const validateConfirmPassword = password => confirmPassword => {
  if (!confirmPassword.trim()) return "Confirm Password is required"

  if (confirmPassword.length < 8) {
    return "Confirm Password must be at least 8 characters"
  }

  if (password !== confirmPassword) {
    return "Passwords do not match"
  }

  return true
}

// =========================
// Full Name Validation
// =========================
export const validateName = (name = "") => {
  if (!name.trim()) return "Full name is required"

  if (name.trim().length < 2) {
    return "Name must be at least 2 characters"
  }

  return true
}

// =========================
// Date of Birth Validation (21+)
// Format: DD/MM/YYYY
// =========================
export const validateDOB = (dob = "") => {
  if (!dob.trim()) return "Date of birth is required"

  const [day, month, year] = dob.split("/").map(Number)
  const birthDate = new Date(year, month - 1, day)

  if (isNaN(birthDate.getTime())) {
    return "Please enter a valid date"
  }

  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--
  }

  if (age < 21) {
    return "You must be at least 21 years old to register"
  }

  return true
}

// =========================
// Required Field Validation
// =========================
export const validateRequired = (value = "", fieldName = "This field") => {
  if (!value.trim()) return `${fieldName} is required`
  return true
}

// =========================
// Over 21 Utility (boolean only)
// =========================
export const validateOver21 = dob => {
  if (!dob) return false

  const birthDate = new Date(dob)
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--
  }

  return age >= 21
}

// =========================
// Manual Form Validator (non-RHF)
// =========================
export const validateForm = (values = {}, rules = {}) => {
  const errors = {}

  Object.keys(rules).forEach(key => {
    const result = rules[key](values[key] || "")
    if (result !== true) {
      errors[key] = result
    }
  })

  return errors
}
