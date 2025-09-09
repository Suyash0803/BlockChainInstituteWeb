import { NextRequest, NextResponse } from 'next/server';

// Mock events data - in a real app, this would come from a database
const events = [
  {
    id: 'blockchain-summit-2025',
    title: 'Global Blockchain Summit 2025',
    description: 'Join industry leaders, developers, and enthusiasts for the biggest blockchain event of the year.',
    type: 'Conference',
    date: '2025-10-15',
    endDate: '2025-10-17',
    time: '09:00 AM',
    location: 'San Francisco Convention Center',
    address: '747 Howard St, San Francisco, CA 94103',
    isVirtual: false,
    virtualLink: '',
    capacity: 5000,
    registered: 3247,
    price: 299,
    earlyBirdPrice: 199,
    earlyBirdDeadline: '2025-09-15',
    speakers: [
      {
        name: 'Vitalik Buterin',
        title: 'Co-founder of Ethereum',
        company: 'Ethereum Foundation'
      },
      {
        name: 'Changpeng Zhao',
        title: 'Former CEO',
        company: 'Binance'
      },
      {
        name: 'Catherine Wood',
        title: 'CEO',
        company: 'ARK Invest'
      }
    ],
    agenda: [
      {
        time: '09:00 AM',
        title: 'Registration & Networking',
        speaker: ''
      },
      {
        time: '10:00 AM',
        title: 'Keynote: The Future of Decentralized Finance',
        speaker: 'Vitalik Buterin'
      },
      {
        time: '11:30 AM',
        title: 'Panel: Institutional Adoption of Crypto',
        speaker: 'Multiple Speakers'
      },
      {
        time: '01:00 PM',
        title: 'Lunch & Networking',
        speaker: ''
      },
      {
        time: '02:30 PM',
        title: 'Workshop: Building on Ethereum',
        speaker: 'Developer Community'
      }
    ],
    tags: ['Conference', 'DeFi', 'Ethereum', 'Institutional', 'Networking']
  },
  {
    id: 'web3-developer-workshop',
    title: 'Web3 Developer Workshop',
    description: 'Hands-on workshop for developers looking to build decentralized applications.',
    type: 'Workshop',
    date: '2025-09-20',
    endDate: '2025-09-20',
    time: '02:00 PM',
    location: 'Virtual Event',
    address: '',
    isVirtual: true,
    virtualLink: 'https://zoom.us/webinar/register',
    capacity: 500,
    registered: 342,
    price: 49,
    earlyBirdPrice: 29,
    earlyBirdDeadline: '2025-09-10',
    speakers: [
      {
        name: 'David Kim',
        title: 'Lead Blockchain Engineer',
        company: 'Blockchain Institute'
      },
      {
        name: 'Sarah Mitchell',
        title: 'CTO',
        company: 'Blockchain Institute'
      }
    ],
    agenda: [
      {
        time: '02:00 PM',
        title: 'Introduction to Web3 Development',
        speaker: 'David Kim'
      },
      {
        time: '02:30 PM',
        title: 'Setting up Development Environment',
        speaker: 'Sarah Mitchell'
      },
      {
        time: '03:00 PM',
        title: 'Building Your First DApp',
        speaker: 'David Kim'
      },
      {
        time: '04:00 PM',
        title: 'Q&A and Troubleshooting',
        speaker: 'Both Speakers'
      }
    ],
    tags: ['Workshop', 'Web3', 'Development', 'DApp', 'Virtual']
  },
  {
    id: 'nft-masterclass',
    title: 'NFT Creation Masterclass',
    description: 'Learn how to create, mint, and market your own NFT collections.',
    type: 'Masterclass',
    date: '2025-09-25',
    endDate: '2025-09-25',
    time: '07:00 PM',
    location: 'New York Tech Hub',
    address: '123 Innovation Ave, New York, NY 10001',
    isVirtual: false,
    virtualLink: '',
    capacity: 150,
    registered: 89,
    price: 79,
    earlyBirdPrice: 59,
    earlyBirdDeadline: '2025-09-15',
    speakers: [
      {
        name: 'Prof. Michael Chen',
        title: 'Head of Curriculum',
        company: 'Blockchain Institute'
      },
      {
        name: 'Alex Rivera',
        title: 'NFT Artist & Developer',
        company: 'Independent'
      }
    ],
    agenda: [
      {
        time: '07:00 PM',
        title: 'Welcome & Introductions',
        speaker: 'Prof. Michael Chen'
      },
      {
        time: '07:15 PM',
        title: 'NFT Market Overview',
        speaker: 'Alex Rivera'
      },
      {
        time: '08:00 PM',
        title: 'Technical Implementation',
        speaker: 'Prof. Michael Chen'
      },
      {
        time: '08:45 PM',
        title: 'Marketing Your NFTs',
        speaker: 'Alex Rivera'
      },
      {
        time: '09:15 PM',
        title: 'Live Q&A Session',
        speaker: 'Both Speakers'
      }
    ],
    tags: ['Masterclass', 'NFT', 'Art', 'Marketing', 'Creation']
  },
  {
    id: 'defi-yield-farming-webinar',
    title: 'DeFi Yield Farming Strategies',
    description: 'Learn advanced yield farming strategies and risk management in DeFi.',
    type: 'Webinar',
    date: '2025-10-05',
    endDate: '2025-10-05',
    time: '12:00 PM',
    location: 'Virtual Event',
    address: '',
    isVirtual: true,
    virtualLink: 'https://zoom.us/webinar/register',
    capacity: 1000,
    registered: 654,
    price: 0,
    earlyBirdPrice: 0,
    earlyBirdDeadline: '',
    speakers: [
      {
        name: 'Elena Rodriguez',
        title: 'Director of Student Success',
        company: 'Blockchain Institute'
      },
      {
        name: 'Marcus Thompson',
        title: 'DeFi Strategist',
        company: 'Yield Protocol'
      }
    ],
    agenda: [
      {
        time: '12:00 PM',
        title: 'DeFi Landscape Overview',
        speaker: 'Elena Rodriguez'
      },
      {
        time: '12:20 PM',
        title: 'Yield Farming Fundamentals',
        speaker: 'Marcus Thompson'
      },
      {
        time: '12:40 PM',
        title: 'Risk Management Strategies',
        speaker: 'Elena Rodriguez'
      },
      {
        time: '01:00 PM',
        title: 'Live Demo & Tools',
        speaker: 'Marcus Thompson'
      },
      {
        time: '01:20 PM',
        title: 'Q&A Session',
        speaker: 'Both Speakers'
      }
    ],
    tags: ['Webinar', 'DeFi', 'Yield Farming', 'Free', 'Virtual']
  }
];

