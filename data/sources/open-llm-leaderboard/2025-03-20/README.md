# Open LLM Leaderboard 스냅샷

화면 `https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard`가 읽는 데이터셋은 `open-llm-leaderboard/contents`다. 스페이스 코드의 `GET /api/leaderboard`가 이 데이터셋의 train split을 읽는다.

| 항목 | 값 |
| --- | --- |
| 리비전 | `9c09a7cae43334062a82cb164f2ef255013dafa2` |
| 데이터셋 수정 | 2025-03-20 |
| 가져온 날 | 2026-11-18 |
| 행 | 4576. 평균 점수가 있는 행 4576. Flagged 1 |

| 파일 | 내용 |
| --- | --- |
| `contents.parquet` | 데이터셋 원본. 1,109,997바이트 |
| `contents.jsonl` | 같은 4576행. Hugging Face datasets-server에서 100행씩 읽어 만들었다 |

점수 열은 `Average ⬆️`, `IFEval`, `BBH`, `MATH Lvl 5`, `GPQA`, `MUSR`, `MMLU-PRO`다. 각 벤치마크의 Raw 열은 정규화 전 값이다. 모델 이름은 `fullname`이다.

데이터셋 카드에 라이선스 항목이 없다. 스페이스 README의 라이선스는 Apache-2.0이다. 그 표시가 이 점수표의 라이선스인지는 카드가 말하지 않는다.

이 점수는 Arena 행이 아니다. 2025-03-20 이후 모델은 이 표에 없다. `data/performance/`에 넣지 않는다.
