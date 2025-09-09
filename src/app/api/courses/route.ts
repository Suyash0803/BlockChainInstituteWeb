import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock course data - in a real app, this would come from a database
    const courses = [
      {
        id: 'blockchain-fundamentals',
        title: 'Blockchain Fundamentals',
        description: 'Master the core concepts of blockchain technology, including distributed ledgers, consensus mechanisms, and cryptographic principles.',
        duration: '8 weeks',
        level: 'Beginner',
        price: 299,
        instructor: 'Dr. Sarah Mitchell',
        rating: 4.9,
        students: 2847,
        features: [
          'Comprehensive blockchain theory',
          'Hands-on exercises',
          'Industry case studies',
          'Certificate of completion'
        ],
        syllabus: [
          'Introduction to Blockchain',
          'Cryptographic Foundations',
          'Consensus Mechanisms',
          'Bitcoin and Cryptocurrency',
          'Blockchain Applications',
          'Smart Contracts Basics',
          'Security and Privacy',
          'Future of Blockchain'
        ]
      },
      {
        id: 'smart-contracts',
        title: 'Smart Contract Development',
        description: 'Learn to build, deploy, and audit smart contracts on Ethereum using Solidity and modern development tools.',
        duration: '12 weeks',
        level: 'Intermediate',
        price: 599,
        instructor: 'David Kim',
        rating: 4.8,
        students: 1923,
        features: [
          'Solidity programming',
          'Testing frameworks',
          'Security best practices',
          'Real-world projects'
        ],
        syllabus: [
          'Ethereum Ecosystem',
          'Solidity Fundamentals',
          'Smart Contract Patterns',
          'Testing and Debugging',
          'Gas Optimization',
          'Security Auditing',
          'DeFi Protocols',
          'NFT Development'
        ]
      },
      {
        id: 'defi-development',
        title: 'DeFi Protocol Development',
        description: 'Build decentralized finance applications including DEXs, lending protocols, and yield farming platforms.',
        duration: '16 weeks',
        level: 'Advanced',
        price: 899,
        instructor: 'Elena Rodriguez',
        rating: 4.9,
        students: 1456,
        features: [
          'Advanced DeFi concepts',
          'Protocol architecture',
          'Liquidity mechanisms',
          'Portfolio project'
        ],
        syllabus: [
          'DeFi Landscape',
          'Automated Market Makers',
          'Lending and Borrowing',
          'Yield Farming',
          'Governance Tokens',
          'Cross-chain Protocols',
          'Risk Management',
          'Protocol Launch'
        ]
      },
      {
        id: 'nft-development',
        title: 'NFT Development & Marketplace',
        description: 'Create NFT collections, build marketplaces, and understand the economics of digital collectibles.',
        duration: '10 weeks',
        level: 'Intermediate',
        price: 499,
        instructor: 'Prof. Michael Chen',
        rating: 4.7,
        students: 2341,
        features: [
          'NFT standards (ERC-721, ERC-1155)',
          'Metadata and IPFS',
          'Marketplace development',
          'Launch strategy'
        ],
        syllabus: [
          'NFT Fundamentals',
          'ERC Standards',
          'Metadata and Storage',
          'Minting Mechanisms',
          'Marketplace Development',
          'Royalties and Economics',
          'Gaming NFTs',
          'Marketing and Launch'
        ]
      },
      {
        id: 'web3-development',
        title: 'Full-Stack Web3 Development',
        description: 'Build complete decentralized applications using React, Web3.js, and modern blockchain development stack.',
        duration: '14 weeks',
        level: 'Intermediate',
        price: 699,
        instructor: 'Sarah Mitchell & David Kim',
        rating: 4.8,
        students: 1789,
        features: [
          'Frontend integration',
          'Wallet connectivity',
          'State management',
          'Full DApp deployment'
        ],
        syllabus: [
          'Web3 Architecture',
          'Wallet Integration',
          'React + Web3.js',
          'State Management',
          'IPFS Integration',
          'Testing DApps',
          'Deployment Strategies',
          'Production Optimization'
        ]
      },
      {
        id: 'blockchain-security',
        title: 'Blockchain Security & Auditing',
        description: 'Learn to identify vulnerabilities, conduct security audits, and implement best practices for blockchain applications.',
        duration: '12 weeks',
        level: 'Advanced',
        price: 799,
        instructor: 'David Kim',
        rating: 4.9,
        students: 987,
        features: [
          'Vulnerability analysis',
          'Audit methodologies',
          'Security tools',
          'Bug bounty participation'
        ],
        syllabus: [
          'Security Fundamentals',
          'Common Vulnerabilities',
          'Audit Processes',
          'Static Analysis Tools',
          'Formal Verification',
          'Bug Bounty Programs',
          'Incident Response',
          'Security Consulting'
        ]
      }
    ];

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error('Courses API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
