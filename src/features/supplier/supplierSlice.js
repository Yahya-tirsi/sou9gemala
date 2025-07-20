import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supplierService from "./supplierService";

const initialState = {
  supplier: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isVerificationSent: false,
  message: "",
  currentStep: 1, // Track registration steps
  verificationEmail: "", // Store email for verification
  registrationData: {}, // Store form data between steps
};

// Register supplier (multi-step process)
export const registerSupplier = createAsyncThunk(
  "supplier/register",
  async (supplierData, thunkAPI) => {
    try {
      const response = await supplierService.register(supplierData);
      return response;
    } catch (error) {
      if (error.response?.data?.DuplicatePhoneNumber) {
        console.log(error);

        return thunkAPI.rejectWithValue({
          message: error.response.data.DuplicatePhoneNumber[0],
          type: "DUPLICATE_PHONE",
          field: "phoneNumber",
        });
      }
      return thunkAPI.rejectWithValue({
        message: error.message,
        type: "GENERAL_ERROR",
      });
    }
  }
);

export const login = createAsyncThunk(
  "supplier/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await supplierService.login(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "supplier/forgotPassword",
  async (email, thunkAPI) => {
    try {
      await supplierService.forgotPassword(email);
      return email;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "supplier/resetPassword",
  async ({ email, token, newPassword }, thunkAPI) => {
    try {
      await supplierService.resetPassword(email, token, newPassword);
      return email;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Send verification code
export const sendVerificationCode = createAsyncThunk(
  "supplier/sendVerification",
  async (email, thunkAPI) => {
    try {
      await supplierService.sendVerificationCode(email);
      return email;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const checkEmailExists = createAsyncThunk(
  "supplier/checkEmailExists",
  async (email, { rejectWithValue }) => {
    try {
      const response = await supplierService.checkEmailExists(email);
      return { exists: response.exists };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Verify email
export const verifyEmail = createAsyncThunk(
  "supplier/verifyEmail",
  async ({ email, code }, thunkAPI) => {
    try {
      const response = await supplierService.verifyEmail(email, code);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    saveStepData: (state, action) => {
      state.registrationData = {
        ...state.registrationData,
        ...action.payload,
      };
    },
    setVerificationSent: (state, action) => {
      state.isVerificationSent = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder

      // Registration process
      .addCase(registerSupplier.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(registerSupplier.fulfilled, (state, action) => {
        state.isLoading = false;

        switch (action.payload.step) {
          case 1:
            state.registrationData = {
              ...state.registrationData,
              ...action.payload.data,
            };
            state.currentStep = 2;
            break;

          case 2:
            state.verificationEmail = action.payload.email;
            state.isVerificationSent = true;
            state.currentStep = 3;
            break;

          case 3:
            state.currentStep = 4;
            break;

          case 4:
            state.isSuccess = true;
            state.supplier = action.payload.supplier;
            break;
        }
      })
      .addCase(registerSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Verification code
      .addCase(sendVerificationCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendVerificationCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isVerificationSent = true;
        state.verificationEmail = action.payload;
      })
      .addCase(sendVerificationCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Login process
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.supplier = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Forget password process
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Password reset instructions sent";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Reset password process
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.supplier = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {
  reset,
  setStep,
  setResetData,
  clearResetData,
  saveStepData,
  setVerificationSent,
} = supplierSlice.actions;

export default supplierSlice.reducer;
