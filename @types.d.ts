export interface GetStartedTabs {
  first: boolean;
  second: boolean;
  third: boolean;
}

export interface FirebaseLogin {
  email: string;
  password: string;
}

export interface LoginnValidate {
  email: boolean;
  password: boolean;
}

export interface Context {
  authState: AuthStaes;
  authLoading: boolean;
  authenticate: AuthFunc;
  LogoutMe: any;
}

export interface AuthStaes {
  user: boolean;
  userEmail: boolean;
}

interface AuthFunc {
  ({}: AuthStaes);
}

export interface Posts {
  id: string;
  greetings: string;
  message: string;
  regards: string;
  Acknowledgements: Array<Acknowledgements>;
  Sender: Sender;
  createdAt: string;
  lastItem?: boolean;
  type: "NOTIFICATION" | "HOLIDAY";
  user_id?: string;
}

export interface Acknowledgements {
  id: string;
  fullname: string;
  image: string;
}

export interface Sender {
  id: string;
  fullname: string;
  image: string;
  role: "HR" | "EMPLOYEE" | "OWNER";
}

export interface CurrentUserDatabase {
  id: string;
  fullname: string;
  image: string;
  email: string;
}

export interface ButtonSecondaryProps {
  title: string;
  Icon: any;
  onPress: any;
}

export interface TeamsProps {
  id: string;
  image: string;
}

export interface CreateMessagProps {
  greetings: string;
  message: string;
  type: "HOLIDAY" | "NOTIFICATION";
}

export interface FiltersProps {
  type: "HOLIDAY" | "NOTIFICATION";
}
