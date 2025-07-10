const API_BASE_URL = "http://localhost:5000/api/suppliers";

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Request failed");
  }
  return response.json();
};

const supplierApi = {
  // Register supplier
  register: async (supplierData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supplierData),
      });
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || "Failed to register supplier");
    }
  },

  // Verify email
  verifyEmail: async (email, code) => {
    try {
      const response = await fetch(`${API_BASE_URL}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || "Failed to verify email");
    }
  },

  // Send verification code
  sendVerificationCode: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/send-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || "Failed to send verification code");
    }
  },

  // Check if email exists
  checkEmailExists: async (email) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/check-email?email=${encodeURIComponent(email)}`
      );
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || "Failed to check email");
    }
  },
};

export default supplierApi;
