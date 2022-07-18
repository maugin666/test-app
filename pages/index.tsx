import type { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../components/layout';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <Layout home headerName="Menu">
      <div className={styles.menu}>
        <Link href="/candidates">
          <a>Candidates</a>
        </Link>
      </div>
    </Layout>
  )
}

export default Home;
