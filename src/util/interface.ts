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
  submitBtnName: string;
  dataTestId: string;
  authReq: (formValue: FormValueType) => Promise<void>;
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
