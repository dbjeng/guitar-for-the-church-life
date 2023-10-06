import styles from "./SongListItem.module.css"

export default function SongListItem({songName, songURL, key}) {
  return (
    <button onClick={() => {window.open(songURL, "_blank")}} className={styles.button} key={key}>
      {songName}
    </button>
  )
}