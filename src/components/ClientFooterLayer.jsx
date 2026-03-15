import { useMediaQuery } from "react-responsive";

export default function PostersFooterLayer() {
  const breakpoint = useMediaQuery({ maxWidth: 887 });
  return (
    <div className="po-footer-layer">
      <div className="po-footer-cta-panel">
        <div
          className="cl-footer-left"
          style={{ padding: breakpoint ? "22px 10px" : "52px 40px" }}
        >
          <p className="po-footer-kicker">Ready to work together?</p>

          <h2 className="po-footer-heading">
            Start a
            <br />
            <em>Project</em>
          </h2>

          <p className="po-footer-body" style={{ marginBottom: "30px" }}>
            Have a brand, content series, or one-off visual in mind? Project
            inquiries are open. Reach out with your brief and let's figure out
            what fits.
          </p>
        </div>

        <div
          className="po-footer-right"
          style={{ padding: breakpoint ? "22px 10px" : "52px 40px" }}
        >
          <p className="po-footer-description">
            Most projects are scoped and priced after an initial call. Ongoing
            retainers, one-off deliverables, and rush timelines are all on the
            table — just ask upfront.
          </p>

          <div className="po-footer-actions">
            <a
              href="mailto:winstrxl@gmail.com"
              className="po-footer-btn primary"
              style={{ padding: "10px 22px" }}
            >
              Send a brief
            </a>
            <a
              href="/design-work"
              className="po-footer-btn"
              style={{ padding: "10px 22px" }}
            >
              See the work
            </a>
          </div>

          <div className="po-footer-status" style={{ marginTop: "2px" }}>
            <span className="po-footer-status-dot" />
            Currently taking on new clients
          </div>
        </div>
      </div>
    </div>
  );
}
