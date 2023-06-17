import styles from '../styles/Loading.module.css';

function Loading() {
  return (
    <main className={ styles.main }>
      <span className={ styles.loader } />
    </main>
  );
}

export default Loading;
