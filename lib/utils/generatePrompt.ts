export function generatePrompt(question: FirebaseAnswer): string {
  const promptText = `
    Hei. Du er brukt i ett dataprogram til å finne riktig svar til quiz-spørsmål. Du får en array til 
    input, og du svarer med ett integer tall, fra 0 til 3. Du kan bare svare med tall, og ikke med setninger
    Eksempel input: 

    //eksempel spørsmål: Hvem var presidenten i USA i 2014
    0: Joe biden
    1: Barrack obama
    2: Linkon
    3: Donald trump

    // eksempel output:1

    //Nå er det din tur til å svare, husk: SVAR BARE MED ETT TALL
    Spørsmål: ${question.question}

    Svaralternativ:
    0: ${question.answers[0]}
    1: ${question.answers[1]}
    2: ${question.answers[2]}
    3: ${question.answers[3]}

    HUSK: Du kan BARE svare med enten "0", "1", "2", "3"
     `;
  return promptText;
}
