# 데이터

타임라인에 올 기록은 두 종류다. 성능 한 행, X 계정 하나. 지금은 각 종류를 하나씩만 둔다.

## 성능

경로: `data/performance/<slug>.json`

한 파일은 Arena 데이터셋의 한 행이다. 점수는 `lmarena-ai/leaderboard-dataset`에서 오고, 라이선스는 CC BY 4.0이다. 파일 안에 데이터셋 주소, 보드(`config`), split, category, 스냅샷 날짜, 가져온 날을 같이 둔다.

비교는 `compare_key`가 같은 행끼리만 한다. `text` 보드와 `text_style_control` 보드는 다른 숫자다. 텍스트 점수와 에이전트 IPS도 다른 값이다. 신뢰구간이 겹치면 그 스냅샷은 둘을 가르지 못한다.

Arena 이름과 출시 이름의 연결은 이 파일 밖에서 사람이 한다. `Gemini 4 Carbon`과 `Gemini 4 Carbon (High)`는 다른 이름이다.

빈 칸은 비워 둔다. 없는 순위를 계산해서 넣지 않는다.

## X 계정

경로: `data/x/accounts/<handle>.json`

한 파일은 계정 하나다. 프로필에서 읽은 표시 이름, 소개, 가입 문구, 팔로잉, 팔로워, 게시물 수 문구를 둔다. `4.4M`처럼 화면이 줄여 보여 준 값은 문구 그대로 두고, 정확한 정수로 바꾸지 않는다.

글은 그 계정의 타임라인에 그 순간 화면에 있던 것만 담는다. 계정 전체 글 목록이 아니다. `posts_complete`가 false이면 그래서다.

글에서 공개 파일에 두는 값은 id, URL, 작성자, 시각, 역할, 화면에 보인 반응 수, 인용한 글의 id다. 역할은 사람이 출시 창에 연결하기 전에는 `unassigned`다. `time_label`은 페이지에 보인 날짜이고 브라우저 시간대는 Asia/Seoul이다. `posted_at`은 글 id에서 읽은 UTC 시각이다. 페이지에 `time` 요소가 없으면 `posted_at_source`는 `status_id_snowflake`다.

글 전문은 `data/x/private/<handle>.json`에만 둔다. 이 경로는 깃에서 빠진다. 로그아웃 화면에 Show more가 있으면 `text_truncated`가 true이고, 그 전문은 글 전체가 아니다.

워치리스트의 다른 계정은 이 표본에 없다.

## 출처 스냅샷

경로: `data/sources/`

타임라인 성능 행이 아니다. Arena `compare_key`와 섞지 않고, `data/performance/`로 복사하지 않는다.

| 경로 | 내용 |
| --- | --- |
| `sources/benchlm/2026-11-18/` | BenchLM 공개 순위와 모델별 벤치마크 점수. 2026-11-18 파일. CC BY-NC 4.0. JSON은 깃에서 빠진다 |
| `sources/open-llm-leaderboard/2025-03-20/` | Open LLM Leaderboard `contents` 4576행. 데이터셋 수정일 2025-03-20. 원본 스냅샷은 로컬에 둔다 |

## 로컬 산점도

위 스냅샷 경로에 BenchLM의 `manifest.json`, `models.json`, `leaderboard.json`과 Open LLM Leaderboard의 `contents.jsonl`을 준비한다. 저장소 루트에서 아래 명령을 실행하고 [산점도](../site/index.html)를 브라우저로 연다.

```sh
node scripts/build-timeline-data.mjs
```

차트가 읽는 `site/timeline-data.local.js`는 원본과 함께 로컬에 둔다.

## 출시

경로: `data/releases/six-families.jsonl`

한 줄은 여섯 가족 출시 칸 후보다. 타임라인 날짜는 `released_on`이다. 랩 공식 글에 그 날이 있을 때만 채운다. `benchlm_release_date`는 BenchLM의 찾을 위치이고, 그 자체로 타임라인 날짜가 아니다.

발표와 일반 공개가 다른 날이면 줄이 둘이다. 설정 이름만 다른 행은 `status`가 `variant`이고 날짜는 비어 있다. 평가 하네스, 증류, 다른 제작자의 가중치는 `excluded`다.

Open LLM Leaderboard의 업로드일과 제출일은 이 파일에 넣지 않는다. 점수와도 섞지 않는다. 설명은 `data/releases/README.md`에 있다.
