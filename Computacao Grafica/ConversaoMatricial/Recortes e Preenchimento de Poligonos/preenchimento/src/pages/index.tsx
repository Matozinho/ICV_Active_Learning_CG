import Head from 'next/head';
import { Canvas } from '../components/Canvas/Canvas';
import { OptionsContainer } from '../components/OptionsContainer/OptionsContainer';

import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.HomeContainer}>
      <Head>
        <title>CG | Preenchimento de Polígonos</title>
        <meta name="description" content="Aplicação para preenchimento de polígonos" />
      </Head>
      <h1>Preenchimento de Polígonos</h1>
      <main className={styles.main}>
        <OptionsContainer />
        <Canvas />
      </main>
    </div>
  )
}
