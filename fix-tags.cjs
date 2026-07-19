const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'src', 'App.jsx');
let c = fs.readFileSync(filePath, 'utf8');

// Fix the broken closing tags: the regex >??< -> >< accidentally ate the < from </span>
// Pattern: "MODEL:/span>" should be "MODEL:</span>"
c = c.replace(/MODEL:\/span>/g, 'MODEL:</span>');

// Fix any other broken closing tags caused by >??< replacement
// The regex turned ">??</span>" into "></span>" which is correct,
// BUT it also turned ">??</div>" patterns inside text into ">/div>" 
// Let's find patterns like text/span> or text/div> that lost their <
c = c.replace(/([^<>])\/span>/g, '$1</span>');
c = c.replace(/([^<>])\/div>/g, '$1</div>');
c = c.replace(/([^<>])\/button>/g, '$1</button>');
c = c.replace(/([^<>])\/main>/g, '$1</main>');
c = c.replace(/([^<>])\/p>/g, '$1</p>');

// Also fix the provider panel section where span content was removed
// The pattern `><I name="Sparkles".../>  MODEL:/span>` needs the </span> fixed
// Already handled above

fs.writeFileSync(filePath, c, 'utf8');
console.log('Done - fixed broken closing tags');
