import supplierApi from "../../api/supplierApi";

const register = async (supplierData) => {
  try {
    const response = await supplierApi.register(supplierData);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to register supplier");
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
};

export default supplierService;
