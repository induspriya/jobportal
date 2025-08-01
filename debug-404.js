#!/usr/bin/env node

const http = require('http');
const https = require('https');

// Test URLs
const testUrls = [
  'http://localhost:3000/',
  'http://localhost:3000/api/health',
  'http://localhost:3000/api/test',
  'http://localhost:3000/favicon.svg',
  'http://localhost:3000/og-image.jpg', // This should now redirect to favicon.svg
  'http://localhost:5001/',
  'http://localhost:5001/api/health',
  'http://localhost:5001/api/test'
];

async function testUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      console.log(`✅ ${url} - Status: ${res.statusCode}`);
      resolve({ url, status: res.statusCode, success: true });
    }).on('error', (err) => {
      console.log(`❌ ${url} - Error: ${err.message}`);
      resolve({ url, error: err.message, success: false });
    });
  });
}

async function runTests() {
  console.log('🔍 Testing all endpoints for 404 errors...\n');
  
  const results = await Promise.all(testUrls.map(testUrl));
  
  console.log('\n📊 Summary:');
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  
  if (failed.length > 0) {
    console.log('\n❌ Failed URLs:');
    failed.forEach(f => console.log(`  - ${f.url}: ${f.error}`));
  }
  
  console.log('\n🎯 Common 404 causes:');
  console.log('1. Missing static files (images, CSS, JS)');
  console.log('2. Incorrect API endpoints');
  console.log('3. Routing issues');
  console.log('4. Proxy configuration problems');
  console.log('5. Missing environment variables');
}

runTests().catch(console.error); 