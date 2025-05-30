document.addEventListener('DOMContentLoaded', function() {
  // Find all code blocks
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach(function(block) {
    // Create copy button
    const button = document.createElement('button');
    button.className = 'copy-code-button';
    button.textContent = 'Copy';
    
    // Add button to the code block's parent (pre element)
    const pre = block.parentNode;
    pre.style.position = 'relative';
    pre.appendChild(button);
    
    // Add click event listener
    button.addEventListener('click', function() {
      // Get the code content
      const code = block.textContent;
      
      // Copy to clipboard
      navigator.clipboard.writeText(code).then(function() {
        // Change button text temporarily
        button.textContent = 'Copied!';
        setTimeout(function() {
          button.textContent = 'Copy';
        }, 2000);
      }).catch(function(err) {
        console.error('Failed to copy text: ', err);
        button.textContent = 'Failed to copy';
        setTimeout(function() {
          button.textContent = 'Copy';
        }, 2000);
      });
    });
  });
}); 