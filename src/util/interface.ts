export interface FormValueType {
  email: string;
  password: string;
}

export interface FormValidType {
  emailValid: boolean;
  passwordValid: boolean;
}

export interface FormErrMessageType {
  emailErrMessage: string;
  passwordErrMessage: string;
}

export interface AuthFormTypeProps {
  formValue: FormValueType;
  setFormValue: React.Dispatch<React.SetStateAction<FormValueType>>;
  formValid: FormValidType;
  setFormValid: React.Dispatch<React.SetStateAction<FormValidType>>;
  formErrMessage: FormErrMessageType;
  setFormErrMessage: React.Dispatch<React.SetStateAction<FormErrMessageType>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  submitBtnName: string;
  dataTestId: string;
}

export interface TodoType {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export interface TodoTypeProps {
  list: TodoType;
  getTodoData: () => Promise<void>;
}
