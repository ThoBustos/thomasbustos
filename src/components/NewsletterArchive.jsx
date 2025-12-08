import { useState, useEffect } from 'react';
import './NewsletterArchive.css';
import NewsletterIssueCard from './NewsletterIssueCard';
import NewsletterHeader from './NewsletterHeader';

// Mock data
const mockIssues = [
  {
    id: 1,
    date: 'Dec 04',
    title: "OpenRouter's State of AI - An Empirical 100 Trillion Token Study",
    summary: "OpenRouter released comprehensive usage data showing 7 trillion tokens weekly. Key insights into model preferences and usage patterns.",
    tags: ['frontier', 'reasoning', 'coding', 'benchmarking'],
    sourceCount: 12,
    readingTime: '8 min'
  },
  {
    id: 2,
    date: 'Dec 03',
    title: "not much happened today",
    summary: "A quieter day in AI with incremental updates and community discussions.",
    tags: ['daily', 'brief'],
    sourceCount: 3,
    readingTime: '2 min'
  },
  {
    id: 3,
    date: 'Dec 02',
    title: "DeepSeek V3.2 & 3.2-Speciate: GPT5-High Open Weights, Context Management, Plans for Compute Scaling",
    summary: "DeepSeek announces major model updates with improved context handling and scaling strategies.",
    tags: ['models', 'open-source', 'performance', 'deepseek'],
    sourceCount: 8,
    readingTime: '6 min'
  },
  {
    id: 4,
    date: 'Dec 01',
    title: "Anthropic Claude 3.5 Sonnet - New Reasoning and Coding Capabilities",
    summary: "Major updates to Claude 3.5 Sonnet with enhanced reasoning abilities and improved coding assistance.",
    tags: ['anthropic', 'reasoning', 'coding', 'updates'],
    sourceCount: 15,
    readingTime: '10 min'
  },
  {
    id: 5,
    date: 'Nov 30',
    title: "Google Gemini Ultra - Multimodal AI Revolution",
    summary: "Google unveils Gemini Ultra with unprecedented multimodal capabilities across text, image, and video understanding.",
    tags: ['google', 'multimodal', 'vision', 'frontier'],
    sourceCount: 20,
    readingTime: '12 min'
  }
];

function NewsletterArchive({ navigate }) {
  const [theme, setTheme] = useState('dark');
  const [issues, setIssues] = useState(mockIssues);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleReturnHome = () => {
    if (navigate) {
      navigate('/');
    } else if (window.navigate) {
      window.navigate('/');
    }
  };

  const handleIssueClick = (issueId) => {
    // TODO: Navigate to individual issue page
    console.log('Navigate to issue:', issueId);
  };

  const handleCardHover = (issueId) => {
    setHoveredCard(issueId);
  };

  return (
    <div className="newsletter-archive-page">
      <NewsletterHeader 
        onReturnHome={handleReturnHome} 
        onThemeChange={handleThemeChange}
      />
      
      <main className="newsletter-archive-content">
        <div className="issues-timeline">
          {issues.map(issue => (
            <NewsletterIssueCard
              key={issue.id}
              issue={issue}
              onClick={() => handleIssueClick(issue.id)}
              onHover={handleCardHover}
              isHovered={hoveredCard === issue.id}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default NewsletterArchive;