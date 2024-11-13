

export function highlightParagraphs(gamePrompt, errors, userOutput) {
    const currentParagraph = gamePrompt[0]
        const firstErrorIndex = errors.length > 0 ? errors[0] : userOutput.length
        const correctText = currentParagraph.slice(0, firstErrorIndex)
        const remainingText = currentParagraph.slice(firstErrorIndex)
        return {correctText, remainingText}
}


