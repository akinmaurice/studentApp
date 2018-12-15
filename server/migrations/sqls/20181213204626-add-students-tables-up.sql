/* Replace with your SQL commands */
CREATE TABLE student(
    id VARCHAR PRIMARY KEY DEFAULT 'student-' || LOWER(
            REPLACE(
                CAST(uuid_generate_v1mc() As varchar(50))
                , '-','')
            ),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50) UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL,
    hobbies JSON NOT NULL,
    photo_url VARCHAR(2000) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);
