export interface Product {
  name: string;
  description: string;
  currentVersion: string;
  versionsCount: number;
  src: string;
}

export const PRODUCTS_BlOCK_CONTENT: Product[] = [
  {
    name: 'Spring Boot',
    description:
      'Takes an opinionated view of building Spring applications and gets you up and running as quickly as possible.',
    currentVersion: '3.5.3',
    versionsCount: 9,
    src: 'https://spring.io/img/projects/spring-boot.svg',
  },
  {
    name: 'Spring Framework',
    description:
      'Provides core support for dependency injection, transaction management, web apps, data access, messaging, and more.',
    currentVersion: '6.2.8',
    versionsCount: 8,
    src: 'https://spring.io//img/projects/spring-framework.svg?v=2',
  },
  {
    name: 'Spring Data',
    description:
      'Provides a consistent approach to data access – relational, non-relational, map-reduce, and beyond.',
    currentVersion: '2025.0.1',
    versionsCount: 6,
    src: 'https://spring.io//img/projects/spring-data.svg',
  },
  {
    name: 'Spring Cloud',
    description:
      'Provides a set of tools for common patterns in distributed systems. Useful for building and deploying microservices.',
    currentVersion: '2025.0.0',
    versionsCount: 9,
    src: 'https://spring.io//img/projects/spring-cloud.svg',
  },
  {
    name: 'Spring Cloud Data Flow',
    description:
      'Provides an orchestration service for composable data microservice applications on modern runtimes.',
    currentVersion: '2.11.5',
    versionsCount: 7,
    src: 'https://spring.io//img/projects/spring-data-flow.svg',
  },
  {
    name: 'Spring Security',
    description:
      'Protects your application with comprehensive and extensible authentication and authorization support.',
    currentVersion: '6.5.1',
    versionsCount: 10,
    src: 'https://spring.io/img/projects/spring-security.svg',
  },
];
