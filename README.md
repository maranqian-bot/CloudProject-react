# HR Management System (근태 & 인사 관리 시스템)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React%20Router-6-CA4245?logo=reactrouter&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-000000)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-Server%20State-FF4154?logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

---

## 프로젝트 소개

실무 환경을 고려하여 설계한 **근태 및 인사 관리 시스템**

- React 기반 SPA
- 서버 상태 관리 (TanStack Query)
- 클라이언트 상태 관리 (Zustand)
- API 통신 분리 구조 (Axios)

---

## 시작 가이드

### Prerequisites
- Node.js v18.x 이상
- npm 9.x 이상

### Installation
```bash
# 1. 레포지토리 클론
$ git clone [https://github.com/your-repo/hr-management-frontend.git](https://github.com/your-repo/hr-management-frontend.git)

# 2. 프로젝트 폴더 진입
$ cd hr-management-frontend

# 3. 의존성 설치
$ npm install

# 4. 환경 변수 설정
# 루트 디렉토리에 .env 파일을 생성하고 아래 내용을 작성해주세요.
REACT_APP_API_BASE_URL=http://localhost:8080/api

# 5. 프로젝트 실행
$ npm run dev
```


---

## 더미데이터 테스트 (Json-Server)
db.json에 더미데이터를 넣어 테스트할 수 있습니다.

routes.json 파일은 아래와 같이 api를 작성합니다.

Json-Server를 실행합니다.

db.json:

    "summary": [
    {
      "id": 1,
      "workDays": 20,
      "lateCount": 2,
      "absentCount": 1,
      "attendanceScore": 94.8
    }
    ]

routes.json:

    {
      "/attendance/summary": "/summary",
      "/attendance/history": "/history"
    }

Json-Server 켜기:

    npm install -g json-server@0.17.4
    json-server --watch db.json --routes routes.json --port 3001


---

## 폴더 구조
```
src/
 ├── api/           # Axios 인스턴스 및 엔드포인트별 API 호출 함수
 ├── components/    # 재사용 가능한 공통 UI 컴포넌트
 ├── hooks/         # 커스텀 훅 (비즈니스 로직 및 상태 관리)
 ├── pages/         # React Router에 연결되는 화면별 페이지 컴포넌트
 ├── query/         # TanStack Query 관련 쿼리(Query) 및 뮤테이션(Mutation) 로직
 ├── styles/        # 전역 스타일링 및 테마 설정
 ├── store/         # Zustand 스토어 (클라이언트 상태 관리)
 └── utils/         # 공용 유틸리티 함수 및 포맷터
```

---

## UI

#### 로그인
<details open>
  <summary>화면 보기</summary>
  
  <p>
    <img width="80%" src="https://github.com/user-attachments/assets/95b15bba-b3ed-4851-a9f2-349a05c5b8ac" />
  </p>
</details>

#### 비밀번호 찾기
<details open>
  <summary>화면 보기</summary>
  <p>
    <img width="80%" src="https://github.com/user-attachments/assets/ddc4342d-b748-463e-80ac-9909fed8821c" />
  </p>
</details>

#### 내 정보 수정
<details open>
  <summary>화면 보기</summary>
  <p>
    <img width="80%" src="https://github.com/user-attachments/assets/67869c34-cf63-49f2-a012-a7e2ab8215b9" />
  </p>
</details>

#### 대시보드
<details open>
  <summary>화면 보기</summary>
  
  <p>
    <img width="80%" src="https://github.com/user-attachments/assets/95f247bf-ad5d-43c2-8660-15666f139a64" />
  </p>
</details>

#### 직원 관리
<details open>
  <summary>화면 보기</summary>
  <p>
    <img width="32%" alt="image" src="https://github.com/user-attachments/assets/817a1714-bee1-4af4-ba7e-1aecfa8eaecc" />
    <img width="32%" alt="image" src="https://github.com/user-attachments/assets/44cbef49-e01e-43c8-8317-eb80577eb264" />
    <img width="32%" alt="image" src="https://github.com/user-attachments/assets/e0251b1f-cddd-440a-aa9f-83e8575b94ff" />
  </p>
</details>

#### 부서 관리

<details open>
  <summary>화면 보기</summary>
  <p>
    <img width="32%" src="https://github.com/user-attachments/assets/72866c56-b7e8-4640-a36d-c4bc4f753bff" />
    <img width="32%" src="https://github.com/user-attachments/assets/577f29a3-e9bb-4343-92b3-9a35b046c237" />
    <img width="32%" src="https://github.com/user-attachments/assets/582199c5-8602-4176-abef-18d939d909bc" />
  </p>
</details>

#### 근태 관리
<details open>
  <summary>화면 보기</summary>
  <p>
    <img width="80%" src="https://github.com/user-attachments/assets/a71bdeab-4197-479e-871e-d5a432fbb671" />
  </p>
</details>

#### 휴가 관리

<details open>
  <summary>화면 보기</summary>
  <p>
    <img width="46%" src="https://github.com/user-attachments/assets/b911a7c9-8f7c-46c4-9630-3f118c81d703" />
    <img width="46%" src="https://github.com/user-attachments/assets/0f8da12d-b869-41b0-8b30-40d189c937c6" />
  </p>
</details>

#### IT 지원 문의
<details open>
  <summary>화면 보기</summary>
  <p>
    <img width="80%" src="https://github.com/user-attachments/assets/125d6285-7459-4987-8912-cc269f45eabc" />
  </p>
</details>
    
---

## 팀원 및 역할
| 이름 | 역할 | 기능 구현 |
|------|------|------|
| 마은재 ([maranqian-bot](https://github.com/maranqian-bot)) | 팀장 | 휴가관리 및 대시보드 기능 구현 |
| 김성원 ([gungang1212-tech](https://github.com/gungang1212-tech)) | 팀원 | 직원관리 기능 구현 |
| 이가연 ([ixxveon](https://github.com/ixxveon)) | 팀원 | 근태관리 및 로그인 기능 구현 |
| 신보라 ([sbr7518-bit](https://github.com/sbr7518-bit)) | 팀원 | 부서관리 기능 구현 |

