import { renderMarkdownParagraphs } from '../../../../utils/renderMarkdown';
import './DeeperPicture.css';

function DeeperPicture({ content }) {
  if (!content) return null;

  return (
    <div className="deeper-picture">
      {renderMarkdownParagraphs(content, 'deeper')}
    </div>
  );
}

export default DeeperPicture;
