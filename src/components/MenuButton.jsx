import { useState } from 'react';

const MenuButton = () => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <button 
            className={`hamburger-btn ${isActive ? 'active' : ''}`}
            onClick={handleClick}
            aria-label="Menu"
        >
            <div className="line-container">
                <span className="line"></span>
            </div>
            <div className="line-container">
                <span className="line-segment"></span>
                <span className="line-segment"></span>
            </div>
            <div className="line-container">
                <span className="line-segment"></span>
                <span className="line-segment"></span>
            </div>
        </button>
    );
};

export default MenuButton;
