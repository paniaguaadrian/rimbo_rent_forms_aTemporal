import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import hbs from "nodemailer-express-handlebars";

// * Rimbo rent emails
// Production / Development
const rimboEmail = "info@rimbo.rent";

// const rimboEmail = "victor@rimbo.rent";
// const rimboEmail = "paniaguasanchezadrian@gmail.com";

// ? =======>  SPANISH VERSION START ==============================>
// ! F1SC Form => E1R (email to Rimbo) E1SC (email to Starcity)
const sendF1SCFormEmails = async (req, res) => {
  const {
    agencyName,
    tenantsFirstName,
    tenantsLastName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    monthlyNetIncome,
    jobType,
    documentImageFront,
    documentImageBack,
    randomID,
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
    building,
    // new variables
    agencyContactPerson,
    agencyEmailPerson,
    agencyPhonePerson,
    rentalAddress,
  } = req.body;

  const transporterE1R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  const transporterE1SC = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE1R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E1REmail",
    },
    viewPath: "views/",
  };

  let optionsE1SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E1SCEmail",
    },
    viewPath: "views/",
  };

  transporterE1R.use("compile", hbs(optionsE1R));
  transporterE1SC.use("compile", hbs(optionsE1SC));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: `Nuevo inquilino registrado por ${agencyName}`,
    text: "",
    attachments: [
      {
        filename: "atemporal_logo.png",
        path: "./views/images/atemporal_logo.png",
        cid: "atemporallogo",
      },
    ],
    template: "E1REmail",
    context: {
      agencyName,
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      building,
      // new variables
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      rentalAddress,
    },
  };

  const AtemporalEmail = {
    from: "Rimbo info@rimbo.rent",
    to: agencyEmailPerson, // aTemporal Email
    subject: "Registro de inquilino correcto",
    text: "",
    attachments: [
      {
        filename: "atemporal_logo.png",
        path: "./views/images/atemporal_logo.png",
        cid: "atemporallogo",
      },
    ],
    template: "E1SCEmail",
    context: {
      agencyName,
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      building,
      // new variables
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      rentalAddress,
    },
  };

  transporterE1R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE1SC.sendMail(AtemporalEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! E1R Email => E2TT (email to Tenant)
const sendE1REmailEmails = async (req, res) => {
  const {
    agencyName,
    tenantsFirstName,
    tenantsLastName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    monthlyNetIncome,
    jobType,
    documentImageFront,
    documentImageBack,
    randomID,
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
    building,
    // new variables
    agencyContactPerson,
    agencyEmailPerson,
    agencyPhonePerson,
    rentalAddress,
  } = req.body;

  const transporterE2TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE2TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E2TTEmail",
    },
    viewPath: "views/",
  };

  transporterE2TT.use("compile", hbs(optionsE2TT));

  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // tenants Email
    subject:
      "Bienvenido a la revolución de los depósitos - Welcome to the deposit revolution",
    text: "",
    attachments: [
      {
        filename: "atemporal_logo.png",
        path: "./views/images/atemporal_logo.png",
        cid: "atemporallogo",
      },
    ],
    template: "E2TTEmail",
    context: {
      agencyName,
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      building,
      // new variables
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      rentalAddress,
    },
  };

  transporterE2TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! F2SC Form => E2R (email to Rimbo that informs tenant is on F2SC)
const sendNotificationRimbo = async (req, res) => {
  const {
    agencyName,
    tenantsFirstName,
    tenantsLastName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    monthlyNetIncome,
    jobType,
    documentImageFront,
    documentImageBack,
    randomID,
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
    building,
    // new variables
    agencyContactPerson,
    agencyEmailPerson,
    agencyPhonePerson,
    rentalAddress,
  } = req.body;

  const transporterE2R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE2R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E2REmail",
    },
    viewPath: "views/",
  };

  transporterE2R.use("compile", hbs(optionsE2R));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: `${agencyName}-${tenantsFirstName} ${tenantsLastName}-Registration Start`,
    text: "",
    attachments: [
      {
        filename: "atemporal_logo.png",
        path: "./views/images/atemporal_logo.png",
        cid: "atemporallogo",
      },
    ],
    template: "E2REmail",
    context: {
      agencyName,
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      building,
      // new variables
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      rentalAddress,
    },
  };

  transporterE2R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! F2SC Form => E3 (Rimbo, tenant, aTemporal)
