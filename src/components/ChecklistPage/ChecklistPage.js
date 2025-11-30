// src/components/ChecklistPage/ChecklistPage.jsx

import React, { useState } from 'react';
import styles from './ChecklistPage.module.css';

// 초기 체크리스트 상태 정의 (모든 항목은 false 또는 빈 값)
const INITIAL_CHECKLIST_STATE = {
    // A. 전화 체크리스트
    phone: {
        callSuccess: false, voiceTone: false, moodChange: false,
        mealRegular: '', // '규칙적', '불규칙', '거부' 중 하나
        painRecent: false, medTaken: false,
        outingChange: false, sleepChange: false, houseIssue: false,
        feelings: false, loneliness: false, lessTalk: false,
        riskCallFail: false, riskExtreme: false, riskNoEat: false, riskNoContact: false,
    },
    // B. 현장 방문 체크리스트
    visit: {
        intro: false, stateObserved: false, generalCheck: false,
        gasValve: false, overloadPlug: false, slipRisk: false, lightBright: false,
        cleanliness: false, foodExpiry: false,
        contactExternal: false, recentOuting: false, useAgency: false,
        activityDone: false, satisfaction: false, nextPlan: false,
        notes: '', // 특이사항 기록
        emergency: false, reportNeeded: false,
    }
};

