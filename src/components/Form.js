import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    gender: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
    email: "",
    phone_number: "",
    institution_name: "GNIOT",
    institution_city: "Greater Noida",
    institution_state: "Uttar Pradesh",
    institution_country: "India",
    institution_address:
      "Plot No. 7, Knowledge Park II, Greater Noida, Uttar Pradesh 201310",
    institution_postal_code: "201310",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone Number Validation (max 15 digits)
    if (name === "phone_number" && !/^\d{0,15}$/.test(value)) {
      alert("Phone number should be numeric and not exceed 15 digits.");
      return;
    }

    // Email Validation (valid domain required)
    if (
      name === "email" &&
      value &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    ) {
      alert("Please enter a valid email address with a proper domain.");
      return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value || "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form data:", formData);

      const response = await axios.post(
        "https://agratasinfotech.com/api/v1/campusconnect/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);
      alert("Form submitted successfully!");
      setFormData({
        full_name: "",
        date_of_birth: "",
        gender: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zip_code: "",
        email: "",
        phone_number: "",
        institution_name: "GNIOT",
        institution_city: "Greater Noida",
        institution_state: "Uttar Pradesh",
        institution_country: "India",
        institution_address:
          "Plot No. 7, Knowledge Park II, Greater Noida, Uttar Pradesh 201310",
        institution_postal_code: "201310",
      });
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        alert(
          `Failed to submit form: ${
            error.response.data?.message || "Bad Request"
          }`
        );
      } else {
        console.error("Error submitting form:", error);
        alert("Failed to submit form.");
      }
    }
  };

  const renderInputField = (label, name, type = "text", required = true) => (
    <div className="form-group my-3">
      <label htmlFor={name}>
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>
      <input
        type={type}
        className="form-control"
        id={name}
        name={name}
        placeholder={`Enter ${label.toLowerCase()}`}
        value={formData[name] || ""}
        onChange={handleChange}
        required={required}
      />
    </div>
  );

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={handleSubmit}
        className="w-100"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">Registration Form</h2>

        {renderInputField("Full Name", "full_name")}
        {renderInputField("Gender", "gender")}
        {renderInputField("Date of Birth", "date_of_birth", "date")}
        {renderInputField("Street", "street")}
        {renderInputField("City", "city")}
        {renderInputField("State", "state")}
        {renderInputField("Country", "country")}
        {renderInputField("Zip Code", "zip_code")}
        {renderInputField("Email", "email", "email")}
        {renderInputField("Phone Number", "phone_number")}

        {/* Hidden Institution Details */}
        <input
          type="hidden"
          name="institution_name"
          value={formData.institution_name}
        />
        <input
          type="hidden"
          name="institution_city"
          value={formData.institution_city}
        />
        <input
          type="hidden"
          name="institution_state"
          value={formData.institution_state}
        />
        <input
          type="hidden"
          name="institution_country"
          value={formData.institution_country}
        />
        <input
          type="hidden"
          name="institution_address"
          value={formData.institution_address}
        />
        <input
          type="hidden"
          name="institution_postal_code"
          value={formData.institution_postal_code}
        />

        <button type="submit" className="btn btn-warning w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
