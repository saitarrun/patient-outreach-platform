import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 50 }, // Ramp up to 50 users
        { duration: '30s', target: 50 }, // Stay at 50 users
        { duration: '10s', target: 0 },  // Ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000'; // Target server (can be overriden)

export default function () {
    // 1. Health Check (Lightweight)
    let res = http.get(`${BASE_URL}/health`);
    check(res, { 'status is 200': (r) => r.status === 200 });

    // 2. Create Patient (Write heavy)
    const payload = JSON.stringify({
        firstName: 'Load',
        lastName: 'Tester',
        dateOfBirth: '1990-01-01',
        phone: `+1555000${Math.floor(Math.random() * 10000)}`, // Unique phone
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'x-tenant-id': '198287b6-0157-4459-a16d-d8ff7b5e91a3', // Valid Tenant
            'x-user-id': '0228e1e1-3f48-4e69-8ef4-8fb3744f0b1a', // Valid Admin User
        },
    };

    res = http.post(`${BASE_URL}/api/patients`, payload, params);

    // We expect 201 (Created) or 409 (Conflict if phone exists)
    check(res, {
        'status is 201 or 409': (r) => r.status === 201 || r.status === 409
    });

    sleep(1);
}
