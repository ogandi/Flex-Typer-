
export function findTotalCharacters(paragraphs) {
    let totalCharacterCount = 0
    for (let i = 1; i < paragraphs.length; i++) {
        totalCharacterCount += paragraphs[i].length
    }
    return totalCharacterCount
}

export function filterParagraphs(paragraphs, paragraphIndex, errors, userOutput) {
    const currentParagraph = paragraphs[paragraphIndex]
        const firstErrorIndex = errors.length > 0 ? errors[0] : userOutput.length
        const correctText = currentParagraph.slice(0, firstErrorIndex)
        const remainingText = currentParagraph.slice(firstErrorIndex)
        return {correctText, remainingText}
}

