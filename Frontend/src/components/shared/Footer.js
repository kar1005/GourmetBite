import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.topContainer}>
        <div style={styles.logoContainer}>
          <h2 style={styles.logo}>GoumetBite</h2>
          <p style={styles.company}>GourmetBite provides  a platform for foodies to order online for their restaurant</p>
        </div>

        <div style={styles.linksContainer}>
          <div style={styles.column}>
            <a href="/" style={styles.link}>Weekly Themes</a>
            <a href="/" style={styles.link}>Plugins & FAQ</a>
            <a href="/" style={styles.link}>Submit a Ticket</a>
          </div>
          <div style={styles.column}>
            <a href="/" style={styles.link}>Services</a>
            <a href="/" style={styles.link}>Theme Store</a>
          </div>
          <div style={styles.column}>
            <a href="/" style={styles.link}>Showcase</a>
            <a href="/" style={styles.link}>Widgets</a>
            <a href="/" style={styles.link}>Support</a>
          </div>
          <div style={styles.column}>
            <a href="/" style={styles.link}>About Us</a>
            <a href="/" style={styles.link}>Contact Us</a>
            <a href="/" style={styles.link}>Resources</a>
          </div>
        </div>
      </div>

      <div style={styles.socialContainer}>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
          <i className="bi bi-github" style={styles.icon}></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
          <i className="bi bi-twitter" style={styles.icon}></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
          <i className="bi bi-instagram" style={styles.icon}></i>
        </a>
      </div>

      <p style={styles.copyright}>© 2024 All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "40px 20px",
    textAlign: "center",
    width: "100%",
    position: "relative",
    bottom: "0"
  },
  topContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 0",
    borderBottom: "1px solid #555",
    color:'#fff',
  },
  logoContainer: {
    textAlign: "left",
    color:'#fff',
  },
  logo: {
    fontSize: "24px",
    margin: 0,
    color:'#fff',
  },
  company: {
    fontSize: "14px",
    marginTop: "5px",
    color: "#888",
  },
  linksContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "70%",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    marginBottom: "8px",
    fontSize: "14px",
  },
  socialContainer: {
    margin: "20px 0",
  },
  iconLink: {
    margin: "0 15px",
  },
  icon: {
    fontSize: "24px",  // Larger size for better visibility
    color: "#fff",
  },
  copyright: {
    fontSize: "12px",
    marginTop: "10px",
    color: "#888",
    marginBottom:"-20px"
  }
};

export default Footer;
