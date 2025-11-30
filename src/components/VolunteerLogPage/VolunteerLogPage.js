// src/components/VolunteerLogPage/VolunteerLogPage.jsx

import React, { useState } from 'react';
import styles from './VolunteerLogPage.module.css';

// 주차별 상세 일정 데이터 정의
const WEEK_SCHEDULES = [
    {
        week: "0주차 – 사전 준비",
        activities: [
            "📌 오리엔테이션 & 사전교육",
            "고독사 위험징후 이해, 의사소통 기법, 방문 시 유의사항 교육",
            "어르신 상황 정보 공유(건강 상태·생활 환경·주의점 등)",
            "2:1 팀 편성 및 역할 분담(기록 담당, 대화 리드 담당 등)"
        ]
    },
    {
        week: "1주차 – 첫 연락 & 라포형성",
        activities: [
            "📞 주 2회 전화: 첫 인사, 기본 안부 확인, 생활 패턴 파악(기상시간·식사·병원 방문 여부·외출 빈도)",
            "🏠 현장 방문(첫 만남): 자기소개 + 활동 목적 안내, 집 주변·환경 가볍게 점검(불편 사항 파악), 어르신이 좋아하는 것 조사(취미, 음식, TV 프로그램 등)"
        ]
    },
    {
        week: "2주차 – 일상 점검 & 정서적 안정 제공",
        activities: [
            "📞 전화: 어르신의 일상 루틴 체크, 식사 및 수면 패턴 변화 확인, 필요한 생활용품 또는 지원 요청 듣기",
            "🏠 방문: “어르신 관심사 기반 대화(옛날 이야기·취미·가족)”, 안전 점검(가스밸브, 전기 플러그 등)"
        ]
    },
    {
        week: "3주차 – 사회적 고립 예방 활동 시작",
        activities: [
            "📞 전화: 이번 주 계획 세우기(산책 가능 여부, 병원 동행 필요 여부)",
            "🏠 방문: 가벼운 동네 산책 또는 주변 편의시설 이용(편의점·마트), 외출 부담을 줄여주는 동행 활동 진행"
        ]
    },
    {
        week: "4주차 – 감정·심리 모니터링",
        activities: [
            "📞 전화: 기분 체크(우울감, 외로움, 스트레스 지수 간단히 물어보기)",
            "🏠 방문: 감정 나누기 활동(“이번 주 가장 좋았던 일/힘들었던 일 이야기하기”), 스트레스 해소 게임(색칠하기, 간단 보드게임 등)"
        ]
    },
    {
        week: "5주차 – 간단한 생활 지원",
        activities: [
            "📞 전화: 불편한 부분 파악(약 수납, 쓰레기 정리 등)",
            "🏠 방문: 정리정돈 도움(식품 유통기한 확인, 냉장고 정리), 병원 처방전 확인(약 복용 여부 점검)"
        ]
    },
    {
        week: "6주차 – 분기 전체 만남(포스터 내용)",
        activities: [
            "📍 프로그램 예시: 손마사지·종이접기·컬러링 등 소규모 활동",
            "계절별 행사(가을 간식 만들기, 미니 바자회 등)",
            "단체 사진 촬영·간단한 기념품 전달"
        ]
    },
    {
        week: "7주차 – 건강관리 중심 활동",
        activities: [
            "📞 전화: 평소 건강관리 여부 확인(복약, 운동, 식사)",
            "🏠 방문: 가벼운 스트레칭 교육, 좋아하는 건강 간식 함께 만들기(고구마·과일 정리 등)"
        ]
    },
    {
        week: "8주차 – 안전·주거점검 강화",
        activities: [
            "📞 전화: 최근 위험 상황 있었는지 물어보기(넘어짐·어지럼증 등)",
            "🏠 방문: 안전 체크리스트 점검 (미끄럼 방지 매트, 조명 상태, 가스·전기 위험 등), 필요 시 복지관에 조치 요청"
        ]
    },
    {
        week: "9주차 – 사회적 연결 강화",
        activities: [
            "📞 전화: 이웃이나 친구와 연락 여부 확인",
            "🏠 방문: 이웃 연결 프로그램 (같은 동네 어르신 소개, 단지 내 작은 산책 모임 만들기)"
        ]
    },
    {
        week: "10주차 – 기억 회상 프로그램(회상요법)",
        activities: [
            "📞 전화: 어르신이 기억하는 추억 이야기 예고",
            "🏠 방문: 추억 앨범 만들기 (젊은 시절 이야기 듣고 기록), 음악 들으며 옛날 감정 공유"
        ]
    },
    {
        week: "11주차 – 마무리 준비 & 정서 지원",
        activities: [
            "📞 전화: 활동 종료 전 전달하고 싶은 메시지 듣기",
            "🏠 방문: “고마운 점 서로 나누기”, 어르신이 지속적으로 이용할 수 있는 지역 복지 서비스 안내, 관계 유지가 가능한 안전 연락망 소개(복지관·이웃센터)"
        ]
    },
    {
        week: "12주차 – 최종 방문 + 평가",
        activities: [
            "📞 전화: 마지막 전화 (정서적 안정 확인, 건강 상태 변화 체크)",
            "🏠 최종 방문: 활동 총 정리 및 만족도 인터뷰, 작은 선물(편지·메시지 카드) 전달, 추후 도움이 필요할 때 복지관 연락하는 방법 재안내"
        ]
    },
];

const VolunteerLogPage = () => {
    // 현재 펼쳐진 항목의 인덱스 관리 (하나만 펼치기 위해)
    const [openIndex, setOpenIndex] = useState(null);

    const toggleWeek = (index) => {
        // 이미 열려있으면 닫고, 아니면 해당 인덱스를 엽니다.
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={styles.logContainer}>
            <h1 className={styles.pageTitle}>봉사일지 (주차별 활동 소개)</h1>
            <p className={styles.subText}>
                UNI-CARE 봉사활동의 12주 간의 체계적인 프로그램 계획입니다.
            </p>
            
            <div className={styles.accordion}>
                {WEEK_SCHEDULES.map((schedule, index) => (
                    <div key={index} className={styles.accordionItem}>
                        {/* 💥 아코디언 헤더 (클릭 영역) */}
                        <div 
                            className={`${styles.accordionHeader} ${openIndex === index ? styles.open : ''}`}
                            onClick={() => toggleWeek(index)}
                        >
                            <span className={styles.weekTitle}>{schedule.week}</span>
                            {/* 화살표 아이콘 */}
                            <span className={styles.arrow}>{openIndex === index ? '▲' : '▼'}</span>
                        </div>

                        {/* 💥 아코디언 내용 (펼쳐지는 영역) */}
                        {openIndex === index && (
                            <div className={styles.accordionContent}>
                                <ul>
                                    {schedule.activities.map((activity, i) => (
                                        <li key={i}>{activity}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VolunteerLogPage;