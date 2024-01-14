import { useEffect } from 'react';
import { Picture } from './profile-picture.styles';

const ProfilePicture = ({ img, alt, ...otherProps }) => {
  return <Picture src={img} alt={alt} {...otherProps} />;
};

export default ProfilePicture;
