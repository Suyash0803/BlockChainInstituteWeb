import { NextRequest, NextResponse } from 'next/server';
import { users, hashPassword, comparePassword } from '@/lib/auth';

export async function GET() {
  try {
    // Test data
    const testPassword = 'admin123';
    const hashedPassword = hashPassword(testPassword);
    
    return NextResponse.json({
      success: true,
      debug: {
        totalUsers: users.length,
        adminUser: users.find(u => u.email === 'admin@blockchaininstitute.com'),
        testHash: {
          password: testPassword,
          hash: hashedPassword,
          adminPasswordMatches: comparePassword(testPassword, users[0]?.password || '')
        }
      }
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json(
      { error: 'Debug failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    const hashedInput = hashPassword(password);
    
    return NextResponse.json({
      success: true,
      debug: {
        email,
        userExists: !!user,
        inputHash: hashedInput,
        storedHash: user?.password,
        passwordMatch: user ? comparePassword(password, user.password) : false
      }
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json(
      { error: 'Debug failed' },
      { status: 500 }
    );
  }
}
