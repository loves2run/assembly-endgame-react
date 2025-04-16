import {useState} from 'react'
import clsx from 'clsx'
import { languages } from "./languages"
import { getFarewellText, getRandomWord } from './utils'
import Confetti from 'react-confetti'
import { useWindowSize } from '@react-hook/window-size'


export default function AssemblyEndgame() {
  //state values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord()) //used lazy state initialization to prevent running this on re-renders
  const [guesses, setGuesses] = useState([])
  const [farewell, setFarewell] = useState('')

  console.log(currentWord)

  //derived values
   const wrongGuessCount = guesses.filter(letter => !currentWord.includes(letter)).length
   const maxWrongGuesses = languages.length - 1
   const numGuessesRemaining = maxWrongGuesses - wrongGuessCount
   const isGameWon =
    currentWord.split('').every(letter => guesses.includes(letter))
  const isGameLost = wrongGuessCount >= maxWrongGuesses
  const isGameOver = isGameLost || isGameWon
  const lastGuessedLetter = guesses[guesses.length - 1]


  //static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  console.log("numGuessesRemaining:", numGuessesRemaining)

/* 
Bob showed us 2 methods
  1) first method uses a ternary to check if the prevGuesses array includes
      the newGuess and if it does, it will not add it again
  2) the second method uses a set, which does not allow duplicates
*/  

//**** Method 1
  const makeGuess = (newGuess) => {
    if (guesses.includes(newGuess)) return
 
    const isWrong = !currentWord.includes(newGuess)

    if (isWrong) {
      const lostLanguage = languages[wrongGuessCount]
      setFarewell(getFarewellText(lostLanguage.name))
    }

    if (!isWrong) {
      setFarewell('')
    }
    
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

  const letterElements = currentWord.split('').map((letter, index) => {
    const letterStyles = clsx({
      'letterChip' : true,
      'incorrectGuess' : isGameLost && !guesses.includes(letter)
    })
    return (
      <span className={letterStyles} key={index}>
        {guesses.includes(letter) ? 
        letter.toUpperCase() : 
        isGameLost ? 
        letter.toUpperCase() : ''}
      </span>
  )})

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
        disabled={isGameOver}
        className={className}
        key={letter} 
        onClick={() => makeGuess(letter)}
        aria-disabled={guesses.includes(letter)}
        aria-label={`Letter ${letter}`}
      >
        {letter.toUpperCase()}
      </button>
    )
  })

  const RenderGameStatus = () => {

    if (isGameWon) {
      return (
        <>
          <h2>You Win!</h2><br/>
          <span>Well done! 🎉</span>
        </>
      )
    } 
    if (isGameLost) {
      return (
        <>
          <h2>Game Over!</h2><br/>
          <span>You lose! Better start learning Assembly 😭</span>
        </>
      )
    } 

    if (farewell) {
      return (
        <>
          <span style={{fontStyle: 'italic'}}>{farewell} 🫡</span>
        </>
      )
    }
    else {
      return (<></>)
    }
  }

  const handleGameReset = () => {
    setGuesses([])
    setFarewell('')
    setCurrentWord(getRandomWord())
  }

  const MakeConfetti = () => {
    const {width, height} = useWindowSize()
    return(
      <Confetti width={width} height={height} recycle={false} numberOfPieces={1000}/>
    )
  }


  return (
    <main>
        {isGameWon && <MakeConfetti />}
      <header>
          <h1>Assembly: Endgame</h1>
          <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section 
        id="statusBar" 
        className={clsx({
          'bgGameInProgress' : !isGameOver, 
          'bgWrongGuess' : farewell && !isGameOver,
          'bgGameWon': isGameWon, 
          'bgGameLost' : isGameLost})}
        aria-live='polite'
        role='status'
          >
        <RenderGameStatus />
      </section>

      <section className="languageChips">
        {languageElements}
      </section>

      <section className="word">
        {letterElements}
      </section>


      {/* Combined visually-hidden aria-live region for status updates */}
      <section 
        className="sr-only"
        aria-live='polite'
        role='status'
      >
          <p>
            {currentWord.includes(lastGuessedLetter) ?
              `Correct! The letter ${lastGuessedLetter} is in the word. ` :
              `Sorry, the letter ${lastGuessedLetter} is not in the word.`
            }
            You have {numGuessesRemaining} attempts left.
          </p>

          <p>
            Current word: {currentWord.split('').map(letter =>
              guesses.includes(letter) ? letter + '.' : 'blank.')
              .join(' ')}
          </p>
        
      </section>

      <section className="keyboard">
        {keyboardElements}
      </section>

      {isGameOver && <button className="newGame" onClick={handleGameReset}>New Game</button>}

    </main>

  )
}