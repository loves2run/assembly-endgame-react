import {useState} from 'react'
import clsx from 'clsx'
import { languages } from "./languages"


/**
 * Goal: Allow the user to start guessing the letters
 * 
 * Challenge: Update the keyboard when a letter is right
 * or wrong.
 * 
 * Bonus: use the `clsx` package to easily add conditional 
 * classNames to the keys of the keyboard. Check the docs 
 * to learn how to use it 📖
 */

export default function AssemblyEndgame() {

  const [currentWord, setCurrentWord] = useState('react')
  const [guesses, setGuesses] = useState([])

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  console.log("guesses:", guesses)

/* 
Bob showed us 2 methods
  1) first method uses a ternary to check if the prevGuesses array includes
      the newGuess and if it does, it will not add it again
  2) the second method uses a set, which does not allow duplicates
*/  

//**** Method 1
  const makeGuess = (newGuess) => {
    setGuesses(prevGuesses => 
      prevGuesses.includes(newGuess) ? 
        prevGuesses : 
        [...prevGuesses, newGuess]
    )
  }

  //*** Method 2
  // const makeGuess = (newGuess) => {
  //   setGuesses(prevguesses => {
  //     const letterSet = new Set(prevguesses)
  //     letterSet.add(newGuess)
  //     return Array.from(letterSet)
  //   })
  
  // }

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
      .map((letter, index) => <span className='letterChip' key={index}>{letter.toUpperCase()}</span>)

//used Bob's method to render dynamic keyboard colors --> see Notion notes, 
//      new Lesson - Assembly: Endgame - Keyboard letters styles for guesses for my method
  const keyboardElements = alphabet.split('').map(letter => {
    const isGuessed = guesses.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)
    const className = clsx({
      'letters' : true,
      'correctGuess' : isCorrect,
      'incorrectGuess' : isWrong
    })

    return (
      <button
        className={className}
        key={letter} 
        onClick={() => makeGuess(letter)}
      >
        {letter.toUpperCase()}
      </button>
    )
  })

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