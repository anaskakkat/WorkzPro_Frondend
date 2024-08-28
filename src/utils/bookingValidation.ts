// utils/formValidation.ts

interface FormData {
  description: string;
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const validateForm = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  const descriptionPattern = /^[A-Za-z0-9 ]+$/; // Alphanumeric and spaces
  const houseNumberPattern = /^[A-Za-z0-9]+$/; // Alphanumeric only
  const streetPattern = /^(?!.*\s{2,})[A-Za-z\-][A-Za-z\s\-]*[A-Za-z\-]$/; // Alphanumeric and spaces
  const cityPattern = /^[A-Za-z ]+$/; // Alphabets and spaces
  const statePattern = /^[A-Za-z ]+$/; // Alphabets and spaces
  const pinCodePattern = /^\d{6}$/; // Exactly 6 digits

  // Validation checks
  if (
    !formData.description.trim() ||
    !descriptionPattern.test(formData.description)
  ) {
    errors.description =
      "Description must be alphanumeric and cannot be empty or whitespace.";
  }

  if (
    !formData.houseNumber.trim() ||
    !houseNumberPattern.test(formData.houseNumber)
  ) {
    errors.houseNumber =
      "House Number must be alphanumeric and cannot be empty or whitespace.";
  }

  if (!formData.street.trim() || !streetPattern.test(formData.street)) {
    errors.street =
      "Street must be alphanumeric and cannot be empty or whitespace.";
  }

  if (!formData.city.trim() || !cityPattern.test(formData.city)) {
    errors.city =
      "City must contain only alphabets and cannot be empty or whitespace.";
  }

  if (!formData.state.trim() || !statePattern.test(formData.state)) {
    errors.state =
      "State must contain only alphabets and cannot be empty or whitespace.";
  }

  if (!formData.pinCode.trim() || !pinCodePattern.test(formData.pinCode)) {
    errors.pinCode = "Pin Code must be exactly 6 digits.";
  }

  return errors;
};

export default validateForm;
