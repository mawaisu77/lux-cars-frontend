import baseService from "../services/baseService";

const useLoanApplication = () => {
  const addLoanApplication = async (applicationPayload) => {
    try {
      const loanApplication = await baseService.post(
        `add_loanapplication`,
        applicationPayload
      );
      return loanApplication;
    } catch (err) {
      console.log("ERROR ADDING APPLICATION", err);
    }
  };

  return { addLoanApplication };
};

export default useLoanApplication;
