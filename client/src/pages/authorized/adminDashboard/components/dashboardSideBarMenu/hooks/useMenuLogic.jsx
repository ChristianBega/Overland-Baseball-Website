import { useState, useEffect } from "react";
const useMenuLogic = (menuListItems, setCurrentItem, checkAuthorization, role) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    setCurrentItem(menuListItems[0]);
  }, [setCurrentItem, menuListItems]);

  const toggleMenu = () => setIsOpen((prevState) => !prevState);

  const handleMouseEnter = (index) => setHoveredIndex(index);

  const handleMouseLeave = () => setHoveredIndex(null);

  const handleSelectMenuItem = (item) => {
    if (!checkAuthorization(role)) return;
    setCurrentItem(item);
    setIsOpen(false);
  };

  return {
    isOpen,
    hoveredIndex,
    toggleMenu,
    handleMouseEnter,
    handleMouseLeave,
    handleSelectMenuItem,
    setIsOpen,
  };
};

export default useMenuLogic;
