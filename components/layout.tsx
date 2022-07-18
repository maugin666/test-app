import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';

export const siteTitle = 'Mini App';

interface LayoutProps {
  children?: JSX.Element | JSX.Element[];
  home?: boolean;
  headerName: string;
}

const Layout: FunctionComponent<LayoutProps> = ({ children, home, headerName }) => {
    return <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={siteTitle} />
        <meta name="og:title" content={siteTitle} />
        <title>{headerName}</title>
      </Head>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <header className={styles.header}>
        <h3>{headerName}</h3>
      </header>
      <main>{children}</main>
    </div>;
  };

  export default Layout;
  