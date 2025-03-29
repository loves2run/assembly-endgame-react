import {useState} from 'react'
import { languages } from "./languages"


/**
 * Goal: Build out the main parts of our app
 * 
 * Challenge: 
 * Display the keyboard ⌨️. Use <button>s for each letter
 * since it'll need to be clickable and tab-accessible.
 */

export default function AssemblyEndgame() {

  const [currentWord, setCurrentWord] = useState('react')

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const languageElements = languages.map((lang) => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }
    return (
      <span className="langChips" key={lang.name} style={styles}>
        {lang.name}
      </span>
    )
  })

  const letterElements = currentWord.split('')
      .map((letter, index) => <span className="letterChip" key={index}>{letter.toUpperCase()}</span>)


  const keyboardElements = alphabet
    .split('')
    .map(letter => <button key={letter}>{letter.toUpperCase()}</button>)

  return (
    <main>
      <header>
          <h1>Assembly: Endgame</h1>
          <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section id="statusBar">
        <h2>You Win!</h2><br/>
        <span>Well done! 🎉</span>
      </section>

      <section className="languageChips">
        {languageElements}
      </section>

      <section className="word">
        {letterElements}
      </section>

      <section className="keyboard">
        {keyboardElements}
      </section>

      <button className="newGame">New Game</button>

    </main>

  )
}