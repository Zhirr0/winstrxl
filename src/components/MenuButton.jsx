import { useState } from 'react';

const MenuButton = () => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        const newState = !isActive;
        setIsActive(newState);

        // Dispatch custom event for MenuSection to listen to
        window.dispatchEvent(new CustomEvent('menuToggle', {
            detail: { isActive: newState }
        }));
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