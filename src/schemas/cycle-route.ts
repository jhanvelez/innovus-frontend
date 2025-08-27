import * as Yup from "yup";
import { FIELD_REQUIRED_MESSAGE } from "@/utils/validations";

export const cycleInitialValues = {
  name: '',
};

export const cycleValidationSchema = Yup.object({
  name: Yup.string().required(FIELD_REQUIRED_MESSAGE),
});
