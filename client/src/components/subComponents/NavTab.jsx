import React from 'react';

const NavTab = ({
  showTab,
  showCriteria,
  updateDisplay,
  setActiveTab,
  displayType,
  partyType,
  query,
  icon,
  color,
  display,
}) => (
  <li className={'nav-item interactive ' + showTab(showCriteria)}>
    <a
      className={
        `nav-link text-${color} border-${color} border-bottom-0 bg-white mr-1 ${setActiveTab(display, `${displayType}-${partyType}`)}`
      }
      onClick={() =>
        updateDisplay(displayType, partyType, query)
      }
    >
      <i className={icon} />
    </a>
  </li>
);

export default NavTab;
