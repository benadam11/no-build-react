import { render, html, useState } from './utils.js';

function App({name}) {
  const [count, setCount ] = useState(0);

  return html`
    <h1>${count} ${name}</h1>
    <button onClick=${()=>setCount(count+1)}> Add Count</button>
    <button onClick=${()=>setCount(count-1)}>Decrease</button>
  `;
}

render(
  html` <${App} name='Ben' /> `,
  document.getElementById('root')
);
