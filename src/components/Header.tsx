import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link className="header__link" to="/basePrice">
        GET BASE PRICE TABLE
      </Link>
      <Link className="header__link" to="/slotPrice">
        GET SLOT PRICE TABLE
      </Link>
    </div>
  );
};

export default Header;
