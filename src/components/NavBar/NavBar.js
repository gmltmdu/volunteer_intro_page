// src/components/NavBar/NavBar.jsx

import React from 'react';
import styles from './NavBar.module.css';

// onNavigate Prop을 받아 페이지 전환을 처리합니다.
const NavBar = ({ onNavigate }) => {
    
    // 페이지 이동 핸들러
    // 'home', 'log', 'checklist' 중 하나를 받아서 App.jsx로 전달
    const handleNavigation = (page) => (e) => {
        e.preventDefault();
        onNavigate(page);
    };

    return (
        <nav className={styles.navBar}>
            {/* 1. 로고 (클릭 시 홈으로 이동) */}
            <a 
                href="/" 
                className={styles.logo}
                onClick={handleNavigation('home')}
            >
                UNI-CARE
            </a>

            {/* 2. 네비게이션 링크 */}
            <div className={styles.navLinks}>
                <a 
                    href="#log" 
                    className={styles.navLink}
                    onClick={handleNavigation('log')}
                >
                    봉사일지
                </a>
                <a 
                    href="#checklist" 
                    className={styles.navLink}
                    onClick={handleNavigation('checklist')}
                >
                    체크리스트
                </a>
            </div>
        </nav>
    );
};

export default NavBar;