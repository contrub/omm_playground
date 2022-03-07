const minCharactersRegex = new RegExp("^(?=.{8,})")
const numberCheckRegex = new RegExp("^(?=.*[0-9])")
const lowercaseCheckRegex = new RegExp("^(?=.*[a-z])")
const uppercaseCheckRegex = new RegExp("^(?=.*[A-Z])")
const specialCheckRegex = new RegExp("^(?=.*[!@#%&])")

function passwordValidation(inputs, errors) {
  if (inputs["password"] !== undefined) {
    if (minCharactersRegex.test(inputs["password"])) {
      errors["quantityCheck"] = true
    } else {
      errors["quantityCheck"] = false
    }

    if (numberCheckRegex.test(inputs["password"])) {
      errors["numberCheck"] = true
    } else {
      errors["numberCheck"] = false
    }

    if (lowercaseCheckRegex.test(inputs["password"])) {
      errors["lowercaseCheck"] = true
    } else {
      errors["lowercaseCheck"] = false
    }

    if (uppercaseCheckRegex.test(inputs["password"])) {
      errors["uppercaseCheck"] = true
    } else {
      errors["uppercaseCheck"] = false
    }

    if (specialCheckRegex.test(inputs["password"])) {
      errors["specialCharacterCheck"] = true
    } else {
      errors["specialCharacterCheck"] = false
    }

    if (minCharactersRegex.test(inputs["password"]) && numberCheckRegex.test(inputs["password"]) && numberCheckRegex.test(inputs["password"]) && lowercaseCheckRegex.test(inputs["password"]) && uppercaseCheckRegex.test(inputs["password"]) && specialCheckRegex.test(inputs["password"])) {
      return true
    } else {
      return false
    }
  }
}

export {passwordValidation}
