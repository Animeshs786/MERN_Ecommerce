import styles from './Heading.module.css';

function Heading({heading}) {
    return (
        <h1 className={styles.heading}>
            {heading}
        </h1>
    )
}

export default Heading