const sendF2SCFormEmails = async (req, res) => {
  const {
    agencyName,
    tenantsFirstName,
    tenantsLastName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    monthlyNetIncome,
    jobType,
    documentImageFront,
    documentImageBack,
    randomID,
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
    building,
    // new variables
    agencyContactPerson,
    agencyEmailPerson,
    agencyPhonePerson,
    rentalAddress,
  } = req.body;

  const transporterE3R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterE3TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterE3SC = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  let optionsE3R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3REmail",
    },
    viewPath: "views/",
  };
  let optionsE3TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3TTEmail",
    },
    viewPath: "views/",
  };
  let optionsE3SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3SCEmail",
    },
    viewPath: "views/",
  };

  transporterE3R.use("compile", hbs(optionsE3R));
  transporterE3TT.use("compile", hbs(optionsE3TT));
  transporterE3SC.use("compile", hbs(optionsE3SC));

  // Rimbo Email
  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: `${tenantsFirstName} ${tenantsLastName} Tarjeta registrada correctamente`,
    text: "",
    attachments: [
      {
        filename: "atemporal_logo.png",
        path: "./views/images/atemporal_logo.png",
        cid: "atemporallogo",
      },
    ],
    template: "E3REmail",
    context: {
      agencyName,
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      building,
      // new variables
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      rentalAddress,
    },
  };
  // Tenant Email
  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // Tenant Email
    subject: "Bienvenido a aTemporal & Rimbo",
    text: "",
    attachments: [
      {
        filename: "atemporal_logo.png",
        path: "./views/images/atemporal_logo.png",
        cid: "atemporallogo",
      },
      {
        filename: "Tenant_General_Rules_Guidelines _ATEMPORAL_ES.pdf",
        path: "./views/images/Tenant_General_Rules_Guidelines _ATEMPORAL_ES.pdf",
      },
    ],
    template: "E3TTEmail",
    context: {
      agencyName,
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      building,
      // new variables
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      rentalAddress,
    },
  };
  // Starcity Email
  const SCEmail = {
    from: "Rimbo info@rimbo.rent",
    to: agencyEmailPerson, // Atemporal Email
    subject: `${tenantsFirstName} ${tenantsLastName} Tarjeta registrada correctamente`,
    text: "",
    attachments: [
      {
        filename: "atemporal_logo.png",
        path: "./views/images/atemporal_logo.png",
        cid: "atemporallogo",
      },
    ],
    template: "E3SCEmail",
    context: {
      agencyName,
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      building,
      // new variables
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      rentalAddress,
    },
  };

  transporterE3R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE3TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE3SC.sendMail(SCEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};
// ? =======>  SPANISH VERSION END ==============================>
////////////////////////////////////////////////////////////////
// ? =======>  ENGLISH VERSION START ==============================>
// ! F1SC Form => E1R
const sendF1SCFormEmailsEn = async (req, res) => {
  const {
    agencyName,
    tenantsFirstName,
    tenantsLastName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    monthlyNetIncome,
    jobType,
    documentImageFront,
    documentImageBack,
    randomID,
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
    building,
    // new variables
    agencyContactPerson,
    agencyEmailPerson,
    agencyPhonePerson,
    rentalAddress,
  } = req.body;

  const transporterE1R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  const transporterE1SC = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE1R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E1REmailEn",
    },
    viewPath: "views/",
  };

  let optionsE1SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E1SCEmailEn",
    },
    viewPath: "views/",
  };

  transporterE1R.use("compile", hbs(optionsE1R));
  transporterE1SC.use("compile", hbs(optionsE1SC));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: `New Tenant Listing by ${agencyName}`,
    text: "",
    attachments: [
      {
        filename: "atemporal_logo.png",
        path: "./views/images/atemporal_logo.png",
        cid: "atemporallogo",
      },
    ],
    template: "E1REmailEn",
    context: {
      agencyName,
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      building,
      // new variables
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      rentalAddress,
    },
  };

  const AtemporalEmail = {
    from: "Rimbo info@rimbo.rent",
    to: agencyEmailPerson, // Starcity Email
    subject: "Tenant successfully registered",
    text: "",
    attachments: [
      {
        filename: "atemporal_logo.png",
        path: "./views/images/atemporal_logo.png",
        cid: "atemporallogo",
      },
    ],
    template: "E1SCEmailEn",
    context: {
      agencyName,
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      building,
      // new variables
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      rentalAddress,
    },
  };

  transporterE1R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE1SC.sendMail(AtemporalEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! E1R Email => E2TT (email to Tenant)
const sendE1REmailEmailsEn = async (req, res) => {
  const {
    agencyName,
    tenantsFirstName,
    tenantsLastName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    monthlyNetIncome,
    jobType,
    documentImageFront,
    documentImageBack,
    randomID,
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
    building,
    // new variables
    agencyContactPerson,
    agencyEmailPerson,
    agencyPhonePerson,
    rentalAddress,
  } = req.body;

  const transporterE2TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE2TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E2TTEmailEn",
    },
    viewPath: "views/",
  };

  transporterE2TT.use("compile", hbs(optionsE2TT));

  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // Rimbo Email
    subject: "Welcome to the deposit revolution",
    text: "",
    attachments: [
      {
        filename: "atemporal_logo.png",
        path: "./views/images/atemporal_logo.png",
        cid: "atemporallogo",
      },
    ],
    template: "E2TTEmailEn",
    context: {
      agencyName,
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      building,
      // new variables
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      rentalAddress,
    },
  };

  transporterE2TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! F2SC Form => E2R (email to Rimbo that informs tenant is on F2SC)
