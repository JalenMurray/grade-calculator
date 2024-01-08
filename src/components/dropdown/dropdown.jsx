import { Content, Menu } from './dropdown.styles';
import { MoreVertRounded } from '@mui/icons-material';
import { useRef, useState, useEffect } from 'react';

const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropDownOnOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeDropDownOnOutsideClick);

    return () => {
      document.removeEventListener('click', closeDropDownOnOutsideClick);
    };
  }, []);

  return (
    <Menu ref={dropdownRef}>
      <MoreVertRounded onClick={toggleDropdown} />
      {isOpen && <Content>{children}</Content>}
    </Menu>
  );
};

export default Dropdown;
