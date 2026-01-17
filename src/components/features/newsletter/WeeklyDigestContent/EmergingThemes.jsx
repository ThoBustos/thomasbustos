import './EmergingThemes.css';

function EmergingThemes({ themes }) {
  if (!themes || themes.length === 0) return null;

  return (
    <div className="emerging-themes">
      <h3 className="themes-title">Themes This Week</h3>
      <ol className="themes-list">
        {themes.map((theme, index) => (
          <li key={index} className="theme-item">
            <span className="theme-name">{theme.name || theme.theme || theme.title}</span>
            {theme.one_liner && (
              <span className="theme-one-liner"> — {theme.one_liner}</span>
            )}
            {(theme.mention_count || theme.video_ids?.length) && (
              <span className="theme-count">
                ({theme.mention_count || theme.video_ids?.length} video{(theme.mention_count || theme.video_ids?.length) !== 1 ? 's' : ''})
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default EmergingThemes;