const sendNotificationRimboEn = async (req, res) => {
  const {
    agencyName,
    tenantsFirstName,
    tenantsLastName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    monthlyNetIncome,
    jobType,
    documentImageFront,
    documentImageBack,
    randomID,
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
    building,
    // new variables
    agencyContactPerson,
    agencyEmailPerson,
    agencyPhonePerson,
    rentalAddress,
  } = req.body;

  const transporterE2R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE2R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E2REmailEn",
    },
    viewPath: "views/",
  };

  transporterE2R.use("compile", hbs(optionsE2R));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: `${agencyName}-${tenantsFirstName} ${tenantsLastName}-Registration Start`,
    text: "",
    attachments: [
      {
        filename: "atemporal_logo.png",
        path: "./views/images/atemporal_logo.png",
        cid: "atemporallogo",
      },
    ],
    template: "E2REmailEn",
    context: {
      agencyName,
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      building,
      // new variables
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      rentalAddress,
    },
  };

  transporterE2R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! F2SC Form => E3 (Rimbo, tenant, aTemporal)
const sendF2SCFormEmailsEn = async (req, res) => {
  const {
    agencyName,
    tenantsFirstName,
    tenantsLastName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    monthlyNetIncome,
    jobType,
    documentImageFront,
    documentImageBack,
    randomID,
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
    building,
    // new variables
    agencyContactPerson,
    agencyEmailPerson,
    agencyPhonePerson,
    rentalAddress,
  } = req.body;

  const transporterE3R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterE3TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterE3SC = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  let optionsE3R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3REmailEn",
    },
    viewPath: "views/",
  };
  let optionsE3TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3TTEmailEn",
    },
    viewPath: "views/",
  };
  let optionsE3SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3SCEmailEn",
    },
    viewPath: "views/",
  };

  transporterE3R.use("compile", hbs(optionsE3R));
  transporterE3TT.use("compile", hbs(optionsE3TT));
  transporterE3SC.use("compile", hbs(optionsE3SC));

  // Rimbo Email
  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: `${tenantsFirstName} ${tenantsLastName} Card successfully registered`,
    text: "",
    attachments: [
      {
        filename: "atemporal_logo.png",
        path: "./views/images/atemporal_logo.png",
        cid: "atemporallogo",
      },
    ],
    template: "E3REmailEn",
    context: {
      agencyName,
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      building,
      // new variables
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      rentalAddress,
    },
  };
  // Tenant Email
  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // Tenant Email
    subject: "Welcome to aTemporal & Rimbo",
    text: "",
    attachments: [
      {
        filename: "atemporal_logo.png",
        path: "./views/images/atemporal_logo.png",
        cid: "atemporallogo",
      },
      {
        filename: "Tenant_General_Rules_Guidelines_ATEMPORAL_EN.pdf",
        path: "./views/images/Tenant_General_Rules_Guidelines_ATEMPORAL_EN.pdf",
      },
    ],
    template: "E3TTEmailEn",
    context: {
      agencyName,
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      building,
      // new variables
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      rentalAddress,
    },
  };
  // Starcity Email
  const SCEmail = {
    from: "Rimbo info@rimbo.rent",
    to: agencyEmailPerson, // aTemporal Email
    subject: `${tenantsFirstName} ${tenantsLastName} Card successfully registered`,
    text: "",
    attachments: [
      {
        filename: "atemporal_logo.png",
        path: "./views/images/atemporal_logo.png",
        cid: "atemporallogo",
      },
    ],
    template: "E3SCEmailEn",
    context: {
      agencyName,
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      building,
      // new variables
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      rentalAddress,
    },
  };

  transporterE3R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE3TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE3SC.sendMail(SCEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};
// ? =======> ENGLISH VERSION END ==============================>

export {
  sendF1SCFormEmails,
  sendE1REmailEmails,
  sendNotificationRimbo,
  sendF2SCFormEmails,
  sendF1SCFormEmailsEn,
  sendE1REmailEmailsEn,
  sendNotificationRimboEn,
  sendF2SCFormEmailsEn,
};
