import supplierApi from "../../api/supplierApi";

const register = async (supplierData) => {
  try {
    const response = await supplierApi.register(supplierData);
    return response;
  } catch (error) {
    // Transform the backend error into a standardized format
    if (error.response?.data?.DuplicatePhoneNumber) {
      const err = new Error(error.response.data.DuplicatePhoneNumber[0]);
      err.type = "DUPLICATE_PHONE";
      throw err;
    }
    throw error;
  }
};

const login = async (credentials) => {
  try {
    const response = await supplierApi.login(credentials);
    return response;
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};

const registerSupplierStoreInfo = async (sellerId, storeData) => {
  try {
    const response = await supplierApi.registerSupplierStoreInfo(sellerId, storeData);
    return response;
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};

const forgotPassword = async (email) => {
  try {
    const response = await supplierApi.forgotPassword(email);
    return response;
  } catch (error) {
    throw new Error(error.message || "Password reset request failed");
  }
};

const resetPassword = async (email, token, newPassword) => {
  try {
    const response = await supplierApi.resetPassword(email, token, newPassword);
    return response;
  } catch (error) {
    throw new Error(error.message || "Password reset request failed");
  }
};

const verifyEmail = async (email, code) => {
  try {
    const response = await supplierApi.verifyEmail(email, code);
    return response;
  } catch (error) {
    throw new Error(error.message || "Failed to verify email");
  }
};

const sendVerificationCode = async (email) => {
  try {
    const response = await supplierApi.sendVerificationCode(email);
    return response;
  } catch (error) {
    throw new Error(error.message || "Failed to send verification code");
  }
};

const checkEmailExists = async (email) => {
  try {
    const response = await supplierApi.checkEmailExists(email);
    return response;
  } catch (error) {
    throw new Error(error.message || "Failed to check email");
  }
};

const supplierService = {
  register,
  verifyEmail,
  sendVerificationCode,
  checkEmailExists,
  login,
  forgotPassword,
  resetPassword,
  registerSupplierStoreInfo,
};

export default supplierService;
