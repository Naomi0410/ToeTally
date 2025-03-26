const validateFields = {
  email: {
    required: "Required field.",
    validate: {
      maxLength: (v) =>
        v.length <= 50 || "The email should have at most 50 characters",
      matchPattern: (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "Invalid email",
    },
  },
  name: {
    required: "Required field.",
  },
  address: {
    required: "Required field.",
  },
  phone: {
    required: "Required field.",
  },
  state: {
    required: "Required field.",
  },
  city: {
    required: "Required field.",
  },
  country: {
    required: "Required field.",
  },
};

export default validateFields;
