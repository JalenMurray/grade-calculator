import { ProfilePicture } from './user-logo.styles';

const UserLogo = ({ imgUrl, altTxt }) => {
  return <ProfilePicture src={imgUrl} alt={altTxt} />;
};

export default UserLogo;
