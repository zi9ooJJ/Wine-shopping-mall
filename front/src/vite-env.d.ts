/// <reference types="vite/client" />

// declare namespace NodeJS {
//   interface ProcessEnv {
//     readonly NODE_ENV: "development" | "production" | "test";
//     readonly SERVER_BASE_URL: string;
//   }
// }

interface ImportMetaEnv {
  readonly VITE_SERVER_BASE_URL: string;
  readonly SERVER_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
