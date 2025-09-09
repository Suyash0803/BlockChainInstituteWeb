import { NextRequest, NextResponse } from 'next/server';

// Mock certifications data - in a real app, this would come from a database
const certifications = [
  {
    id: 'blockchain-fundamentals-cert',
    title: 'Certified Blockchain Fundamentals Professional',
    description: 'Comprehensive certification covering blockchain basics, cryptography, and distributed systems.',
    duration: '3 months',
    level: 'Beginner',
    price: 399,
    creditsRequired: 40,
    examDuration: '2 hours',
    passingScore: 75,
    validityPeriod: '2 years',
    prerequisites: [],
    benefits: [
      'Industry-recognized certification',
      'Digital badge for LinkedIn',
      'Certificate of completion',
      'Access to exclusive job board'
    ],
    curriculum: [
      'Blockchain Technology Overview',
      'Cryptographic Foundations',
      'Consensus Mechanisms',
      'Bitcoin and Cryptocurrency',
      'Smart Contracts Introduction',
      'Blockchain Security',
      'Use Cases and Applications',
      'Future of Blockchain'
    ],
    examTopics: [
      'Blockchain fundamentals (25%)',
      'Cryptography and security (20%)',
      'Consensus mechanisms (15%)',
      'Cryptocurrency basics (15%)',
      'Smart contracts (15%)',
      'Applications and use cases (10%)'
    ]
  },
  {
    id: 'smart-contract-developer-cert',
    title: 'Certified Smart Contract Developer',
    description: 'Advanced certification for developers specializing in smart contract development and security.',
    duration: '4 months',
    level: 'Advanced',
    price: 799,
    creditsRequired: 60,
    examDuration: '3 hours',
    passingScore: 80,
    validityPeriod: '3 years',
    prerequisites: ['Basic programming knowledge', 'Blockchain fundamentals'],
    benefits: [
      'Advanced developer certification',
      'Priority job placement assistance',
      'Mentorship opportunities',
      'Access to exclusive developer community'
    ],
    curriculum: [
      'Solidity Programming',
      'Smart Contract Patterns',
      'Gas Optimization',
      'Security Best Practices',
      'Testing and Debugging',
      'DeFi Development',
      'NFT Development',
      'Contract Auditing'
    ],
    examTopics: [
      'Solidity development (30%)',
      'Security and best practices (25%)',
      'Testing and debugging (20%)',
      'Gas optimization (15%)',
      'DeFi and NFT concepts (10%)'
    ]
  },
  {
    id: 'defi-specialist-cert',
    title: 'Certified DeFi Specialist',
    description: 'Specialized certification in decentralized finance protocols and applications.',
    duration: '5 months',
    level: 'Expert',
    price: 999,
    creditsRequired: 80,
    examDuration: '4 hours',
    passingScore: 85,
    validityPeriod: '3 years',
    prerequisites: ['Smart contract development experience', 'Financial markets knowledge'],
    benefits: [
      'Expert-level certification',
      'Direct industry connections',
      'Consulting opportunities',
      'Speaking engagement invitations'
    ],
    curriculum: [
      'DeFi Ecosystem Overview',
      'Automated Market Makers',
      'Lending and Borrowing Protocols',
      'Yield Farming Strategies',
      'Governance Mechanisms',
      'Cross-chain Protocols',
      'Risk Management',
      'Protocol Economics'
    ],
    examTopics: [
      'DeFi protocols (35%)',
      'AMM and DEX mechanics (20%)',
      'Lending/borrowing (15%)',
      'Yield farming (15%)',
      'Risk management (15%)'
    ]
  }
];

export async function GET() {
  try {
    return NextResponse.json({ certifications }, { status: 200 });
  } catch (error) {
    console.error('Certifications API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certifications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      certificationId,
      experience,
      motivation,
      studyPlan,
      examDate
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !certificationId) {
      return NextResponse.json(
        { error: 'First name, last name, email, and certification selection are required' },
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

    // Find the selected certification
    const selectedCertification = certifications.find(cert => cert.id === certificationId);
    if (!selectedCertification) {
      return NextResponse.json(
        { error: 'Invalid certification selected' },
        { status: 400 }
      );
    }

    // Generate a mock application ID
    const applicationId = `CERT-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    // In a real application, you would:
    // 1. Save application to database
    // 2. Process payment
    // 3. Send confirmation email
    // 4. Schedule exam
    // 5. Create study plan
    
    console.log('Certification application:', {
      applicationId,
      firstName,
      lastName,
      email,
      phone,
      certificationId,
      certificationTitle: selectedCertification.title,
      experience,
      motivation,
      studyPlan,
      examDate,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({
      message: 'Certification application submitted successfully!',
      applicationId,
      certification: selectedCertification.title,
      nextSteps: [
        'Check your email for application confirmation',
        'Complete payment within 48 hours',
        'Access your study materials',
        'Schedule your exam date',
        'Join the certification study group'
      ]
    }, { status: 200 });

  } catch (error) {
    console.error('Certification application error:', error);
    return NextResponse.json(
      { error: 'Internal server error during application submission' },
      { status: 500 }
    );
  }
}
