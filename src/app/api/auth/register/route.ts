import { NextRequest, NextResponse } from 'next/server';
import { 
  hashPassword, 
  findUserByEmail, 
  addUser, 
  generateUserId,
  User,
  users
} from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      password, 
      confirmPassword,
      interests,
      agreeToTerms,
      marketingOptIn 
    } = body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (!agreeToTerms) {
      return NextResponse.json(
        { error: 'You must agree to the Terms and Conditions' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Password strength validation
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = hashPassword(password);

    // Create new user
    const newUser: User = {
      id: generateUserId(),
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
      phone: phone || '',
      role: 'student',
      verified: true, // Auto-verify for demo purposes
      interests: interests || [],
      marketingOptIn: marketingOptIn || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add user to database
    addUser(newUser);

    // Return success response (excluding password)
    const userData = {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phone: newUser.phone,
      role: newUser.role,
      verified: newUser.verified,
      interests: newUser.interests,
      createdAt: newUser.createdAt
    };

    // In production, send verification email here
    console.log(`User registered: ${email}`);

    return NextResponse.json({
      success: true,
      message: 'Account created successfully! You can now log in.',
      user: userData,
      nextSteps: [
        'Your account has been created and verified',
        'You can now log in with your email and password',
        'Browse our course catalog and enroll in courses',
        'Join our community events and workshops',
        'Start your blockchain learning journey'
      ]
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve user registration statistics (optional)
export async function GET() {
  try {
    const totalUsers = users.length;
    const verifiedUsers = users.filter(u => u.verified).length;
    const studentsCount = users.filter(u => u.role === 'student').length;
    const recentRegistrations = users
      .filter(u => {
        const userDate = new Date(u.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return userDate > weekAgo;
      })
      .length;

    return NextResponse.json({
      success: true,
      statistics: {
        totalUsers,
        verifiedUsers,
        studentsCount,
        recentRegistrations,
        popularInterests: [
          'Blockchain Fundamentals',
          'Smart Contracts',
          'DeFi Development',
          'Web3 Development',
          'Cryptocurrency Trading'
        ]
      }
    });

  } catch (error) {
    console.error('Statistics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
