import styles from './Home.module.css';

export default function Home(){
    return (
        <div className={styles.verse}>
            <div>
                <div className={styles.textLine}>"Yes I will sing to Jehovah while I live; /</div>
                <div className={styles.textLine}>I will sing psalms to my God while I yet have being."</div>
                <div className={styles.textLine}>Psa. 104:33</div>
            </div>
        </div>
    )
}