import {useState} from 'react'
import clsx from 'clsx'
import { languages } from "./languages"



export default function AssemblyEndgame() {
  //state values
  const [currentWord, setCurrentWord] = useState('react')
  const [guesses, setGuesses] = useState([])

  //derived values
  const wrongGuessCount = guesses.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = guesses.length - wrongGuessCount >= currentWord.length
  const isGameLost = wrongGuessCount >= languages.length -1
  const isGameOver = isGameLost || isGameWon

  //static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

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

  const languageElements = languages.map((lang, index) => {

    const lostLanguage = index < wrongGuessCount

    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }
    return (
      <span 
        className={clsx('langChips',{'lost' : lostLanguage})}
        key={lang.name} style={styles}
      >
        {lang.name}
      </span>
    )
  })

  const letterElements = currentWord.split('').map((letter, index) => (
      <span className='letterChip' key={index}>
        {guesses.includes(letter) ? letter.toUpperCase() : ''}</span>
  ))

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

  /**
 * Goal: Add in the incorrect guesses mechanism to the game
 * 
 * Challenge:
 * Conditionally render either the "won" or "lost" statuses
 * from the design, both the text and the styles, based on the
 * new derived variables.
 * 
 * Note: We always want the surrounding `section` to be rendered,
 * so only change the content inside that section. Otherwise the
 * content on the page would jump around a bit too much.
 */

  const RenderGameStatus = () => {

    if (isGameWon) {
      return (
        <>
          <h2>You Win!</h2><br/>
          <span>Well done! 🎉</span>
        </>
      )
    } else if (isGameLost) {
      return (
        <>
          <h2>Game Over!</h2><br/>
          <span>You lose! Better start learning Assembly 😭</span>
        </>
      )
    } else {
      return (<></>)
    }
  }




  return (
    <main>
      <header>
          <h1>Assembly: Endgame</h1>
          <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section id="statusBar" className={clsx({'bgGameInProgress' : !isGameOver, 'bgGameWon': isGameWon, 'bgGameLost' : isGameLost})}>
        <RenderGameStatus />
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

      {isGameOver && <button className="newGame">New Game</button>}

    </main>

  )
}