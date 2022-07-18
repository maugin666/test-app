import React from 'react';
import Image from 'next/image';
import loaderPic from '../../../public/loader.gif';
import styles from './Loader.module.css';

const Loader = (): JSX.Element => {
    return (
        <section className={styles.loader}>
            <Image
                src={loaderPic}
                alt='Loading'
            />
        </section>
)};

export default Loader;