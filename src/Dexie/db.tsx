import Dexie, { Table } from 'dexie';

export interface Word {
  word: string;
}

export class MySubClassedDexie extends Dexie {
    words!: Table<Word>; 

  constructor() {
    super('wordDatabase');
    this.version(1).stores({
      words: 'word' // Primary key and indexed props
    });
  }
}

function addWords(word: string) {
  try {
    await db.words.add({
      word
    });

    setName(`${word} added`);
    setAge(defaultAge);
  } catch (error) {
    setStatus(`Failed to add ${word}: ${error}`);
  }
}


export function AddFriendForm({defaultAge} = {defaultAge: 21}) {
  const [word, setWord] = useState("");

  function addWords(word: string) {
    try {
      await db.words.add({
        word
      });
  
      setName(`${word} added`);
      setAge(defaultAge);
    } catch (error) {
      setStatus(`Failed to add ${word}: ${error}`);
    }
  }
  

  return <>
    Word:
    <input
      type="text"
      value={word}
      onChange={ev => setWord(ev.target.value)}
    />
    <button onClick={addWords}>
      Add
    </button>
  </>
}
export const db = new MySubClassedDexie();