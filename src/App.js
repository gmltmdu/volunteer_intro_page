import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from 'react';
import HeroSection from './components/HeroSection/HeroSection';
import ApplicationForm from './components/ApplicationForm/ApplicationForm';
import NavBar from './components/NavBar/NavBar';
import VolunteerLogPage from './components/VolunteerLogPage/VolunteerLogPage';
import ChecklistPage from './components/ChecklistPage/ChecklistPage';

function App() {
// page: 'home', 'form', 'log', 'checklist' 중 하나의 상태를 가집니다.
    const [page, setPage] = useState('home'); 

    // --- 페이지 이동 및 상태 관리 함수 ---

    // 1. 네비게이션 바에서 호출되어 페이지를 변경하는 함수
    const handleNavigate = (targetPage) => {
        setPage(targetPage);
        window.scrollTo(0, 0); 
    };

    // 2. HeroSection에서 '신청하기' 클릭 시 폼 페이지로 이동
    const handleApplyClick = () => {
        setPage('form');
        window.scrollTo(0, 0); 
    };

    // 3. 폼 제출 완료 후 홈 화면으로 돌아가는 함수
    const handleFormSubmitSuccess = () => {
        const isConfirmed = window.confirm('봉사활동 신청이 완료되었습니다! 확인을 누르면 홈 화면으로 돌아갑니다.');

        if (isConfirmed) {
            setPage('home'); // 홈 화면 상태로 변경
            window.scrollTo(0, 0); 
        }
    };
    
    // --- 현재 페이지 상태에 따른 콘텐츠 렌더링 ---
    
    const renderContent = () => {
        switch (page) {
            case 'home':
                return <HeroSection onApplyClick={handleApplyClick} />;
            case 'form':
                return <ApplicationForm onSuccess={handleFormSubmitSuccess} />;
            case 'log':
                return <VolunteerLogPage />; // 주차별 소개 페이지
            case 'checklist':
                return <ChecklistPage />; // 체크리스트 페이지
            default:
                return <HeroSection onApplyClick={handleApplyClick} />;
        }
    };

  return (
    <div className="App">
      <NavBar onNavigate={handleNavigate} />
      <main>
        {renderContent()}
        {/* Home 외의 페이지에서는 HeroSection 아래에 들어갈 다른 콘텐츠도 여기에 추가될 수 있습니다. */}
      </main>
    </div>
  );
}

export default App;
