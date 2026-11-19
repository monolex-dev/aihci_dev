# 출시일

경로: `data/releases/six-families.jsonl`

한 줄은 출시 칸 후보다. 대상은 Claude, GPT, Gemini, Grok, Qwen, DeepSeek이고, 창은 2023-11-18부터 2026-11-18까지다. 출발점은 2026-11-18 BenchLM `models.json`에서 이름에 그 가족이 들어 있는 행이다. 확인한 날은 2026-11-18이다.

타임라인에 쓰는 날은 `released_on`이다. 이 값은 랩 공식 글에 그 날이 적혀 있을 때만 채운다. `benchlm_release_date`는 BenchLM이 적어 둔 찾을 위치다. 랩 글과 같다는 뜻은 `status`가 `confirmed`이고 두 날짜가 같을 때뿐이다.

| status | 뜻 | 행 |
| --- | --- | --- |
| `confirmed` | 공식 글에 날이 있다. `released_on`이 그 날이다 | 104 |
| `announced` | 공식 글이 모델을 그 날 소개하지만, 아직 열리지 않았다고 적는다. `released_on`은 비어 있고 `announced_on`만 있다 | 1 |
| `variant` | 같은 출시의 설정 이름이다. 별도 출시 글이 없어 `released_on`은 비어 있다 | 9 |
| `unconfirmed` | 랩 글에서 날을 확인하지 못했다. BenchLM 날짜가 있어도 `released_on`은 비어 있다 | 102 |
| `excluded` | 평가 하네스, 증류, 다른 제작자의 가중치다. 칸이 아니다 | 55 |
| `out_of_window` | BenchLM 날짜가 창 밖이다 | 1 |

발표와 일반 공개가 다른 날이면 줄이 둘이다. `kind`는 `발표` 또는 `일반 공개`다. 예: Gemini 4 Carbon은 2026-10-28 발표, 2026-11-10 일반 공개다.

`source_url`은 그 날을 적은 글이다. 발표 원문 전문은 넣지 않는다. 점수는 넣지 않는다. Open LLM Leaderboard의 업로드일과 제출일은 출시일이 아니므로 넣지 않는다.

BenchLM 날짜와 공식 날이 다른 확정 행은 노트에 그 차이를 적었다. 그중 모델 자체의 날이 갈리는 경우는 아래다.

| 모델 | BenchLM | 공식 글 |
| --- | --- | --- |
| Claude 3 Opus, Claude 3 Haiku | 2024-03-01 | 가족 발표 2024-03-04. Haiku 사용 가능 2024-03-13 |
| Claude 3.5 Sonnet | 2024-06-01 | 2024-06-21. 업그레이드 글은 2024-10-22 |
| Claude Opus 4.6 | 2026-02-01 | 2026-02-05 |
| Claude Sonnet 4.6 | 2026-02-01 | 2026-02-17 |
| GPT-5.5, GPT-5.5 Pro | 2026-04-23 | 발표 2026-04-23, API 2026-04-24 |
| Gemini 2.5 Pro | 2025-03-01 | Cloud Release date 2025-06-17. 3월 1일 글은 확인하지 않았다 |
| Gemini 3.1 Flash-Lite | 2026-03-03 | Cloud Release date 2026-05-07. 3월 3일 글은 확인하지 않았다 |
| Gemini 3.8 Flash Cyber | 2026-09-02 | Cloud Release date 2026-09-16 |
| Gemini 3.8 Live | 2026-09-15 | Cloud Release date 2026-09-24 |
| Gemini 4 Argon | 2026-09-30 | Cloud Release date 2026-10-13. 9월 30일 글은 확인하지 않았다 |
| Grok 4.5 | 2026-07-08 | 출시 글 2026-07-16. 앱 공개 2026-07-22 |
| Qwen2.5-Omni 7B | 2025-03-26 | 블로그 날짜 줄 2025-03-27 |

Claude 3.5 Haiku는 2024-10-22 글이 모델을 소개하고 이달 안에 연다고 적는다. 사용 가능일은 비어 있다.

아직 `released_on`이 비어 있는 랩 출시에는 Mythos 5, Mythos 5.1, Mythos Preview, GPT-4.1 계열, GPT-4o mini, gpt-oss, GPT-6 계열, Gemini 1.0 Pro, Gemini 3.1 Pro, Gemini 3 Flash, Grok 2, Grok 3, Grok 4, Qwen3.5 이후가 들어 있다.
