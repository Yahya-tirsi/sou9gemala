const API_BASE_URL = "https://localhost:5001/api";

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
      const response = await fetch(`${API_BASE_URL}/auth/register/seller`, {
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

  // Login supplier
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  },

  // Forget password supplier
  forgotPassword: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || "Password reset request failed");
    }
  },

  // Verify email
  verifyEmail: async (email, code) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/confirm-verification`, {
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
      const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
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
        `${API_BASE_URL}/auth/check-email/${encodeURIComponent(email)}`
      );
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || "Failed to check email");
    }
  },
};

export default supplierApi;
