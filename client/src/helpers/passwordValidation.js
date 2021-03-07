const minCharactersRegex = new RegExp("^(?=.{8,})")
const numberCheckRegex = new RegExp("^(?=.*[0-9])")
const lowercaseCheckRegex = new RegExp("^(?=.*[a-z])")
const uppercaseCheckRegex = new RegExp("^(?=.*[A-Z])")
const specialCheckRegex = new RegExp("^(?=.*[!@#%&])")

function passwordValidation(inputs) {
  if (inputs["password"] !== undefined) {
    if (minCharactersRegex.test(inputs["password"])) {
      document.getElementById('quantityCheck').hidden = true
    } else {
      document.getElementById('quantityCheck').hidden = false
    }

    if (numberCheckRegex.test(inputs["password"])) {
      document.getElementById('numberCheck').hidden = true
    } else {
      document.getElementById('numberCheck').hidden = false
    }

    if (lowercaseCheckRegex.test(inputs["password"])) {
      document.getElementById('lowercaseCheck').hidden = true
    } else {
      document.getElementById('lowercaseCheck').hidden = false
    }

    if (uppercaseCheckRegex.test(inputs["password"])) {
      document.getElementById('uppercaseCheck').hidden = true
    } else {
      document.getElementById('uppercaseCheck').hidden = false
    }

    if (specialCheckRegex.test(inputs["password"])) {
      document.getElementById('specialCharacterCheck').hidden = true
    } else {
      document.getElementById('specialCharacterCheck').hidden = false
    }

    if (minCharactersRegex.test(inputs["password"]) && numberCheckRegex.test(inputs["password"]) && numberCheckRegex.test(inputs["password"]) && lowercaseCheckRegex.test(inputs["password"]) && uppercaseCheckRegex.test(inputs["password"]) && specialCheckRegex.test(inputs["password"])) {
      document.getElementById('passwordRequirements').hidden = true
      return true
    } else {
      document.getElementById('passwordRequirements').hidden = true
      return false
    }
  }
}

export {passwordValidation}
