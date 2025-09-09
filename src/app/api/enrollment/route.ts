import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      course,
      experience,
      motivation,
      startDate
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !course) {
      return NextResponse.json(
        { error: 'First name, last name, email, and course selection are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate a mock enrollment ID
    const enrollmentId = `ENR-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    // In a real application, you would:
    // 1. Save enrollment to database
    // 2. Process payment
    // 3. Send confirmation email
    // 4. Create student account
    // 5. Grant course access
    
    console.log('Course enrollment:', {
      enrollmentId,
      firstName,
      lastName,
      email,
      phone,
      course,
      experience,
      motivation,
      startDate,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({
      message: 'Enrollment successful! Welcome to Blockchain Institute.',
      enrollmentId,
      course,
      nextSteps: [
        'Check your email for welcome instructions',
        'Complete your student profile',
        'Join the course Discord community',
        'Access your course materials'
      ]
    }, { status: 200 });

  } catch (error) {
    console.error('Enrollment error:', error);
    return NextResponse.json(
      { error: 'Internal server error during enrollment' },
      { status: 500 }
    );
  }
}
