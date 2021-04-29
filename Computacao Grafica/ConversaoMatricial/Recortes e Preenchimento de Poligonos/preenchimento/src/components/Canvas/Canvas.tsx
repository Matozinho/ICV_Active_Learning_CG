import styles from './styles.module.css';

export function Canvas() {
  return (
    <canvas className={styles.canvas} width={900} height={500} />
  )
}