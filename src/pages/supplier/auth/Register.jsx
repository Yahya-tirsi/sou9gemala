// Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicInfo from "../../../components/supplier/BasicInfo";
import PersonalInfo from "../../../components/supplier/PersonalInfo";
import StoreInfo from "../../../components/supplier/StoreInfo";
import RegistrationSuccessModal from "../../../components/supplier/RegistrationSuccessModal";
import EmailInput from "../../../components/supplier/EmailInput";
import VerificationEmailCode from "../../../components/supplier/VerificationEmailCode";
import { registerSupplier } from "../../../features/supplier/supplierSlice";
import { registerSupplierStoreInfo } from "../../../features/supplier/supplierSlice"; // Add this import
import { useDispatch } from "react-redux";

const SupplierRegister = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [sellerId, setSellerId] = useState(null); // Add state for seller ID
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleBasicInfoSubmit = (data) => {
    setFormData({ ...formData, ...data });
    nextStep();
  };

  const handleVerificationComplete = () => {
    nextStep();
  };

  const handlePersonalInfoSubmit = async (data) => {
    try {
      setApiError(null);

      const resultAction = await dispatch(
        registerSupplier({
          ...formData,
          phoneNumber: data.phoneNumber,
          password: data.password,
        })
      );

      if (registerSupplier.fulfilled.match(resultAction)) {
        // Capture the seller ID from the registration response
        if (resultAction.payload && resultAction.payload.sellerrid) {
          setSellerId(resultAction.payload.sellerrid);
          localStorage.setItem("sellerId", resultAction.payload.sellerrid);
        }

        // RETURN the response data to PersonalInfo component FIRST
        const responseToReturn = resultAction.payload;

        // THEN call nextStep
        nextStep();

        return responseToReturn;
      } else if (registerSupplier.rejected.match(resultAction)) {
        if (resultAction.payload?.message === "Phone number already in use") {
          const error = resultAction.payload.message;
          setApiError(error);
          throw error;
        }
        throw new Error(resultAction.payload?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const handleEmailVerified = (emailData) => {
    setFormData((prev) => ({ ...prev, email: emailData.email }));
    nextStep();
  };

  const handleStoreInfo = async (storeInfo) => {
    console.log("Store info:", storeInfo);
    try {
      setApiError(null);

      // Use the sellerId from state or localStorage
      const currentSellerId = sellerId || localStorage.getItem("sellerId");
      console.log("SellerId in register :", currentSellerId);

      if (!currentSellerId) {
        setApiError("Seller registration incomplete. Please go back.");
        return;
      }

      // In handleStoreInfo function
      const resultAction = await dispatch(
        registerSupplierStoreInfo({
          sellerId: currentSellerId,
          storeData: {
            name: storeInfo.storeName,
            address: storeInfo.adresse,
          },
        })
      );

      if (registerSupplierStoreInfo.fulfilled.match(resultAction)) {
        // Store creation successful - show success modal
        setSuccessModalOpen(true);
        // Clean up localStorage
        localStorage.removeItem("sellerId");
      } else if (registerSupplierStoreInfo.rejected.match(resultAction)) {
        throw new Error(resultAction.payload || "Store creation failed");
      }
    } catch (error) {
      console.error("Store creation failed:", error);
      setApiError(error.message);
    }
  };

  const handleModalClose = () => {
    setSuccessModalOpen(false);
    navigate("/supplier/login");
  };

  switch (step) {
    case 1:
      return <BasicInfo onNext={handleBasicInfoSubmit} />;
    case 2:
      return (
        <EmailInput
          email={formData.email}
          onVerified={handleEmailVerified}
          onBack={prevStep}
        />
      );
    case 3:
      return (
        <VerificationEmailCode
          email={formData.email}
          onVerificationComplete={handleVerificationComplete}
          onBack={prevStep}
        />
      );
    case 4:
      return (
        <PersonalInfo
          onNext={handlePersonalInfoSubmit}
          onBack={prevStep}
          apiError={apiError}
          clearError={() => setApiError(null)}
        />
      );
    case 5:
      return (
        <>
          <StoreInfo
            onBack={prevStep}
            onSubmit={handleStoreInfo}
            apiError={apiError}
          />
          <RegistrationSuccessModal
            open={successModalOpen}
            onClose={handleModalClose}
          />
        </>
      );
    default:
      return <BasicInfo onNext={handleBasicInfoSubmit} />;
  }
};

export default SupplierRegister;
