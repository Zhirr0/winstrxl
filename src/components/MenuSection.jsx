import LeftMenuContainer from "./LeftMenuContainer";
import MenuBackground from "./MenuBackground";

const MenuSection = () => {
  return (
    <section
      style={{ padding: "20px clamp(3px, 1vw, 12.4px)" }}
      className="menu-section"
    >
      <MenuBackground />
      <div className="left-menu top-menu">
        <LeftMenuContainer />
      </div>

      <div style={{ padding: "0px 30px" }} className="right-menu bottom-menu">
        <div className="about-container right-container">
          <div>
            <p>01</p>
            <h3>ABOUT</h3>
          </div>
          <img src="/svg/plus.svg" className="w-3 h-auto" alt="" />
        </div>
        <hr style={{ margin: "20px 0px" }} />

        <div className="projects-container right-container">
          <div>
            <p>02</p>
            <h3>PROJECTS</h3>
          </div>
          <img src="/svg/plus.svg" className="w-3 h-auto" alt="" />
        </div>
        <hr style={{ margin: "20px 0px" }} />

        <div className="clients-container right-container">
          <div>
            <p>03</p>
            <h3>CLIENTS</h3>
          </div>
          <img src="/svg/plus.svg" className="w-3 h-auto" alt="" />
        </div>
        <hr style={{ margin: "20px 0px" }} />

        <div className="contacts-container right-container">
          <div>
            <p>04</p>
            <h3>CONTACT</h3>
          </div>
          <img src="/svg/plus.svg" className="w-3 h-auto" alt="" />
        </div>
        <hr style={{ margin: "20px 0px" }} />
        <div className="menu-contacts">
          <div className="socials">
            <img style={{marginTop: '5px'}} src="/svg/plus.svg" alt="" />
            <div className="seperate-container" >
              <h4>FOLLOW</h4>
              <div >
                <p>linkedln</p>
                <p>instagram</p>
                <p>behancd</p>
              </div>
            </div>
          </div>
          <div className="contacts-email">
            <img style={{marginTop: '5px'}} src="/svg/plus.svg" alt="" />
            <div>
              <h4>CONTACT</h4>
              <p>info@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
