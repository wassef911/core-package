export class User {
  id: number;
  first_name: string;
  last_name: string;
  cin_number: string;
  profile_picture: string;
  function: string;
  birth_date: Date;
  email: string;
  phone_number: number;
  address: string;
  facebook_account: string;
  municipalities: number[];
}

export class LoginCredentials {
  phone: number;
  password: string
}

export class LoginResponse {
  public access: string;
  public refresh: string;
  public first_login: boolean;
  public preferred_municipality_id: number;
  public is_active: boolean;
}
export class LoginResponseManager {
  public access: string;
  public refresh: string;
  public municipality_id: number;
}


export class ResetPassword {
  type: string;
  phone_number: string;
}
