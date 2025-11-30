// src/components/HeroSection/HeroSection.jsx

import React from 'react';
// CSS Module 파일 불러오기
import styles from './HeroSection.module.css'; 

const HeroSection = ({ onApplyClick }) => {
    // 신청하기 버튼 클릭 핸들러 (실제 라우팅 로직 추가 필요)
    const handleApplyClick = (e) => {
        e.preventDefault();
        // TODO: 여기서 실제 신청 페이지로 이동하는 리액트 라우터 로직을 추가하세요.
        if (onApplyClick) {
            onApplyClick();
        }
    };

    return (
        <div className={styles.heroSection}>
            {/* 1. 타이틀 (UNI-CARE) */}
            <h1 className={styles.mainTitle}>UNI-CARE</h1>
            
            {/* 2. 신청하기 버튼 */}
            {/* 리액트 라우터를 사용한다면 <Link to="/apply" ...> 태그를 사용하세요. */}
            <a 
                href="#application" 
                className={styles.ctaButton}
                onClick={handleApplyClick}
            >
                신청하기
            </a>
        </div>
    );
};

export default HeroSection;