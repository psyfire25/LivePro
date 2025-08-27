const fs = require('fs');
const p = 'apps/api/src/main.ts';
let s = fs.readFileSync(p, 'utf8');

// add imports
if (!s.includes('@nestjs/swagger')) {
  s = `import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';\n` + s;
}

// add ValidationPipe
if (!/ValidationPipe/.test(s)) {
  s = s.replace(/async function bootstrap\(\)\s*{/, m => m +
    `\n  const { ValidationPipe } = await import('@nestjs/common');\n`);
  s = s.replace(/await app\.listen\([^)]*\);?/, 
    `app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));\n$&`);
}

// add Swagger setup at /docs
if (!/SwaggerModule\.setup/.test(s)) {
  s = s.replace(/await app\.listen\([^)]*\);?/, 
`const config = new DocumentBuilder()
  .setTitle('LivePro API')
  .setDescription('OpenAPI spec for LivePro')
  .setVersion('1.0.0')
  .build();
const doc = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/docs', app, doc);
$&`);
}

// ensure port 4000
if (!/app\.listen\(4000\)/.test(s)) {
  s = s.replace(/await app\.listen\([^)]*\);?/, 'await app.listen(4000);');
}

fs.writeFileSync(p, s);
console.log('Patched apps/api/src/main.ts');
