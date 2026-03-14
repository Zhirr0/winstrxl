export default function EsportsFooterLayer() {
  return (
    <div className="footer-top-layer">
      <div className="footer-cta-panel">

        <div className="footer-cta-left">
          <div className="footer-cta-kicker whitespace-nowrap">Ready to compete visually?</div>

          <div className="footer-cta-heading">
            Build Your<br />
            <em>Identity</em>
          </div>

          <p style={{marginBottom: '30px'}} className="footer-cta-body">
            Whether you're an org, a streamer, or building a team from scratch —
            every competitive brand needs a visual identity that hits as hard as
            the gameplay. Let's build yours.
          </p>
        </div>

        <div className="footer-cta-right">
          <p className="footer-cta-description">
            Packages available for individual streamers, amateur teams, and full
            esports organisations. Includes logo, jersey concepts, social kit,
            and overlay system.
          </p>

          <div className="footer-cta-actions">
            <a
              href="mailto:winstrxl@gmail.com"
              className="footer-cta-btn primary"
            >
              Start a Project
            </a>
            <a href="/esports" className="footer-cta-btn">
              View Packages
            </a>
          </div>

          <div className="footer-cta-status">
            <span className="footer-cta-status-dot" />
            Currently taking esports clients
          </div>
        </div>

      </div>
    </div>
  );
}