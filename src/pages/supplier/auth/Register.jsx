import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicInfo from "../../../components/supplier/BasicInfo";
import PersonalInfo from "../../../components/supplier/PersonalInfo";
import StoreInfo from "../../../components/supplier/StoreInfo";
import RegistrationSuccessModal from "../../../components/supplier/RegistrationSuccessModal";
import EmailInput from "../../../components/supplier/EmailInput";
import VerificationEmailCode from "../../../components/supplier/VerificationEmailCode";
import { registerSupplier } from "../../../features/supplier/supplierSlice";
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
  const [successModalOpen, setSuccessModalOpen] = useState(false);
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

  // const handleEmailSubmit = (email) => {
  //   setFormData({ ...formData, email });
  //   nextStep();
  // };

  const handlePersonalInfoSubmit = async (data) => {
    try {
      const resultAction = await dispatch(
        registerSupplier({
          phoneNumber: data.phoneNumber,
          password: data.password,
        })
      );

      if (registerSupplier.fulfilled.match(resultAction)) {
        // setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
    // nextStep();
  };

  // const handleStoreInfoSubmit = async () => {};

  const handleEmailVerified = (emailData) => {
    setFormData((prev) => ({ ...prev, email: emailData.email }));
    nextStep();
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
        <>
          <PersonalInfo onNext={handlePersonalInfoSubmit} onBack={prevStep} />
          <RegistrationSuccessModal
            open={successModalOpen}
            onClose={handleModalClose}
          />
        </>
      );
    case 5:
      return (
        <>
          <StoreInfo onBack={prevStep} />
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
