export type UserInfoT = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: null | number;
  organization: {
    id: number;
    name: string;
    address: string;
  };
};

export type PlanT = {
  order: null | OrderT;
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

export type OrderT = {
  order_number: number;
  dietary: string;
  order_date: string;
  delivery_date: string;
  price: number;
  discounted_price: number;
  status: {
    id: number;
    name: string;
  };
};

// APIS
export type VerifyOtpApiResponse = {
  message: string;
  data: {
    user: UserInfoT;
    token: string;
  };
};

export type GetPlansApiResponse = {
  data: {
    plans: PlanT[];
    options: OptionT[];
  };
  message: string;
};

export type GetOrdersApiResponse = {
  data: {
    current_page: number;
    data: OrderT[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: null | string;
    path: string;
    per_page: number;
    prev_page_url: null | string;
    to: number;
    total: number;
  };
  message: string;
};

export type GetUserInfoApiResponse = {
  data: UserInfoT;
  message: string;
};

export type SubmitOrderApiResponse = {
  data: {
    // order: {
    //   user_id: number;
    //   organization_plan_option_id: number;
    //   organization_plan_id: number;
    //   discount_id: number;
    //   total_price: number;
    //   status: number;
    //   updated_at: string;
    //   created_at: string;
    //   id: number;
    //   authority: string;
    // };
    order: {
      order_number: number;
      dietary: string;
      order_date: string;
      delivery_date: string;
      price: number;
      discounted_price: number;
      status: {
        id: number;
        name: string;
      };
    };
    payment: {
      is_free: false;
      client_secret: string;
    };
  };
  message: string;
};
