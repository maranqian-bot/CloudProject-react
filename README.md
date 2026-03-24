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
