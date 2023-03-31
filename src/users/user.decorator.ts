import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserDecorator {
    id: number;
    employee_id: number;
    identity: string | null;
    email: string;
    name: string;
    user_type: string;
    phone_number: string | null;
    job_title: string | null;
}

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        return request.user as UserDecorator;
    },
);
