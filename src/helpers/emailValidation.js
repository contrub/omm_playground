import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";

function emailValidation(inputs, errors) {
  if (isEmpty(inputs["email"])){
    errors["email"] = "Cannot be empty";
    return false
  } else {
    if (!isEmail(inputs["email"])) {
      errors["email"] = "Email isn't valid";
      return false
    } else {
      errors["email"] = ""
      return true
    }
  }
}

export {emailValidation}
