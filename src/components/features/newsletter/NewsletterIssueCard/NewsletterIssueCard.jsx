import './NewsletterIssueCard.css';

function NewsletterIssueCard({ issue, onClick, onHover, isHovered }) {

  const tagColors = {
    frontier: '#4E4B93',
    reasoning: '#8B87D6', 
    coding: '#F2E7C9',
    benchmarking: '#6B68A8',
    daily: '#3a3770',
    brief: '#B8B5E8',
    models: '#4E4B93',
    'open-source': '#8B87D6',
    performance: '#6B68A8',
    deepseek: '#3a3770',
    anthropic: '#4E4B93',
    updates: '#8B87D6',
    google: '#6B68A8',
    multimodal: '#3a3770',
    vision: '#B8B5E8'
  };

  const tagDescriptions = {
    'frontier': 'Cutting-edge AI developments pushing the boundaries of what\'s possible. Includes breakthrough models, novel architectures, and significant capability advances that represent the current state-of-the-art.',
    'reasoning': 'AI systems focused on logical thinking, problem-solving, and multi-step inference. Covers chain-of-thought reasoning, mathematical problem solving, complex decision making, and cognitive capabilities.',
    'coding': 'Programming and software development AI tools. Includes code generation, debugging assistance, software architecture, development workflows, and programming language support.',
    'benchmarking': 'Performance evaluation, testing methodologies, and comparative analysis of AI systems. Covers standardized tests, evaluation metrics, and assessment frameworks for AI capabilities.',
    'research': 'Academic and industry research developments, scientific papers, experimental findings, and theoretical advances in artificial intelligence and machine learning.',
    'openai': 'News, updates, and developments related to OpenAI and their AI systems including GPT models, ChatGPT, API developments, and company announcements.',
    'microsoft': 'Microsoft AI initiatives, Azure AI services, Copilot integrations, and partnerships in the artificial intelligence ecosystem.',
    'enterprise': 'Business applications of AI, corporate adoption, enterprise solutions, workplace integration, and organizational AI transformation strategies.',
    'daily': 'Regular daily coverage of incremental updates, minor announcements, and ongoing developments in the AI space.',
    'brief': 'Quick summaries and concise updates on AI developments, typically covering multiple smaller news items or brief announcements.',
    'community': 'AI community discussions, social aspects, developer forums, open source collaborations, and grassroots AI development.',
    'models': 'New AI model releases, architecture improvements, parameter scaling, training methodologies, and model performance comparisons.',
    'open-source': 'Open source AI projects, freely available models, community-driven development, and collaborative AI research initiatives.',
    'performance': 'Speed, efficiency, optimization, and computational performance improvements in AI systems and infrastructure.',
    'deepseek': 'News and developments related to DeepSeek AI models, their research, and technological contributions to the AI landscape.',
    'scaling': 'Computational scaling, model size increases, infrastructure expansion, and approaches to scaling AI systems effectively.',
    'inference': 'AI model deployment, real-time processing, edge computing, and optimization techniques for running AI models in production.',
    'context': 'Context window improvements, long-form reasoning, memory systems, and approaches to handling extended conversations or documents.',
    'memory': 'AI memory systems, information retention, long-term context maintenance, and approaches to persistent AI knowledge.',
    'optimization': 'Technical improvements, efficiency enhancements, resource utilization, and performance tuning in AI systems.',
    'weights': 'Model parameters, weight sharing, model compression, and technical aspects of neural network architectures.',
    'anthropic': 'Developments from Anthropic, Claude model updates, AI safety research, and constitutional AI approaches.',
    'updates': 'Product updates, feature releases, version improvements, and incremental enhancements to existing AI systems.',
    'claude': 'Specific news about Claude AI assistant, capabilities, improvements, and Anthropic\'s conversational AI developments.',
    'safety': 'AI safety research, alignment problems, risk mitigation, ethical AI development, and approaches to safe AI deployment.',
    'alignment': 'AI alignment research, ensuring AI systems behave as intended, value alignment, and approaches to beneficial AI.',
    'capabilities': 'New abilities, skill developments, expanded functionality, and enhanced features in AI systems.',
    'google': 'Google AI developments, Bard updates, Gemini models, DeepMind research, and Google\'s AI product ecosystem.',
    'multimodal': 'AI systems that process multiple input types like text, images, audio, and video. Cross-modal understanding and generation.',
    'vision': 'Computer vision, image processing, visual AI, image generation, and AI systems that understand and create visual content.',
    'gemini': 'Google\'s Gemini AI model family, capabilities, updates, and integration across Google\'s product ecosystem.',
    'text': 'Text processing, natural language understanding, language generation, and AI systems focused on textual content.',
    'image': 'Image generation, visual AI, computer vision, image editing, and AI systems that create or analyze visual content.',
    'video': 'Video processing, generation, analysis, and AI systems that understand or create video content.',
    'understanding': 'AI comprehension capabilities, semantic understanding, context awareness, and cognitive processing abilities.',
    'generative': 'AI systems that create content, including text generation, image creation, code generation, and other generative capabilities.',
    'training': 'AI model training processes, training methodologies, dataset preparation, and approaches to developing AI systems.',
    'infrastructure': 'Computing infrastructure, hardware requirements, cloud platforms, and technical systems supporting AI development.',
    'compute': 'Computational resources, processing power, hardware optimization, and the technical infrastructure powering AI systems.',
    'distributed': 'Distributed computing, parallel processing, cluster computing, and approaches to scaling AI across multiple systems.',
    'edge': 'Edge computing, on-device AI, mobile AI deployment, and running AI models locally rather than in the cloud.',
    'hardware': 'AI hardware developments, specialized chips, GPUs, TPUs, and physical infrastructure for AI computing.',
    'gpu': 'Graphics processing units for AI, GPU optimization, parallel processing, and hardware acceleration for AI workloads.',
    'cloud': 'Cloud-based AI services, distributed computing platforms, and cloud infrastructure for AI development and deployment.',
    'aws': 'Amazon Web Services AI offerings, AWS machine learning services, and Amazon\'s cloud AI infrastructure.',
    'azure': 'Microsoft Azure AI services, cloud-based AI tools, and Azure\'s machine learning platform offerings.',
    'cost': 'Economic aspects of AI, pricing models, cost optimization, and financial considerations in AI deployment.',
    'efficiency': 'Resource efficiency, optimization techniques, reducing computational costs, and making AI systems more efficient.',
    'deployment': 'AI system deployment, production readiness, scaling strategies, and putting AI models into real-world use.',
    'gpt-4': 'OpenAI\'s GPT-4 model, capabilities, updates, improvements, and applications of this large language model.',
    'api': 'Application programming interfaces for AI services, developer tools, integration methods, and programmatic AI access.',
    'function-calling': 'AI systems ability to call external functions, tool use, API integration, and extending AI capabilities.',
    'latency': 'Response time optimization, speed improvements, real-time processing, and reducing delays in AI systems.',
    'pricing': 'Cost structures, pricing models, economic aspects, and financial considerations of AI services and deployment.',
    'turbo': 'Optimized or accelerated versions of AI models, typically referring to faster or more efficient variants.'
  };

  return (
    <div 
      className="issue-card-zone"
      onMouseEnter={() => onHover(issue.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div 
        className="issue-card"
        onClick={onClick}
      >
        <div className="issue-main">
          <div className="issue-header">
            <span className="issue-date">{issue.date}</span>
            <div className="issue-meta">
              <span>{issue.sourceCount} sources</span>
              <span className="meta-separator">•</span>
              <span>{issue.readingTime}</span>
            </div>
          </div>
          
          <h3 className="issue-title">{issue.title}</h3>
          <p className="issue-summary">{issue.summary}</p>
        </div>
      </div>

      {isHovered && (
        <div className="tags-external">
          <div className="tags-external-container">
            {issue.tags.map(tag => (
              <div key={tag} className="tag-wrapper">
                <span 
                  className="issue-tag"
                  style={{ 
                    backgroundColor: tagColors[tag] || '#4E4B93',
                    color: tag === 'coding' ? '#0B102C' : '#FFFFFF'
                  }}
                >
                  #{tag}
                </span>
                <div className="tag-tooltip">
                  {tagDescriptions[tag] || 'AI-related development or news category.'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsletterIssueCard;