import { html } from './html.js';
import { render } from "https://cdn.pika.dev/react-dom";

import Table from './Table.js';
import makeData from './makeData.js';

const data = makeData(10);

render(
  html` <${Table} data=${data} /> `,
  document.getElementById('root')
);
