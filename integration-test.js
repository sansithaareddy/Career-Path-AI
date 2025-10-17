// Integration Test Script for CareerPath AI
// This script tests the complete user flow step by step

const testConfig = {
  baseURL: 'http://localhost:5000/api',
  frontendURL: 'http://localhost:3000'
};

// Test user data
const testUser = {
  name: "Integration Test User",
  email: `test_${Date.now()}@test.com`, // Unique email for each test run
  password: "TestPassword123!"
};

let authToken = null;

// Helper function to make API requests
async function apiRequest(endpoint, method = 'GET', body = null, includeAuth = true) {
  const url = `${testConfig.baseURL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth && authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    return {
      success: response.ok,
      status: response.status,
      data: data
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Test functions
async function testHealthCheck() {
  console.log('\n🏥 Testing Backend Health Check...');
  const result = await apiRequest('/health', 'GET', null, false);
  
  if (result.success && result.data.status === 'OK') {
    console.log('✅ Backend health check passed');
    return true;
  } else {
    console.log('❌ Backend health check failed:', result);
    return false;
  }
}

async function testUserRegistration() {
  console.log('\n👤 Testing User Registration...');
  const result = await apiRequest('/auth/register', 'POST', testUser, false);
  
  if (result.success && result.data.token) {
    console.log('✅ User registration successful');
    console.log('📧 User email:', result.data.user.email);
    console.log('🎟️ Token received:', result.data.token.substring(0, 20) + '...');
    authToken = result.data.token;
    return true;
  } else {
    console.log('❌ User registration failed:', result);
    return false;
  }
}

async function testUserLogin() {
  console.log('\n🚪 Testing User Login...');
  const loginData = {
    email: testUser.email,
    password: testUser.password
  };
  
  const result = await apiRequest('/auth/login', 'POST', loginData, false);
  
  if (result.success && result.data.token) {
    console.log('✅ User login successful');
    console.log('🎟️ New token received:', result.data.token.substring(0, 20) + '...');
    authToken = result.data.token;
    return true;
  } else {
    console.log('❌ User login failed:', result);
    return false;
  }
}

async function testGetProfile() {
  console.log('\n👤 Testing Get User Profile...');
  const result = await apiRequest('/profile', 'GET');
  
  if (result.success) {
    console.log('✅ Profile retrieval successful');
    console.log('📋 User name:', result.data.name);
    return true;
  } else {
    console.log('❌ Profile retrieval failed:', result);
    return false;
  }
}

async function testUpdateProfile() {
  console.log('\n✏️ Testing Profile Update...');
  const updateData = {
    profile: {
      bio: "Integration test bio - updated successfully!",
      skills: ["JavaScript", "Testing", "Integration"],
      interests: ["Web Development", "Quality Assurance"],
      education: "Test University - Computer Science",
      experience: "2 years in software testing"
    }
  };
  
  const result = await apiRequest('/profile', 'PUT', updateData);
  
  if (result.success) {
    console.log('✅ Profile update successful');
    console.log('📝 Updated bio:', result.data.profile?.bio);
    return true;
  } else {
    console.log('❌ Profile update failed:', result);
    return false;
  }
}

async function testGetProgress() {
  console.log('\n📊 Testing Get User Progress...');
  const result = await apiRequest('/user/progress', 'GET');
  
  if (result.success) {
    console.log('✅ Progress retrieval successful');
    console.log('📈 Progress percentage:', result.data.completionPercentage || 0);
    return true;
  } else {
    console.log('❌ Progress retrieval failed:', result);
    return false;
  }
}

async function testUpdateProgress() {
  console.log('\n📈 Testing Progress Update...');
  const progressData = {
    type: 'assessment',
    data: {
      assessmentId: 'personality-test',
      completedAt: new Date().toISOString(),
      responses: [
        { questionId: 'q1', answer: 'JavaScript' },
        { questionId: 'q2', answer: 4 }
      ],
      results: {
        careerMatches: ['Software Developer', 'Web Developer'],
        personalityType: 'Analytical',
        strengths: ['Problem Solving', 'Logical Thinking']
      }
    }
  };
  
  const result = await apiRequest('/user/progress', 'PUT', progressData);
  
  if (result.success) {
    console.log('✅ Progress update successful');
    console.log('📊 Assessment progress updated');
    return true;
  } else {
    console.log('❌ Progress update failed:', result);
    return false;
  }
}

async function testResetProgress() {
  console.log('\n🔄 Testing Progress Reset...');
  const resetData = {
    confirmation: 'RESET_MY_PROGRESS'
  };
  
  const result = await apiRequest('/user/reset-progress', 'POST', resetData);
  
  if (result.success) {
    console.log('✅ Progress reset successful');
    console.log('🔄 All progress has been reset');
    return true;
  } else {
    console.log('❌ Progress reset failed:', result);
    return false;
  }
}

async function testLogout() {
  console.log('\n🚶‍♂️ Testing User Logout...');
  const result = await apiRequest('/auth/logout', 'POST');
  
  if (result.success) {
    console.log('✅ User logout successful');
    authToken = null;
    return true;
  } else {
    console.log('❌ User logout failed:', result);
    return false;
  }
}

// Main test runner
async function runIntegrationTests() {
  console.log('🚀 Starting CareerPath AI Integration Tests...');
  console.log('=' .repeat(50));
  
  const tests = [
    { name: 'Backend Health Check', fn: testHealthCheck },
    { name: 'User Registration', fn: testUserRegistration },
    { name: 'User Login', fn: testUserLogin },
    { name: 'Get Profile', fn: testGetProfile },
    { name: 'Update Profile', fn: testUpdateProfile },
    { name: 'Get Progress', fn: testGetProgress },
    { name: 'Update Progress', fn: testUpdateProgress },
    { name: 'Reset Progress', fn: testResetProgress },
    { name: 'User Logout', fn: testLogout }
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name} threw an error:`, error.message);
      failed++;
    }
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n' + '=' .repeat(50));
  console.log('📊 INTEGRATION TEST RESULTS:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 ALL TESTS PASSED! Your integration is working perfectly! 🎉');
  } else {
    console.log(`\n⚠️ ${failed} test(s) failed. Please check the logs above for details.`);
  }
}

// Run the tests
runIntegrationTests().catch(console.error);

console.log('\n📝 Test Configuration:');
console.log('🔗 Backend URL:', testConfig.baseURL);
console.log('🌐 Frontend URL:', testConfig.frontendURL);
console.log('👤 Test User Email:', testUser.email);