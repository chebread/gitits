// import fs from 'fs';
// import path from 'path';
// import { publicEncrypt, privateDecrypt } from 'crypto';
// import paths from './paths.js';
// // Ensure the certificate and key provided are valid and if not
// // throw an easy to debug error
// function validateKeyAndCerts({ cert, key }) {
//   let encrypted;
//   // publicEncrypt will throw an error with an invalid cert
//   encrypted = publicEncrypt(cert, Buffer.from('test'));
//   // privateDecrypt will throw an error with an invalid key
//   privateDecrypt(key, encrypted);
// }

// // Read file and throw an error if it doesn't exist
// function readEnvFile(file) {
//   return fs.readFileSync(file);
// }

// // Get the https config
// // Return cert files if provided in env, otherwise just true or false
// function getHttpsConfig() {
//   const { SSL_CRT_FILE, SSL_KEY_FILE } = process.env;

//   if (SSL_CRT_FILE && SSL_KEY_FILE) {
//     const crtFile = path.resolve(paths.appPath, SSL_CRT_FILE);
//     const keyFile = path.resolve(paths.appPath, SSL_KEY_FILE);
//     const config = {
//       cert: readEnvFile(crtFile),
//       key: readEnvFile(keyFile),
//     };

//     validateKeyAndCerts({ ...config });
//     return config;
//   }
//   return isHttps;
// }

// export default getHttpsConfig;
