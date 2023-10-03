import { Department } from '../types';
import { faker } from '@faker-js/faker';

export default function addFakeWorkload(departments: Department[]) {
    for (let department of departments) {
        let workload = faker.helpers.arrayElement(['low', 'medium', 'high']);
        department.workload = workload;
    }
}