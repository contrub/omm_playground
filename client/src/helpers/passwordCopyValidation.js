import isEmpty from "validator/es/lib/isEmpty";

function passwordCopyValidation(inputs, errors) {
  if (isEmpty(inputs["passwordCopy"])) {
    errors["passwordCopy"] = "Cannot be empty";
    return false
  } else if (inputs["password"] === inputs["passwordCopy"] && !isEmpty(inputs["password"])) {
    errors["passwordCopy"] = "";
    return true
  }
}

export {passwordCopyValidation}
