export interface YodaUser {
    access_token?: string;
    token_type: string;
    refresh_token: string;
    refresh_token_expires_on: string;
    username: string;
    name: string;
    employee_id: string;
    email: string;
    roles: Array<any>;
}