const config = [
  {
    id: "accountInfo",
    title: "Account Information",
    fields: [
      {
        id: "email",
        label: "Email Address",
        type: "email",
        placeholder: "Enter email here",
        required: true,
        validate: (email) => utils.isValidEmail(email),
      },
      {
        id: "username",
        label: "Username",
        type: "text",
        placeholder: "Enter username here",
        required: true,
      },
    ],
  },
  {
    id: "personalDetails",
    title: "Personal Details",
    fields: [
      {
        id: "name",
        label: "Name",
        type: "text",
        placeholder: "Name",
        required: true,
      },
      {
        id: "dob",
        label: "Date of Birth",
        type: "date",
        required: true,
      },
      {
        id: "gender",
        label: "Gender",
        type: 'select',
        options: [
            {value: 'male', label: 'Male'},
            {value: 'female', label: 'Female'},
            {value: 'other', label: 'Other'}
        ],
        required: true,
      },
    ],
  },
  {
    id: "verification",
    title: "Verification",
    fields: [
      {
        id: "commVerification",
        type: "custom",
        component: "CommVerification",
        required: true,
        validate: (value) => value === '0000'
      },
    ],
  },
  {
    id: "businessDetails",
    title: "Business Details",
    fields: [
      {
        id: "companyName",
        label: "Company Name",
        type: "text",
        placeholder: "Enter company name heree",
        required: true,
      },
      {
        id: "companySize",
        label: "Company Size",
        type: "select",
        required: true,
        options: [
          { value: "1-10", label: "1-10" },
          { value: "11-50", label: "11-50" },
          { value: "51+", label: "51+" },
        ],
      },
      {
        id: "hasOpTeam",
        label: "Do you have a dedicated operations team?",
        type: "checkbox",
        dependableField: { field: "companySize", value: "51+" },
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    fields: [
      {
        id: "passwordComp",
        type: "custom",
        component: "PasswordComponent",
        required: true,
      },
    ],
  },
  {
    id: "preferences",
    title: "Preferences",
    fields: [
      {
        id: "commPreference",
        label: "Communication Preference",
        type: "select",
        required: true,
        options: [
          { value: "email", label: "Email" },
          { value: "sms", label: "SMS" },
          { value: "whatsapp", label: "Whatsapp" },
        ],
      },
    ],
  },
  {
    id: "review",
    title: "Review & Submit",
    fields: [{ id: "reviewBlock", type: "custom", component: "ReviewComponent" }],
  },
];
