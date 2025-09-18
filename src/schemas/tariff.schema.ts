import * as Yup from "yup";
import { FIELD_REQUIRED_MESSAGE } from "@/utils/validations";

export const tariffInitialValues = {
  stratumId: '',
  fixedCharge: '',
  subsidyPercent: '',
  contributionPercent: '',
  basic: '',
  complementary: '',
  sanctuary: '',
};

export const tariffValidationSchema = Yup.object({
  stratumId: Yup.string().required(FIELD_REQUIRED_MESSAGE),
  fixedCharge: Yup.number().min(0).required(FIELD_REQUIRED_MESSAGE),
  subsidyPercent: Yup.number().min(0).max(100).required(FIELD_REQUIRED_MESSAGE),
  contributionPercent: Yup.number().min(0).max(100).required(FIELD_REQUIRED_MESSAGE),
  basic: Yup.number().min(0).required(FIELD_REQUIRED_MESSAGE),
  complementary: Yup.number().min(0).required(FIELD_REQUIRED_MESSAGE),
  sanctuary: Yup.number().min(0).required(FIELD_REQUIRED_MESSAGE),
});
