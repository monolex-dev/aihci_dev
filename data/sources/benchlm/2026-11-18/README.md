# BenchLM 스냅샷

가져온 날: 2026-11-18

화면 `https://benchlm.ai/?sort=cat_agentic`의 모델과 점수는 이 두 파일이다. SHA-256은 같은 시각의 `manifest.json`과 일치한다.

| 파일 | 내용 |
| --- | --- |
| `leaderboard.json` | 공개 순위. 전체 212모델. 분야별 점수는 `categories` |
| `models.json` | 모델 1023개. 모델마다 `benchmarks` 아래 벤치마크 원점수 |
| `manifest.json` | 파일 크기, SHA-256, 라이선스 |

분야 행 수: agentic 138, coding 159, reasoning 157, multimodalGrounded 66, knowledge 177, multilingual 16, instructionFollowing 157, math 13.

공개 순위의 점수는 `leaderboard.json`의 `items[].score`와 `categories.<분야>`다. `models.json`의 `scores.displayScore`, `scores.overallScore`는 그 순위를 다시 만드는 값이 아니다.

라이선스는 CC BY-NC 4.0이다. 표시는 "Data from BenchLM.ai"와 https://benchlm.ai/data 다. 상업적 재배포와 공개 제품에 싣는 일은 라이선스가 필요하다. 이 JSON은 `.gitignore`에 있어 공개 원격에 올라가지 않는다.

이 점수는 Arena 행이 아니다. `data/performance/`에 넣지 않는다.
