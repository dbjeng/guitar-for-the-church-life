import { useEffect, useState } from "react";
import SongListItem from "../components/SongListItem";
import axios from "axios";
import styles from "./SongList.module.css";

export default function SongList({allowedChords}){
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    const encodedAllowedChordsParam = encodeURIComponent(allowedChords.join(','));
    axios
      .get(
        `http://guitar-for-the-church-life-env.eba-qzfhxmyy.us-west-1.elasticbeanstalk.com/filter/${encodedAllowedChordsParam}`
      )
      .then((response) => {
        const transformedData = response.data.map((song) => ({
          id: song.id,
          title: song.title,
        }));
        
        setSongList(transformedData);
      });
  }, [allowedChords]);

  return (
    <div className={styles.container}>
        {songList.map((song) => 
          <div>
            <SongListItem songName={song.title} songURL={`https://songbase.life/${song.id}`} key={song.id}/>
          </div>
        )}      
    </div>
  )
}