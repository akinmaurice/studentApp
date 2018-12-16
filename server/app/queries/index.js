const queries = {
    createStudent: `
        INSERT INTO student(first_name, last_name, email, date_of_birth, hobbies, photo_url, created_at, updated_at)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
   `,
    updateStudent: `
        UPDATE
            student
        SET
            first_name = $1,
            last_name = $2,
            date_of_birth = $3,
            hobbies = $4,
            updated_at = $5
        WHERE
            id = $6
   `,
    getAllStudents: `
        SELECT
            *
        FROM
            student
        OFFSET $1
        LIMIT $2
   `,
    getStudentsCount: `
        SELECT count(*) FROM student;
   `,
    getStudentById: `
        SELECT
            *
        FROM
            student
        WHERE
            id = $1
   `,
    getStudentByEmail: `
   SELECT
       *
   FROM
       student
   WHERE
       email = $1
`,
    deleteStudent: `
        DELETE
        FROM
            student
        WHERE
            id = $1
   `
};

export default queries;
