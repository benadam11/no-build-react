import { html } from './utils/html.js';
import { render } from "https://cdn.pika.dev/react-dom";
import Table from './components/Table.js';

render(
  html`
    <h1>No Build React</h1>
    <${Table} />
  `,
  document.getElementById('root')
);
