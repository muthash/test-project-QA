import { faker } from "@faker-js/faker";

export type WebTableUser = {
  age: string;
  department: string;
  email: string;
  firstName: string;
  lastName: string;
  salary: string;
};

export function generateUser(overrides: Partial<WebTableUser> = {}): WebTableUser {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    age: faker.number.int({ max: 60, min: 21 }).toString(),
    department: faker.commerce.department(),
    email: faker.internet.exampleEmail({ firstName, lastName }).toLowerCase(),
    firstName,
    lastName,
    salary: faker.number.int({ max: 120000, min: 30000 }).toString(),
    ...overrides,
  };
}

export const validUsers: WebTableUser[] = [
  {
    age: "28",
    department: "Engineering",
    email: "alice.anderson@example.com",
    firstName: "Alice",
    lastName: "Anderson",
    salary: "65000",
  },
  {
    age: "35",
    department: "Marketing",
    email: "bob.baker@example.com",
    firstName: "Bob",
    lastName: "Baker",
    salary: "72000",
  },
  {
    age: "41",
    department: "Finance",
    email: "cathy.crawford@example.com",
    firstName: "Cathy",
    lastName: "Crawford",
    salary: "82000",
  },
  {
    age: "30",
    department: "Product",
    email: "david.doyle@example.com",
    firstName: "David",
    lastName: "Doyle",
    salary: "75000",
  },
  {
    age: "26",
    department: "Support",
    email: "eva.edwards@example.com",
    firstName: "Eva",
    lastName: "Edwards",
    salary: "58000",
  },
  {
    age: "38",
    department: "IT",
    email: "frank.ferguson@example.com",
    firstName: "Frank",
    lastName: "Ferguson",
    salary: "91000",
  },
  {
    age: "29",
    department: "Design",
    email: "grace.gibbs@example.com",
    firstName: "Grace",
    lastName: "Gibbs",
    salary: "62000",
  },
  {
    age: "45",
    department: "Management",
    email: "henry.hughes@example.com",
    firstName: "Henry",
    lastName: "Hughes",
    salary: "99000",
  },
  {
    age: "31",
    department: "Operations",
    email: "isla.irwin@example.com",
    firstName: "Isla",
    lastName: "Irwin",
    salary: "77000",
  },
  {
    age: "34",
    department: "Logistics",
    email: "jack.jennings@example.com",
    firstName: "Jack",
    lastName: "Jennings",
    salary: "80000",
  },
];
