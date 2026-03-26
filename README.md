# HR Management System (근태 & 인사 관리 시스템)


![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React%20Router-6-CA4245?logo=reactrouter&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-000000)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-Server%20State-FF4154?logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4)

---

## 프로젝트 소개

실무 환경을 고려하여 설계한 **근태 및 인사 관리 시스템**

- React 기반 SPA
- 서버 상태 관리 (TanStack Query)
- 클라이언트 상태 관리 (Zustand)
- API 통신 분리 구조 (Axios)

---

## 주요 기능

- 로그인 / 인증
- 직원 관리
- 부서 관리
- 근태 관리
- 휴가 관리

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

## 기술 스택

### Front
- React 18
- react-router
- zustand
- Tanstack Query
- Axios

---

## 로컬 실행 방법

본 프로젝트는 데이터베이스 정보를 코드에 직접 작성하지 않고 환경 변수(Environment Variables)로 설정하여 사용합니다.

프로젝트 실행 전에 아래 환경 변수를 반드시 설정해주세요.

#### 필수 환경 변수

- DB_URL
- DB_USERNAME
- DB_PASSWORD

#### 예시

DB_URL=jdbc:mysql://localhost:3306/cloud_project  
DB_USERNAME=root  
DB_PASSWORD=your_password  

#### 주의사항

환경 변수를 설정하지 않으면 프로젝트 실행 시 오류가 발생합니다.

---

# 1. 더미데이터 테스트 (Json-Server)
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

## 팀원 및 역할
| 이름 | 역할 | 기능 구현 |
|------|------|------|
| 마은재 ([maranqian-bot](https://github.com/maranqian-bot)) | 팀장 | CICD 파이프라인 구축, 대시보드 기능 구현(예시) |
| 김성원 ([gungang1212-tech](https://github.com/gungang1212-tech)) | 팀원 | 채울 예정 |
| 이가연 ([ixxveon](https://github.com/ixxveon)) | 팀원 | S3 + CloudFront 구축, 근태 관리 및 로그인 기능 구현 |
| 신보라 ([sbr7518-bit](https://github.com/sbr7518-bit)) | 팀원 | 채울 예정 |

