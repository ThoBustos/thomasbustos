import { renderMarkdown } from '../../../../utils/renderMarkdown';
import './BigPictureBullets.css';

function BigPictureBullets({ bullets }) {
  if (!bullets || bullets.length === 0) return null;

  return (
    <ul className="big-picture-bullets">
      {bullets.map((bullet, index) => (
        <li key={index} className="big-picture-bullet">
          {renderMarkdown(bullet, `bullet-${index}`)}
        </li>
      ))}
    </ul>
  );
}

export default BigPictureBullets;
