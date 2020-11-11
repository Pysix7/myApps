import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
            Hello world! this is pysix.
        </h1>

        <div className={styles.grid}>
          <a href="https://pysix7.github.io/me/" className={styles.card}>
            <h3>Porfolio &rarr;</h3>
            <p>find more about me here</p>
          </a>
        </div>
      </main>
    </div>
  )
}
