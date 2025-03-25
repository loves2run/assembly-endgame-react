import React from "react"

/**
 * Goal: Build out the main parts of our app
 * 
 * Challenge: Build a status section below the header.
 * For now, you can just hard-code in the styles for
 * a winning game, and we'll make it more dynamic
 * later.
 */

export default function AssemblyEndgame() {
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
    </main>

  )
}