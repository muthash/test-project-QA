import { faker } from "@faker-js/faker";

export type WebTableUser = {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
};

export function generateUser(overrides: Partial<WebTableUser> = {}): WebTableUser {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    email: faker.internet.exampleEmail({ firstName, lastName }).toLowerCase(),
    age: faker.number.int({ min: 21, max: 60 }).toString(),
    salary: faker.number.int({ min: 30000, max: 120000 }).toString(),
    department: faker.commerce.department(),
    ...overrides,
  };
}

export const validUsers: WebTableUser[] = [
  {
    firstName: "Alice",
    lastName: "Anderson",
    email: "alice.anderson@example.com",
    age: "28",
    salary: "65000",
    department: "Engineering",
  },
  {
    firstName: "Bob",
    lastName: "Baker",
    email: "bob.baker@example.com",
    age: "35",
    salary: "72000",
    department: "Marketing",
  },
  {
    firstName: "Cathy",
    lastName: "Crawford",
    email: "cathy.crawford@example.com",
    age: "41",
    salary: "82000",
    department: "Finance",
  },
  {
    firstName: "David",
    lastName: "Doyle",
    email: "david.doyle@example.com",
    age: "30",
    salary: "75000",
    department: "Product",
  },
  {
    firstName: "Eva",
    lastName: "Edwards",
    email: "eva.edwards@example.com",
    age: "26",
    salary: "58000",
    department: "Support",
  },
  {
    firstName: "Frank",
    lastName: "Ferguson",
    email: "frank.ferguson@example.com",
    age: "38",
    salary: "91000",
    department: "IT",
  },
  {
    firstName: "Grace",
    lastName: "Gibbs",
    email: "grace.gibbs@example.com",
    age: "29",
    salary: "62000",
    department: "Design",
  },
  {
    firstName: "Henry",
    lastName: "Hughes",
    email: "henry.hughes@example.com",
    age: "45",
    salary: "99000",
    department: "Management",
  },
  {
    firstName: "Isla",
    lastName: "Irwin",
    email: "isla.irwin@example.com",
    age: "31",
    salary: "77000",
    department: "Operations",
  },
  {
    firstName: "Jack",
    lastName: "Jennings",
    email: "jack.jennings@example.com",
    age: "34",
    salary: "80000",
    department: "Logistics",
  },
];
