export const sampleServices = [
  {
    title: "Income Tax Return (Salaried Persons)",
    description:
      "Quick and hassle-free ITR filing for salaried individuals. We ensure maximum tax savings and error-free filing with expert support.",
    idealClients: ["Salaried Persons", "Freelancers"],
    deliverables: [
      "End-to-end ITR filing",
      "Error-free computation",
      "Tax savings advisory",
    ],
    turnaroundTime: "1-2 business days",
    formFields: [
      { label: "Full Name", name: "fullName", fieldType: "text" },
      { label: "PAN Card (Upload)", name: "panCardFile", fieldType: "file" },
      {
        label: "Aadhaar Card (Upload)",
        name: "aadhaarFile",
        fieldType: "file",
      },
      { label: "Form-16 (Upload)", name: "form16File", fieldType: "file" },
      {
        label: "Bank Account Details (Account No. + IFSC)",
        name: "bankDetails",
        fieldType: "textarea",
      },
      {
        label: "Bank Statement (Apr to Mar, optional)",
        name: "bankStatementFile",
        fieldType: "file",
      },
      {
        label: "Income Tax Login Password (if not first-time filer)",
        name: "incomeTaxPassword",
        fieldType: "text",
      },
      {
        label: "Mobile Number (Aadhaar Linked)",
        name: "mobileNumber",
        fieldType: "tel",
      },
      { label: "Email Address", name: "email", fieldType: "email" },
    ],
    price: { display: "Starting at ₹500", amount: 500 },
  },

  {
    title: "Income Tax Return (Business Persons)",
    description:
      "Professional ITR filing tailored for businesses. We manage your accounts, compliance, and ensure smooth filing with minimal effort from your side.",
    idealClients: ["Startups", "Businesses"],
    deliverables: [
      "Business ITR filing",
      "Profit & Loss + Balance Sheet review",
      "Compliance-ready documentation",
    ],
    turnaroundTime: "2-3 business days",
    formFields: [
      { label: "Business/Trade Name", name: "businessName", fieldType: "text" },
      { label: "PAN Card (Upload)", name: "panCardFile", fieldType: "file" },
      {
        label: "Aadhaar Card (Upload)",
        name: "aadhaarFile",
        fieldType: "file",
      },
      {
        label: "Last Year’s P&L and Balance Sheet (Upload)",
        name: "plBalanceSheetFile",
        fieldType: "file",
      },
      {
        label: "Bank Statement (Apr to Mar)",
        name: "bankStatementFile",
        fieldType: "file",
      },
      {
        label: "Stock Statement (as on 31st March, if CC account)",
        name: "stockStatementFile",
        fieldType: "file",
      },
      {
        label: "Major Monthly Expenses with Amount",
        name: "majorExpenses",
        fieldType: "textarea",
      },
      {
        label:
          "Expenses Payable (31st Mar: creditors, wages, electricity, etc.)",
        name: "expensesPayable",
        fieldType: "textarea",
      },
      {
        label: "Stock & Debtors (as on 31st Mar)",
        name: "stockDebtors",
        fieldType: "textarea",
      },
      {
        label: "Main Business Activities",
        name: "businessActivities",
        fieldType: "textarea",
      },
      {
        label: "Income Tax Login Password (if not first-time filer)",
        name: "incomeTaxPassword",
        fieldType: "text",
      },
      {
        label: "Bank Account Details",
        name: "bankDetails",
        fieldType: "textarea",
      },
      { label: "Mobile Number", name: "mobileNumber", fieldType: "tel" },
      { label: "Email Address", name: "email", fieldType: "email" },
    ],
    price: { display: "Starting at ₹1000", amount: 1000 },
  },

  {
    title: "Projected Report & Balance Sheet",
    description:
      "Get detailed projected reports and balance sheets for business or individual requirements, tailored for loans, investments, or compliance purposes.",
    idealClients: ["Startups", "Businesses", "Salaried Persons", "Freelancers"],
    deliverables: [
      "Projected balance sheet preparation",
      "Loan-ready documentation",
      "Detailed financial analysis",
    ],
    turnaroundTime: "1-2 business days",
    formFields: [
      {
        label: "Full Name / Business Name",
        name: "entityName",
        fieldType: "text",
      },
      { label: "PAN Card (Upload)", name: "panCardFile", fieldType: "file" },
      {
        label: "Aadhaar Card (Upload)",
        name: "aadhaarFile",
        fieldType: "file",
      },
      {
        label: "Last Year’s P&L and Balance Sheet (Upload)",
        name: "plBalanceSheetFile",
        fieldType: "file",
      },
      {
        label: "Bank Statement (Apr to Mar)",
        name: "bankStatementFile",
        fieldType: "file",
      },
      {
        label: "Stock Statement (as on 31st March)",
        name: "stockStatementFile",
        fieldType: "file",
      },
      {
        label: "Estimated Project Cost",
        name: "projectCost",
        fieldType: "text",
      },
      {
        label: "Loan Type (Term Loan / Cash Credit)",
        name: "loanType",
        fieldType: "text",
      },
      { label: "Loan Amount Required", name: "loanAmount", fieldType: "text" },
      {
        label: "Major Monthly Expenses with Amount",
        name: "majorExpenses",
        fieldType: "textarea",
      },
      {
        label: "Expenses Payable (31st Mar: creditors, wages, etc.)",
        name: "expensesPayable",
        fieldType: "textarea",
      },
      {
        label: "Stock & Debtors (as on 31st Mar)",
        name: "stockDebtors",
        fieldType: "textarea",
      },
      {
        label: "Main Business Activities",
        name: "businessActivities",
        fieldType: "textarea",
      },
      {
        label: "Bank Account Details",
        name: "bankDetails",
        fieldType: "textarea",
      },
      { label: "Mobile Number", name: "mobileNumber", fieldType: "tel" },
      { label: "Email Address", name: "email", fieldType: "email" },
    ],
    price: { display: "Starting at ₹1500", amount: 1500 },
  },

  {
    title: "GST Registration (Individual)",
    description:
      "End-to-end GST registration for individuals starting a business, ensuring compliance with all statutory requirements.",
    idealClients: ["Individuals"],
    deliverables: [
      "GST registration certificate",
      "Principal business verification",
      "Compliance-ready setup",
    ],
    turnaroundTime: "2-3 business days",
    formFields: [
      { label: "Business/Firm Name", name: "businessName", fieldType: "text" },
      {
        label: "Complete Address of Business",
        name: "businessAddress",
        fieldType: "textarea",
      },
      {
        label: "List of Goods & Services (at least 4 items)",
        name: "goodsServices",
        fieldType: "textarea",
      },
      {
        label: "Date of Commencement of Business",
        name: "businessStartDate",
        fieldType: "date",
      },
      {
        label: "Proprietor Photograph (Upload)",
        name: "proprietorPhoto",
        fieldType: "file",
      },
      {
        label: "Proprietor Aadhaar Card (Upload)",
        name: "aadhaarFile",
        fieldType: "file",
      },
      {
        label: "Proprietor PAN Card (Upload)",
        name: "panCardFile",
        fieldType: "file",
      },
      {
        label: "Electricity Bill / Rent Agreement / Property Proof (Upload)",
        name: "propertyProofFile",
        fieldType: "file",
      },
      {
        label: "Udyog Certificate (if available)",
        name: "udyogCertificate",
        fieldType: "file",
      },
      {
        label: "Trade Licence (if available)",
        name: "tradeLicence",
        fieldType: "file",
      },
      {
        label: "Letterhead of Business (Upload)",
        name: "letterheadFile",
        fieldType: "file",
      },
      {
        label: "Bank Account Proof (Cancelled Cheque / Statement)",
        name: "bankProofFile",
        fieldType: "file",
      },
      {
        label: "Aadhaar Linked Mobile Number",
        name: "mobileNumber",
        fieldType: "tel",
      },
      { label: "Email Address", name: "email", fieldType: "email" },
    ],
    price: { display: "Starting at ₹1500", amount: 1500 },
  },

  {
    title: "GST Registration (Partnership Firm)",
    description:
      "Seamless GST registration for partnership firms, covering all partners’ documentation and compliance requirements.",
    idealClients: ["Businesses", "Startups"],
    deliverables: [
      "GST registration certificate",
      "Authorized signatory compliance",
      "Firm-wide documentation",
    ],
    turnaroundTime: "2-3 business days",
    formFields: [
      { label: "Partnership Firm Name", name: "firmName", fieldType: "text" },
      {
        label: "Partnership Deed (Upload)",
        name: "partnershipDeedFile",
        fieldType: "file",
      },
      {
        label: "PAN Card of All Partners (Upload)",
        name: "partnersPanFile",
        fieldType: "file",
      },
      {
        label: "Aadhaar Card of Authorized Signatory (Upload)",
        name: "signatoryAadhaarFile",
        fieldType: "file",
      },
      {
        label: "Appointment Proof of Authorized Signatory (Upload)",
        name: "appointmentProofFile",
        fieldType: "file",
      },
      {
        label: "Photographs of Partners & Signatories (Upload)",
        name: "partnersPhotosFile",
        fieldType: "file",
      },
      {
        label: "Address Proof of Partners (Upload)",
        name: "partnersAddressProofFile",
        fieldType: "file",
      },
      {
        label:
          "LLP Registration Certificate / Board Resolution (if applicable)",
        name: "llpCertificateFile",
        fieldType: "file",
      },
      {
        label: "Address Proof of Principal Place of Business (Upload)",
        name: "businessAddressProofFile",
        fieldType: "file",
      },
      {
        label: "Bank Account Details (Upload)",
        name: "bankDetailsFile",
        fieldType: "file",
      },
      { label: "Mobile Number", name: "mobileNumber", fieldType: "tel" },
      { label: "Email Address", name: "email", fieldType: "email" },
    ],
    price: { display: "Starting at ₹2000", amount: 2000 },
  },

  {
    title: "FSSAI Certificate",
    description:
      "Get your FSSAI food license with minimal hassle. We handle documentation and application filing to ensure compliance with food safety laws.",
    idealClients: ["Businesses", "Startups", "Individuals"],
    deliverables: [
      "FSSAI license registration",
      "Complete documentation",
      "Government approval handling",
    ],
    turnaroundTime: "2-3 business days",
    formFields: [
      {
        label: "Full Name / Business Name",
        name: "entityName",
        fieldType: "text",
      },
      {
        label: "Aadhaar Linked Mobile Number",
        name: "mobileNumber",
        fieldType: "tel",
      },
      { label: "Email Address", name: "email", fieldType: "email" },
      {
        label: "Aadhaar Card (Upload)",
        name: "aadhaarFile",
        fieldType: "file",
      },
      {
        label: "Self Declaration Form (Upload)",
        name: "selfDeclarationFile",
        fieldType: "file",
      },
    ],
    price: { display: "Starting at ₹1000", amount: 1000 },
  },

  {
    title: "Trade Licence",
    description:
      "Apply for a trade license to legally run your business. We help prepare and file all documents required by municipal authorities.",
    idealClients: ["Businesses", "Startups", "Individuals"],
    deliverables: [
      "Trade licence application",
      "Municipal authority approval",
      "Compliance documentation",
    ],
    turnaroundTime: "2-3 business days",
    formFields: [
      { label: "Business Name", name: "businessName", fieldType: "text" },
      {
        label: "Business Premises Area Details",
        name: "premisesDetails",
        fieldType: "textarea",
      },
      {
        label: "Nature of Business / Trade Activities",
        name: "businessNature",
        fieldType: "textarea",
      },
      {
        label: "Proof of Identity (PAN/Aadhaar etc., Upload)",
        name: "identityProofFile",
        fieldType: "file",
      },
      {
        label: "Proof of Address (Upload)",
        name: "addressProofFile",
        fieldType: "file",
      },
      {
        label: "Ownership Proof (Property docs/Lease agreement, Upload)",
        name: "ownershipProofFile",
        fieldType: "file",
      },
      {
        label: "Electricity Connection Details",
        name: "electricityDetails",
        fieldType: "textarea",
      },
      {
        label: "NOC from Fire Department/Owner (if applicable, Upload)",
        name: "nocFile",
        fieldType: "file",
      },
      {
        label: "Any Other Existing Licence (Upload)",
        name: "existingLicenceFile",
        fieldType: "file",
      },
      {
        label: "Affidavit (Form-Appendix-4, Upload)",
        name: "affidavitFile",
        fieldType: "file",
      },
      { label: "Mobile Number", name: "mobileNumber", fieldType: "tel" },
      { label: "Email Address", name: "email", fieldType: "email" },
    ],
    price: { display: "Starting at ₹1500", amount: 1500 },
  },

  {
    title: "PAN Card Application (Partnership Firm)",
    description:
      "Apply for a PAN card for your partnership firm with complete documentation and filing support.",
    idealClients: ["Businesses", "Startups"],
    deliverables: [
      "PAN card application",
      "Digital signature handling",
      "Firm-wide documentation",
    ],
    turnaroundTime: "2-3 business days",
    formFields: [
      { label: "Partnership Firm Name", name: "firmName", fieldType: "text" },
      {
        label: "Partnership Deed (Upload)",
        name: "partnershipDeedFile",
        fieldType: "file",
      },
      {
        label:
          "Digital Signature Certificate (DSC) of Authorized Partner (Upload)",
        name: "dscFile",
        fieldType: "file",
      },
      {
        label: "Office Address Proof (Upload)",
        name: "officeAddressProofFile",
        fieldType: "file",
      },
      {
        label: "PAN Card of All Partners (Upload)",
        name: "partnersPanFile",
        fieldType: "file",
      },
      {
        label: "Aadhaar Card of All Partners (Upload)",
        name: "partnersAadhaarFile",
        fieldType: "file",
      },
      {
        label: "Certificate of Registration of Partnership Firm (Upload)",
        name: "registrationCertificateFile",
        fieldType: "file",
      },
      {
        label: "Photographs of Partners (Upload)",
        name: "partnersPhotosFile",
        fieldType: "file",
      },
      { label: "Mobile Number", name: "mobileNumber", fieldType: "tel" },
      { label: "Email Address", name: "email", fieldType: "email" },
    ],
    price: { display: "Starting at ₹700", amount: 700 },
  },
];
