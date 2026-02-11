import { useMediaQuery } from "react-responsive";

const HrSpecialDesign = ({ className, top, bottom }) => {
  return (
    <div
      style={{ marginTop: `${top}px`, marginBottom: `${bottom}px` }}
      className={`flex justify-center items-center ${className}`}
    >
      <div className="hr-block" />
      <hr className="w-full opacity-30" />
      <div className="hr-block" />
    </div>
  );
};

export default function Footer() {
  const firstBreakPoint = useMediaQuery({maxWidth: 1024})
  return (
    // Main footer container
    <footer className="min-h-screen">
      {/* Story section */}
      <section
        style={{ padding: "50px 30px" }}
        className="footer-card"
        id="story"
      >
        <img
          style={{ marginBottom: "5px" }}
          src="/svg/bottom-right-arrow.svg"
          className="bottom-right-svg"
          alt=""
        />

        {/* Story header - contains "my story" title */}
        <div className="story-header">
          <h1 className="">my story</h1>
          <img
            style={{ marginLeft: "auto" }}
            className=""
            src="/svg/bottom-left-arrow.svg"
            alt=""
          />
        </div>

        {/* Story subheader - contains name, role, and location */}
        <div className="story-subheader">
          <p>winstrxl</p>
          <p>Designer / 3d artist / creative consultant</p>
          <p className="">riga.lativia</p>
        </div>

        <HrSpecialDesign top={20} bottom={20} className={`hr-story`} />

        {/* Story bottom section - contains main content */}
        <div style={{}} className="story-bottom">
          <img
            src="/svg/triangle.svg"
            className="right-triangle-story"
            alt=""
          />

          {/* Story content container - two column layout */}
          {/* Left side content - about text and services button */}
          <div style={{ marginTop: '3%' }} className="left-side top-side">
            <p>
              Fueled by curiosity, I blend fashion, product design, and 3D
              technology to craft concepts that push beyond conventional
              boundaries. For me, design is a journey of exploration — a process
              of ideas, experimentation, and storytelling that turns imagination
              into reality.
            </p>
            <button style={{ padding: "8px" }} className="story-button">
              <span className="">
                <img className="w-4" src="/svg/rotating-icon.svg" alt="" />
                <p>learn about my services</p>
              </span>
            </button>
          </div>

          {/* Right side content - additional description paragraphs */}
          <div style={{ marginTop: firstBreakPoint ? "0%" : "3%" }} className="right-side bottom-side">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo in
              voluptate, magnam id, vero necessitatibus officiis enim accusamus,
              illum molestiae amet quam fuga laudantium praesentium omnis
              mollitia cupiditate ut vel! Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Officiis minus magni molestias
              labore similique repellat, exercitationem vitae itaque excepturi,
              consequuntur sed ipsam cum voluptate, unde voluptatem quaerat
              doloribus dicta atque?
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum
              voluptates beatae eveniet repellat animi sit harum voluptatem
              distinctio saepe. Ratione.
            </p>
          </div>
        </div>
      </section>

      <section className="footer-card" id="clients">
        <div className="clients-header">
          <HrSpecialDesign /> <h1>CLIENTS</h1> <HrSpecialDesign />
        </div>
        <div className="clients-center"></div>
        <div className="clients-bottom">
          <p>it has been a privilage ...</p>
        </div>
      </section>

      <section className="footer-card" id="contact">
        <div className="contact-header">
          <HrSpecialDesign /> <h1>Let's connect</h1> <HrSpecialDesign />
        </div>
        <div className="contact-center">
          <p>
            every collaboration begins with an idea. if you're looking for a
            creative partner to help bring your to life, feel free to get in
            touch with me
          </p>
          <div className="contact-email">
            <img src="/svg/right-arrow.svg" alt="" /> info@gmail.com
          </div>
        </div>
        <HrSpecialDesign />
        <div className="contact-bottom">
          <p>
            copyright <br />
            @wintrxl.com 2026
          </p>
          <p>all rights reserved</p>
        </div>
      </section>
    </footer>
  );
}
