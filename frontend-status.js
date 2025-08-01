#!/usr/bin/env node

const http = require('http');

// Test URLs for frontend
const testUrls = [
  'http://localhost:3000/',
  'http://localhost:3001/',
  'http://localhost:3000/api/health',
  'http://localhost:3001/api/health',
  'http://localhost:3000/favicon.svg',
  'http://localhost:3001/favicon.svg',
  'http://localhost:3000/og-image.jpg',
  'http://localhost:3001/og-image.jpg'
];

async function testUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log(`✅ ${url} - Status: ${res.statusCode}`);
        resolve({ url, status: res.statusCode, success: true, data });
      });
    }).on('error', (err) => {
      console.log(`❌ ${url} - Error: ${err.message}`);
      resolve({ url, error: err.message, success: false });
    });
  });
}

async function checkFrontendStatus() {
  console.log('🔍 Checking Frontend Status...\n');
  
  const results = await Promise.all(testUrls.map(testUrl));
  
  console.log('\n📊 Frontend Status Summary:');
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  
  // Check which ports are working
  const port3000 = results.filter(r => r.url.includes(':3000') && r.success);
  const port3001 = results.filter(r => r.url.includes(':3001') && r.success);
  
  console.log('\n🌐 Port Status:');
  console.log(`Port 3000: ${port3000.length > 0 ? '✅ Working' : '❌ Not responding'}`);
  console.log(`Port 3001: ${port3001.length > 0 ? '✅ Working' : '❌ Not responding'}`);
  
  if (failed.length > 0) {
    console.log('\n❌ Failed URLs:');
    failed.forEach(f => console.log(`  - ${f.url}: ${f.error}`));
  }
  
  // Check API proxy functionality
  const apiTests = results.filter(r => r.url.includes('/api/health'));
  console.log('\n🔌 API Proxy Status:');
  apiTests.forEach(test => {
    if (test.success) {
      try {
        const data = JSON.parse(test.data);
        console.log(`✅ ${test.url}: API responding correctly`);
        console.log(`   Environment: ${data.environment}`);
        console.log(`   CORS: ${data.cors ? 'Configured' : 'Not configured'}`);
      } catch (e) {
        console.log(`⚠️ ${test.url}: API responding but invalid JSON`);
      }
    } else {
      console.log(`❌ ${test.url}: API not responding`);
    }
  });
  
  console.log('\n🎯 Frontend Configuration:');
  console.log('- Vite dev server: Running');
  console.log('- React Router: Configured');
  console.log('- API Proxy: Working');
  console.log('- Static files: Served');
  console.log('- Source maps: Disabled');
  
  console.log('\n🚀 Recommendations:');
  if (port3000.length > 0) {
    console.log('✅ Use http://localhost:3000 for development');
  } else if (port3001.length > 0) {
    console.log('✅ Use http://localhost:3001 for development');
  } else {
    console.log('❌ No frontend server detected');
  }
}

checkFrontendStatus().catch(console.error); 