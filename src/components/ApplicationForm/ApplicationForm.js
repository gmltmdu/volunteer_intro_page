// src/components/ApplicationForm/ApplicationForm.jsx

import React, { useState } from 'react';
import styles from './ApplicationForm.module.css';

const ApplicationForm = ({ onSuccess }) => {
    // 폼 데이터 상태
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        dob: '', // Date of Birth
    });
    
    // 요일 선택 상태 (Map 대신 객체를 사용)
    const [selectedDays, setSelectedDays] = useState({
        '일': false, '월': false, '화': false, '수': false, '목': false, '금': false, '토': false
    });

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    // 폼 입력 필드 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 요일 버튼 토글 핸들러
    const handleDayToggle = (day) => {
        // React의 State 업데이트는 비동기적으로 이루어지므로 함수형 업데이트를 사용합니다.
        setSelectedDays(prev => ({
            ...prev,
            [day]: !prev[day] // 현재 상태를 반전
        }));
    };

    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 선택된 요일만 추출
        const availableDays = daysOfWeek.filter(day => selectedDays[day]);

        const submissionData = {
            ...formData,
            availableDays,
        };
        
        const isConfirmed = window.confirm('봉사활동 신청이 완료되었습니다! 확인을 누르면 홈 화면으로 돌아갑니다.');

        // 2. 사용자가 '확인'을 눌렀다면
        if (isConfirmed) {
            // App.jsx에서 Prop으로 전달받은 홈 이동 함수를 실행합니다. (필수!)
            if (onSuccess) {
                onSuccess();
            }
        }
        
        // TODO: 실제 서버로 데이터를 전송하는 API 호출 로직을 여기에 추가합니다.
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                
                {/* 1. 이름 */}
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>이름</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={styles.inputField}
                        required
                    />
                </div>

                {/* 2. 전화번호 */}
                <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>전화번호</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={styles.inputField}
                        placeholder="예: 010-1234-5678"
                        required
                    />
                </div>

                {/* 3. 생일 */}
                <div className={styles.formGroup}>
                    <label htmlFor="dob" className={styles.label}>생일</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className={styles.inputField}
                        required
                    />
                </div>

                {/* 4. 요일 선택 버튼 */}
                <h3 className={styles.daySelectionTitle}>
                    가능한 요일을 모두 선택해 주세요
                </h3>
                <div className={styles.dayButtonsContainer}>
                    {daysOfWeek.map((day) => (
                        <button
                            key={day}
                            type="button" // 폼 제출을 막기 위해 type="button" 설정
                            className={`${styles.dayButton} ${selectedDays[day] ? styles.selected : ''}`}
                            onClick={() => handleDayToggle(day)}
                        >
                            {day}
                        </button>
                    ))}
                </div>

                {/* 5. 최종 신청 버튼 */}
                <button type="submit" className={styles.submitButton}>
                    신청하기
                </button>
            </form>
        </div>
    );
};

export default ApplicationForm;