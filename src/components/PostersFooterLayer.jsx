import { useMediaQuery } from "react-responsive";

export default function PostersFooterLayer() {
  const breakpoint = useMediaQuery({maxWidth: 887})
  return (
    <div className="po-footer-layer">
      <div className="po-footer-cta-panel">
        <div className="po-footer-left" style={{ padding: breakpoint ? "22px 10px" : "52px 40px" }}>
          <p className="po-footer-kicker">Want something unique?</p>

          <h2 className="po-footer-heading">
            Custom Print
            <br />
            <em>Order</em>
          </h2>

          <p className="po-footer-body" style={{ marginBottom: "30px" }}>
            Have a specific concept, size, or print method in mind? Custom
            orders available for runs of 10 or more. DM or email with your
            brief.
          </p>
        </div>

        <div className="po-footer-right" style={{ padding: breakpoint? "22px 10px" : "52px 40px" }}>
          <p className="po-footer-description">
            Custom prints start at $200 for a run of 10. All editions are
            hand-finished, signed, and numbered. Turnaround time 2–4 weeks
            depending on method.
          </p>

          <div className="po-footer-actions">
            <a
              href="mailto:winstrxl@gmail.com"
              className="po-footer-btn primary"
              style={{ padding: "10px 22px" }}
            >
              Send a message
            </a>
            <a
              href="/posters"
              className="po-footer-btn"
              style={{ padding: "10px 22px" }}
            >
              See Examples
            </a>
          </div>

          <div className="po-footer-status" style={{ marginTop: "2px" }}>
            <span className="po-footer-status-dot" />
            Currently available for custom orders
          </div>
        </div>
      </div>
    </div>
  );
}
