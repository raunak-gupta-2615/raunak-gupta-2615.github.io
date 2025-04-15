function analyzeText() {
    const text = document.getElementById('inputText').value;
    const output = document.getElementById('output');
  
    let letters = (text.match(/[a-zA-Z]/g) || []).length;
    let words = (text.match(/\b\w+\b/g) || []).length;
    let spaces = (text.match(/ /g) || []).length;
    let newlines = (text.match(/\n/g) || []).length;
    let specialSymbols = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
  
    const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];
  
    const pronouns = ['i','you','he','she','it','we','they','me','him','her','us','them'];
    const prepositions = ['in','on','at','by','with','about','against','between','into','through','during','before','after','above','below'];
    const articles = ['a','an','the'];
  
    const countTokens = (list) => {
      let count = {};
      for (let word of tokens) {
        if (list.includes(word)) count[word] = (count[word] || 0) + 1;
      }
      return count;
    };
  
    const result = `
  Letters: ${letters}
  Words: ${words}
  Spaces: ${spaces}
  Newlines: ${newlines}
  Special Symbols: ${specialSymbols}
  
  Pronouns: ${JSON.stringify(countTokens(pronouns), null, 2)}
  Prepositions: ${JSON.stringify(countTokens(prepositions), null, 2)}
  Indefinite Articles: ${JSON.stringify(countTokens(['a', 'an']), null, 2)}
  `;
  
    output.textContent = result;
  }
  