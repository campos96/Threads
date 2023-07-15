import Account from "./Account";

type Profile = {
  accountId: string;
  displayName?: string;
  biography?: string;
  link?: string;
  isPrivate: boolean;
  account?: Account;
};

export default Profile;