export async function GET() {
  try {
    // Sort events by date
    const sortedEvents = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return NextResponse.json({ events: sortedEvents }, { status: 200 });
  } catch (error) {
    console.error('Events API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
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
      company,
      jobTitle,
      eventId,
      ticketType,
      dietaryRestrictions,
      specialRequests,
      marketingOptIn
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !eventId) {
      return NextResponse.json(
        { error: 'First name, last name, email, and event selection are required' },
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

    // Find the selected event
    const selectedEvent = events.find(event => event.id === eventId);
    if (!selectedEvent) {
      return NextResponse.json(
        { error: 'Invalid event selected' },
        { status: 400 }
      );
    }

    // Check capacity
    if (selectedEvent.registered >= selectedEvent.capacity) {
      return NextResponse.json(
        { error: 'Event is fully booked' },
        { status: 400 }
      );
    }

    // Generate a mock registration ID
    const registrationId = `EVT-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    // In a real application, you would:
    // 1. Save registration to database
    // 2. Process payment (if required)
    // 3. Send confirmation email with calendar invite
    // 4. Update event capacity
    // 5. Send reminders before event
    
    console.log('Event registration:', {
      registrationId,
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
      eventId,
      eventTitle: selectedEvent.title,
      ticketType,
      dietaryRestrictions,
      specialRequests,
      marketingOptIn,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Calculate ticket price
    const now = new Date();
    const earlyBirdDeadline = selectedEvent.earlyBirdDeadline ? new Date(selectedEvent.earlyBirdDeadline) : null;
    const ticketPrice = earlyBirdDeadline && now <= earlyBirdDeadline 
      ? selectedEvent.earlyBirdPrice 
      : selectedEvent.price;

    return NextResponse.json({
      message: 'Event registration successful!',
      registrationId,
      event: selectedEvent.title,
      ticketPrice,
      nextSteps: [
        'Check your email for confirmation and calendar invite',
        ticketPrice > 0 ? 'Complete payment within 24 hours' : 'Your free ticket is confirmed',
        selectedEvent.isVirtual ? 'Virtual meeting link will be sent 1 hour before event' : 'Arrive 30 minutes early for check-in',
        'Download the event app for networking',
        'Join the event community chat'
      ]
    }, { status: 200 });

  } catch (error) {
    console.error('Event registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error during registration' },
      { status: 500 }
    );
  }
}
