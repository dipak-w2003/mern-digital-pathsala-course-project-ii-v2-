# Some MySQL queries & Doubts

## Query 1: JOIN, AS, ON

```sql
SELECT
    c.id,
    c.courseName
FROM
    course_${instituteNumber} AS c
JOIN
    category_${instituteNumber} AS cat
ON
    c.categoryId = cat.id;
```

### Purpose

This query retrieves a list of courses (with their IDs and names) from an institute’s database **_only if they have a matching category_** in the category table for that same institute.

### Explanation

1. Dynamic Table Names

- - `course_${instituteNumber}` → The course table for a specific institute.
    Example: if `instituteNumber = 101`, this becomes course_101.
- - `category_${instituteNumber}` → The category table for the same institute.
    Example: `category_101`.

2. Aliases (`AS`)

- - `AS c` → Alias for the course table.
- - `AS cat` → Alias for the category table.
    Aliases make the query shorter and easier to read.

3. SELECT

- - c.id → The course’s unique ID.
- - c.courseName → The name of the course

### Output 👍

`course_101` table:
| id | courseName | categoryId |
| -- | ---------- | ---------- |
| 1 | ReactJS | 10 |
| 2 | Python | 20 |
| 3 | Bash | 99 |

<br>

`category_101` table:
| id | categoryName |
| -- | ------------ |
| 10 | Web Dev |
| 20 | AI/ML |

### Result of the query 🏌️‍♂️

| id  | courseName |
| --- | ---------- |
| 1   | ReactJS    |
| 2   | Python     |

(`Bash` is excluded because **categoryId : 99** does not exist.)
