export interface Customer {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone_number: string;
  avatar: string | null;
  is_activated: boolean;
  account_signup_type: "regular";
  checked_terms_conditions: boolean;
  created_at: string;
}
