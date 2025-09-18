import * as Yup from "yup";
import { FIELD_REQUIRED_MESSAGE } from "@/utils/validations";

export const subsidyContributionInitialValues = {
  stratumId: '',
  type: '',
  value: '',
};

export const subsidyContributionValidationSchema = Yup.object({
  stratumId: Yup.string().required(FIELD_REQUIRED_MESSAGE),
  type: Yup.string().required(FIELD_REQUIRED_MESSAGE),
  value: Yup.number().min(0).required(FIELD_REQUIRED_MESSAGE),
});
