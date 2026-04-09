# Database Schema

SQLite via better-sqlite3. File: `~/.../Gramo/gramo.db` (Electron userData path).

## Tables

### books
| column | type | notes |
|--------|------|-------|
| id | INTEGER PK | autoincrement |
| title | TEXT | "English Grammar in Use" |
| author | TEXT | "Raymond Murphy" |
| file_path | TEXT | absolute path to PDF |
| total_units | INTEGER | number of parsed chapters |
| imported_at | TEXT | ISO datetime |

### chapters
| column | type | notes |
|--------|------|-------|
| id | INTEGER PK | |
| book_id | INTEGER FK → books | |
| unit_number | INTEGER | 1–145 for Murphy Blue |
| title | TEXT | e.g. "Present simple" |
| topic | TEXT | short topic string |
| cefr_level | TEXT | A1/A2/B1/B2/C1/C2 |
| raw_text | TEXT | full extracted text from PDF |
| notes | TEXT nullable | user/AI notes |
| created_at | TEXT | |

### exercises
| column | type | notes |
|--------|------|-------|
| id | INTEGER PK | |
| chapter_id | INTEGER FK → chapters | |
| type | TEXT | multiple-choice / fill-in-blank / true-false / rewrite |
| question | TEXT | |
| options | TEXT nullable | JSON array of strings |
| answer | TEXT | correct answer |
| explanation | TEXT nullable | why this answer is correct |
| source | TEXT | 'static' or 'ai' |
| created_at | TEXT | |

### user_progress
| column | type | notes |
|--------|------|-------|
| id | INTEGER PK | |
| chapter_id | INTEGER FK → chapters | |
| exercise_id | INTEGER nullable FK → exercises | null = chapter-level score |
| score | INTEGER | 0–100 |
| attempts | INTEGER | |
| completed_at | TEXT | |

### placement_results
| column | type | notes |
|--------|------|-------|
| id | INTEGER PK | |
| level | TEXT | CEFR level result |
| score | INTEGER | 0–100 |
| total_questions | INTEGER | |
| breakdown | TEXT | JSON: {A1: {correct, total}, ...} |
| taken_at | TEXT | |

### placement_questions
| column | type | notes |
|--------|------|-------|
| id | INTEGER PK | |
| cefr_level | TEXT | |
| question | TEXT | |
| options | TEXT | JSON array |
| answer | TEXT | |
| topic | TEXT | grammar topic |

### settings
| column | type | notes |
|--------|------|-------|
| key | TEXT PK | |
| value | TEXT | |

Settings keys: `claude_api_key`, `current_level`, `active_book_id`, `theme`, `daily_goal_minutes`

## Indexes (to add when needed)
- `chapters(book_id, unit_number)`
- `exercises(chapter_id)`
- `user_progress(chapter_id, completed_at)`
