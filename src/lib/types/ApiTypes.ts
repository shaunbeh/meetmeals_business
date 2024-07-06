export type UserType = {
  id: number;
  username: string;
  fName: string;
  lName: string;
  userImage: string | null;
  privilege: string;
  email: string;
  mobile: string | null;
  user_code: number;
  post_code: number | null;
  verified: string;
  organization_id: number;
};

export type VerifyOtpApiResponse = {
  message: string;
  data: {
    user: UserType;
    token: string;
  };
};

export type PlanT = {
  id: number;
  title: string;
  organization_id: null;
  date: string;
  start_time: string;
  end_time: string;
  price: string;
  discounted_price: number;
  can_order: true;
};
export type OptionT = {
  id: number;
  title: string;
  description: string;
};
export type GetPlansApiResponse = {
  data: {
    plans: PlanT[];
    options: OptionT[];
  };
  message: string;
};
