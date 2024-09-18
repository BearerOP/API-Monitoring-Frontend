const Footer = () => {
  const styles = {
    root: {
      '--m': '4rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '300vh',
    },
    card: {
      height: 'calc(8 * var(--m))',
      width: 'calc(12 * var(--m))',
      background: 'linear-gradient(120deg, #ff8064, #725bdc)',
      color: 'white',
      borderRadius: 'calc(0.5 * var(--m))',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 'var(--m)',
      marginBottom: '3rem',
      padding: '2rem',
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#000',
      fontSize: 'calc(0.4 * var(--m))',
      border: 'none',
      color: '#e5e5e5',
      fontFamily: 'IBM Plex Sans',
      fontWeight: 400,
      padding: 'calc(0.35 * var(--m)) calc(0.8 * var(--m))',
      borderRadius: 'calc(0.3 * var(--m))',
    },
    footer: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'flex-end',
      padding: '5rem 2vw',
      position: 'relative',
    },
    footerBefore: {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(
        rgba(0, 0, 0, 0) 5%,
        rgba(0, 0, 0, 0.3) 20%,
        rgba(0, 0, 0, 0.6) 30%,
        rgba(0, 0, 0, 0.8) 40%,
        rgba(0, 0, 0, 1) 50%,
        rgb(0, 0, 0)
      )`,
      zIndex: -7,
    },
    backdrop: {
      zIndex: -5,
      position: 'absolute',
      inset: 0,
      backdropFilter: 'blur(40px)',
      WebkitBackdropFilter: 'blur(40px)',
      maskImage: `linear-gradient(
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.5) 10%,
        rgba(0, 0, 0, 0.8) 20%,
        rgba(0, 0, 0, 1) 30%,
        rgb(0, 0, 0)
      )`,
      WebkitMaskImage: `linear-gradient(
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.5) 10%,
        rgba(0, 0, 0, 0.8) 20%,
        rgba(0, 0, 0, 1) 30%,
        rgb(0, 0, 0)
      )`,
    },
    col: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      padding: 'calc(0.3 * var(--m)) calc(0.8 * var(--m))',
      width: '28%',
    },
    social: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: '1rem',
    },
    link: {
      width: 'calc(0.8 * var(--m))',
      height: 'calc(0.8 * var(--m))',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 'calc(0.1 * var(--m))',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    colBackground: {
      backgroundColor: '#121212',
      borderRadius: 'calc(0.5 * var(--m))',
    },
    img: {
      height: 'calc(0.3 * var(--m))',
      objectFit: 'cover',
    },
  };

  return (
    <div style={styles.root}>
      <div className="card" style={styles.card}>
        <h2>
          Scroll Now
          <br />
          Thank Yourself Later
        </h2>
        <button style={styles.button}>
          <a
            href="#footer"
            style={{ color: '#e5e5e5', textDecoration: 'none' }}
          >
            Scroll
          </a>
        </button>
      </div>
      <footer style={styles.footer} id="footer">
        <div className="col col1" style={styles.col}>
          <h3>CoolSite</h3>
          <p>
            Made with <span style={{ color: '#BA6573' }}>❤</span> by Jux
          </p>
          <div className="social" style={styles.social}>
            <a
              href="https://codepen.io/Juxtopposed"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              <img
                src="https://assets.codepen.io/9051928/codepen_1.png"
                alt=""
                style={styles.img}
              />
            </a>
            <a
              href="https://twitter.com/juxtopposed"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              <img
                src="https://assets.codepen.io/9051928/x.png"
                alt=""
                style={styles.img}
              />
            </a>
            <a
              href="https://youtube.com/@juxtopposed"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              <img
                src="https://assets.codepen.io/9051928/youtube_1.png"
                alt=""
                style={styles.img}
              />
            </a>
          </div>
          <p style={{ color: '#818181', fontSize: 'smaller' }}>
            2024 © All Rights Reserved
          </p>
        </div>
        <div
          className="col col2"
          style={{ ...styles.col, ...styles.colBackground }}
        >
          <p>About</p>
          <p>Our mission</p>
          <p>Privacy Policy</p>
          <p>Terms of service</p>
        </div>
        <div
          className="col col3"
          style={{ ...styles.col, ...styles.colBackground }}
        >
          <p>Services</p>
          <p>Products</p>
          <p>Join our team</p>
          <p>Partner with us</p>
        </div>
        <div className="backdrop" style={styles.backdrop}></div>
      </footer>
    </div>
  );
};

export default Footer;
