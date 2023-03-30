
export const AppConstants = {
    SQL: {
        GET_EMLOYEES: `select name, job_title, phone_number, uc.email AS email FROM employees e 
            LEFT JOIN user_credentials uc ON e.user_auth_id = uc.id
            WHERE e.active = '1'`,
        GET_EMPLOYEES_THAT_HAS_EATEN_PER_DAY: `SELECT * FROM employee_meals em
            LEFT JOIN employees e ON em.employee_id = e.id
            WHERE status = '1' AND em.created_at = ? AND e.active = '1'`,
        GET_EMPLOYEES_FOR_MEAL: `SELECT e.name AS name, em.status AS status, e.job_title AS job_title, em.created_at AS created_at
            FROM employee_meals em
            LEFT JOIN employees e ON em.employee_id = e.id
            WHERE em.created_at = ? AND e.active = '1'`,
        GET_EMPLOYEE: `SELECT * FROM employee_meal em 
            LEFT JOIN employees e ON em.employee_id = e.id
            WHERE em.created_at = ? AND e.active = '1' AND e.identity = ?`
    },
    Messages: {
        USER_CREATED_SUCCESSFULLY: 'User created successfully',
        USER_UPDATED_SUCCESSFULLY: 'User updated successfully',
        PASSWORD_SET_SUCCESSFULLY: 'User password set successfully',
        INVALID_USER: 'Invalid user credentials',
        PERMISSION_DENIED: 'Permission denied',
        EATEN_ALEADY: 'You have eaten already for today',
        CODE_EXIST: 'Check your dashboard for your code',
        INVALID_CODE: 'Your code is invalid or has expired'
    },
    SaltOrRounds: 10
}

export enum ResponseCodes {
    "Required Parameters missing" = 1000,
    "User not accepted" = 1016,
    "Creator Disabled" = 1020,
    "Enter Phone or Email already exist with other Operator" = 1021,
    "Permission denied" = 1022,
    "User does not exist" = 1023
}

export class _Response {
    statusCode: number;
    error: string;
    response: string;
}
