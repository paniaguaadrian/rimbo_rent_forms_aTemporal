export const isAgency = (values) => {
  let errors = {};

  if (!values.agencyContactPerson) {
    errors.agencyContactPerson = "Name of the agent is required";
  }

  if (!values.agencyEmailPerson) {
    errors.agencyEmailPerson = "Agent email address is required";
  } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.agencyEmailPerson = "Email address is invalid";
  }

  if (!values.agencyPhonePerson) {
    errors.agencyPhonePerson = "Phone number is required";
  }

  if (values.agencyPhonePerson && values.agencyPhonePerson.length < 9) {
    errors.agencyPhonePerson = "Enter valid phone number";
  }

  return errors;
};

export const isProperty = (values) => {
  let errors = {};

  if (!values.rentalAddress) {
    errors.rentalAddress =
      "You must select the address suggested by Google Maps";
  }

  if (!values.building) {
    errors.building = "Enter a building for the tenant.";
  }

  if (!values.rentAmount) {
    errors.rentAmount = "Monthly Rent is required.";
  }

  if (!values.rentStartDate) {
    errors.rentStartDate = "Choose a rent start date";
  }

  if (!values.rentEndDate) {
    errors.rentEndDate = "Choose a rent end date";
  }

  return errors;
};

export const isTenant = (values) => {
  let errors = {};
  if (!values.tenantsFirstName) {
    errors.tenantName = "Tenant first name is required";
  }
  if (!values.tenantsLastName) {
    errors.tenantName = "Tenant last name is required";
  }
  if (!values.tenantPhone) {
    errors.tenantPhone = "Phone number is required";
  }
  if (values.tenantPhone && values.tenantPhone.length < 9) {
    errors.tenantPhone = "Enter valid phone number";
  }
  if (!values.tenantEmail) {
    errors.tenantEmail = "Tenant email address is required";
  } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.tenantEmail = "Email address is invalid";
  }
  return errors;
};

export const isMoreTenant = (values) => {
  let errors = {};

  if (!values.monthlyNetIncome) {
    errors.monthlyNetIncome = "Monthly net income is required";
  }

  if (!values.jobType) {
    errors.jobType = "Job type is required";
  }

  if (!values.documentType) {
    errors.documentType = "Document Type is required";
  }

  if (!values.documentNumber) {
    errors.documentNumber = "Document number is required";
  }

  if (values.documentNumber && values.documentNumber.length < 8) {
    errors.tenadocumentNumberntPhone = "Enter valid document number";
  }

  if (!values.tenantsAddress) {
    errors.tenantsAddress =
      "You must select the address suggested by Google Maps";
  }

  return errors;
};