const ChecklistPage = () => {
    const [checklist, setChecklist] = useState(INITIAL_CHECKLIST_STATE);
    const [currentView, setCurrentView] = useState('phone'); // 'phone' 또는 'visit'

    const handleCheckboxChange = (section, key) => {
        setChecklist(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: !prev[section][key]
            }
        }));
    };
    
    // 라디오 버튼(식사 규칙) 전용 핸들러
    const handleRadioChange = (value) => {
        setChecklist(prev => ({
            ...prev,
            phone: {
                ...prev.phone,
                mealRegular: value
            }
        }));
    };

    const handleTextareaChange = (e) => {
         setChecklist(prev => ({
            ...prev,
            visit: {
                ...prev.visit,
                notes: e.target.value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('최종 제출된 체크리스트 데이터:', checklist);
        
        // TODO: 여기서 데이터를 서버로 전송하고, 성공하면 상태 초기화 또는 페이지 이동
        alert('체크리스트가 성공적으로 제출되었습니다!');
        
        // 제출 후 폼 초기화
        setChecklist(INITIAL_CHECKLIST_STATE);
    };
    
    // 전화 체크리스트 렌더링 함수
    const renderPhoneChecklist = () => (
        <>
            {/* 📞 오늘의 안부 확인 */}
            <h3 className={styles.sectionHeader}>📞 오늘의 안부 확인</h3>
            <div className={styles.checkGroup}>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.phone.callSuccess} onChange={() => handleCheckboxChange('phone', 'callSuccess')} /> 전화 연결이 잘 되었나요?
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.phone.voiceTone} onChange={() => handleCheckboxChange('phone', 'voiceTone')} /> 어르신의 목소리 톤이 평소와 비슷한가요?
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.phone.moodChange} onChange={() => handleCheckboxChange('phone', 'moodChange')} /> 피곤·우울·짜증·무기력 등 변화가 느껴지는가요?
                </label>
            </div>
            
            {/* 🍚 식사 및 건강 상태 */}
            <h3 className={styles.sectionHeader}>🍚 식사 및 건강 상태</h3>
            <div className={styles.checkGroup}>
                <div className={styles.radioGroup}>
                    <p className={styles.radioTitle}>오늘(또는 최근) 식사를 제대로 하셨는가?</p>
                    <label>
                        <input type="radio" name="mealRegular" value="규칙적" checked={checklist.phone.mealRegular === '규칙적'} onChange={() => handleRadioChange('규칙적')} /> 규칙적
                    </label>
                    <label>
                        <input type="radio" name="mealRegular" value="불규칙" checked={checklist.phone.mealRegular === '불규칙'} onChange={() => handleRadioChange('불규칙')} /> 불규칙
                    </label>
                    <label>
                        <input type="radio" name="mealRegular" value="거부" checked={checklist.phone.mealRegular === '거부'} onChange={() => handleRadioChange('거부')} /> 식사 거부 경향
                    </label>
                </div>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.phone.painRecent} onChange={() => handleCheckboxChange('phone', 'painRecent')} /> 최근 아픔·통증·어지럼증 여부
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.phone.medTaken} onChange={() => handleCheckboxChange('phone', 'medTaken')} /> 약을 제때 드셨는지 확인
                </label>
            </div>

            {/* 🏠 생활 패턴 변화 */}
            <h3 className={styles.sectionHeader}>🏠 생활 패턴 변화</h3>
            <div className={styles.checkGroup}>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.phone.outingChange} onChange={() => handleCheckboxChange('phone', 'outingChange')} /> 외출 횟수 변화
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.phone.sleepChange} onChange={() => handleCheckboxChange('phone', 'sleepChange')} /> 잠을 너무 많이 잤거나 적게 잔 듯한 느낌
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.phone.houseIssue} onChange={() => handleCheckboxChange('phone', 'houseIssue')} /> 집안에 불편한 점(가스, 전기, 냉난방 등)
                </label>
            </div>
            
            {/* ❤️ 정서/감정 상태 */}
            <h3 className={styles.sectionHeader}>❤️ 정서/감정 상태</h3>
            <div className={styles.checkGroup}>
                 <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.phone.feelings} onChange={() => handleCheckboxChange('phone', 'feelings')} /> 최근 기분은 어떤지?
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.phone.loneliness} onChange={() => handleCheckboxChange('phone', 'loneliness')} /> 외롭다/힘들다/불안하다 등의 표현 여부
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.phone.lessTalk} onChange={() => handleCheckboxChange('phone', 'lessTalk')} /> 말수가 평소보다 줄었는지
                </label>
            </div>
            
            {/* 🚨 위험 신호 체크 */}
            <h3 className={`${styles.sectionHeader} ${styles.warning}`}>🚨 위험 신호 체크 (있으면 즉시 복지관 보고)</h3>
            <div className={styles.checkGroup}>
                <label className={`${styles.checkItem} ${styles.warning}`}>
                    <input type="checkbox" checked={checklist.phone.riskCallFail} onChange={() => handleCheckboxChange('phone', 'riskCallFail')} /> 전화 연결 지속 실패
                </label>
                <label className={`${styles.checkItem} ${styles.warning}`}>
                    <input type="checkbox" checked={checklist.phone.riskExtreme} onChange={() => handleCheckboxChange('phone', 'riskExtreme')} /> 극단적 발언 or 생활 의욕 저하
                </label>
                <label className={`${styles.checkItem} ${styles.warning}`}>
                    <input type="checkbox" checked={checklist.phone.riskNoEat} onChange={() => handleCheckboxChange('phone', 'riskNoEat')} /> 며칠간 식사하지 않았다고 말함
                </label>
                <label className={`${styles.checkItem} ${styles.warning}`}>
                    <input type="checkbox" checked={checklist.phone.riskNoContact} onChange={() => handleCheckboxChange('phone', 'riskNoContact')} /> 외부 사람과 연락 전혀 없음
                </label>
            </div>
        </>
    );

    // 현장 방문 체크리스트 렌더링 함수
    const renderVisitChecklist = () => (
        <>
            {/* 🧑‍🤝‍🧑 방문 기본 */}
            <h3 className={styles.sectionHeader}>🧑‍🤝‍🧑 방문 기본</h3>
            <div className={styles.checkGroup}>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.visit.intro} onChange={() => handleCheckboxChange('visit', 'intro')} /> 인사 및 활동 목적 안내
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.visit.stateObserved} onChange={() => handleCheckboxChange('visit', 'stateObserved')} /> 신체·정서 상태 변화 관찰
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.visit.generalCheck} onChange={() => handleCheckboxChange('visit', 'generalCheck')} /> 약·의료·식사·생활환경 전반 확인
                </label>
            </div>

            {/* 🏠 주거 안전 점검 */}
            <h3 className={styles.sectionHeader}>🏠 주거 안전 점검</h3>
            <div className={styles.checkGroup}>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.visit.gasValve} onChange={() => handleCheckboxChange('visit', 'gasValve')} /> 가스밸브 잠김 여부
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.visit.overloadPlug} onChange={() => handleCheckboxChange('visit', 'overloadPlug')} /> 전기 플러그 과다 사용 여부
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.visit.slipRisk} onChange={() => handleCheckboxChange('visit', 'slipRisk')} /> 욕실·현관 미끄럼 위험
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.visit.lightBright} onChange={() => handleCheckboxChange('visit', 'lightBright')} /> 조명 밝기
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.visit.cleanliness} onChange={() => handleCheckboxChange('visit', 'cleanliness')} /> 집 안 냄새나 청결 상태 변화
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.visit.foodExpiry} onChange={() => handleCheckboxChange('visit', 'foodExpiry')} /> 음식물·냉장고 유통기한 점검
                </label>
            </div>
            
            {/* 🚪 외부와의 사회적 관계 */}
            <h3 className={styles.sectionHeader}>🚪 외부와의 사회적 관계</h3>
            <div className={styles.checkGroup}>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.visit.contactExternal} onChange={() => handleCheckboxChange('visit', 'contactExternal')} /> 이웃·가족과 연락 여부
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.visit.recentOuting} onChange={() => handleCheckboxChange('visit', 'recentOuting')} /> 최근 외출 여부
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.visit.useAgency} onChange={() => handleCheckboxChange('visit', 'useAgency')} /> 복지 기관·의료기관 이용 여부
                </label>
            </div>

            {/* 🤝 활동 진행 */}
            <h3 className={styles.sectionHeader}>🤝 활동 진행</h3>
            <div className={styles.checkGroup}>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.visit.activityDone} onChange={() => handleCheckboxChange('visit', 'activityDone')} /> 이번 주 약속한 활동 수행
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.visit.satisfaction} onChange={() => handleCheckboxChange('visit', 'satisfaction')} /> 어르신 만족도 확인
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.visit.nextPlan} onChange={() => handleCheckboxChange('visit', 'nextPlan')} /> 다음 주 활동 계획 함께 설정
                </label>
            </div>

            {/* 📝 사후 기록 */}
            <h3 className={styles.sectionHeader}>📝 사후 기록</h3>
            <div className={styles.checkGroup}>
                <label className={styles.checkItem}>
                    특이사항 기록
                    <textarea value={checklist.visit.notes} onChange={handleTextareaChange} className={styles.textArea}></textarea>
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.visit.emergency} onChange={() => handleCheckboxChange('visit', 'emergency')} /> 긴급 상황 여부 체크
                </label>
                <label className={styles.checkItem}>
                    <input type="checkbox" checked={checklist.visit.reportNeeded} onChange={() => handleCheckboxChange('visit', 'reportNeeded')} /> 복지관에 보고 필요한 사항 표시
                </label>
            </div>
        </>
    );

    return (
        <form className={styles.checklistContainer} onSubmit={handleSubmit}>
            <h1 className={styles.pageTitle}>봉사활동 체크리스트</h1>
            
            {/* 뷰 전환 탭 */}
            <div className={styles.viewTabs}>
                <button type="button" onClick={() => setCurrentView('phone')} className={currentView === 'phone' ? styles.activeTab : ''}>
                    📞 전화 체크리스트 (주 2회)
                </button>
                <button type="button" onClick={() => setCurrentView('visit')} className={currentView === 'visit' ? styles.activeTab : ''}>
                    🏠 현장 방문 체크리스트 (주 1회)
                </button>
            </div>

            {/* 현재 뷰 렌더링 */}
            <div className={styles.contentArea}>
                {currentView === 'phone' ? renderPhoneChecklist() : renderVisitChecklist()}
            </div>

            {/* 최종 제출 버튼 */}
            <button type="submit" className={styles.submitButton}>
                체크리스트 제출 및 기록
            </button>
        </form>
    );
};

export default ChecklistPage;