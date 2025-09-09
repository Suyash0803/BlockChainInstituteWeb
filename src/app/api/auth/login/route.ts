import { NextRequest, NextResponse } from 'next/server';
import { 
  comparePassword, 
  findUserByEmail, 
  findUserById, 
  generateToken, 
  parseToken,
  users
} from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body;

    console.log('Login attempt:', { email, password: '***' });

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = findUserByEmail(email);
    console.log('User found:', user ? 'Yes' : 'No');
    console.log('Total users in system:', users.length);
    
    if (!user) {
      // For development: If user doesn't exist, suggest registration
      console.log('User not found, available users:', users.map(u => u.email));
      return NextResponse.json(
        { error: 'Invalid email or password. Please check your credentials or register a new account.' },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = comparePassword(password, user.password);
    console.log('Password check:', { 
      inputPassword: password, 
      hashedInput: comparePassword(password, user.password) ? 'MATCH' : 'NO MATCH',
      storedHash: user.password 
    });
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if user is verified
    if (!user.verified) {
      return NextResponse.json(
        { error: 'Please verify your email address before logging in' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(user.id);
    console.log('Generated token for user:', user.id, 'Token:', token);

    // Return user data (excluding password)
    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      verified: user.verified
    };

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userData,
      token: token,
      expiresIn: rememberMe ? '30d' : '24h'
    });

    // Set HTTP-only cookie for session
    console.log('Setting auth_token cookie');
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: false, // Set to false for development
      sameSite: 'lax', // Changed from strict to lax
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 24 hours
      path: '/' // Explicitly set path
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to check authentication status
export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/auth/login - Checking auth status');
    const token = request.cookies.get('auth_token')?.value;
    console.log('Auth token from cookies:', token ? 'present' : 'missing');
    
    if (!token) {
      console.log('No auth token found in cookies');
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Parse token to get user ID
    const userId = parseToken(token);
    console.log('Parsed user ID from token:', userId);
    
    if (!userId) {
      console.log('Invalid token format');
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const user = findUserById(userId);
    console.log('User found by ID:', user ? 'yes' : 'no');

    if (!user) {
      console.log('User not found for ID:', userId);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
    }

    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      verified: user.verified
    };

    console.log('Auth check successful for user:', userData.email);
    return NextResponse.json({
      success: true,
      user: userData
    });

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
