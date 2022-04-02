export interface IWizardStep {
  id: number;
  text: string;
  iconPath: string;
}

export interface IManagerPasswordReset {
  old_password: string;
  new_password: string;
}
