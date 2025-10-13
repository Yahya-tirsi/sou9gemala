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

      const data = await response.json();

      if (!response.ok) {
        // Create structured error with backend response
        const error = new Error(data.message || "Registration failed");
        error.response = {
          data,
          status: response.status,
        };
        throw error;
      }

      return data;
    } catch (error) {
      // Ensure consistent error structure
      if (!error.response) {
        error.response = { data: { message: error.message } };
      }
      throw error;
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

  // Supplier store information
  registerSupplierStoreInfo: async (sellerId, storeData) => {
    try {
      if (!sellerId) {
        throw new Error("Seller ID is required");
      }

      const response = await fetch(
        `${API_BASE_URL}/sellers/${sellerId}/stores`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(storeData),
        }
      );
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || "Failed store information");
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

  // Forget password supplier
  resetPassword: async (email, token, newPassword) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token, newPassword }),
      });
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || "Password reset request failed");
    }
  },

  // Verify email
  verifyEmail: async (email, code) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/confirm-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code }),
        }
      );
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
