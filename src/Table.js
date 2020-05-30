import { html } from './html.js';
import { useState } from 'https://cdn.pika.dev/react';
import { useForm } from 'https://cdn.pika.dev/react-hook-form';

function AddNameForm({ onSubmit }) {
  const { register, handleSubmit } = useForm();
  return html`
    <h3>Add a row:</h3>
    <form onSubmit=${handleSubmit(onSubmit)}>
      <fieldset>
        <label for="firstName">First Name</label>
        <input name="firstName" placeholder="First Name" ref=${register} />
        <label for="firstName">First Name</label>
        <input name="lastName" placeholder="Last Name" ref=${register} />
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  `;
}

function Table({ data: initialData }) {
  const [data, setData] = useState(initialData);

  const onSubmit = (record, e) => {
    e.preventDefault();
    setData((prevData) => prevData.concat(record));
    e.target.reset();
  };

  return html`
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        ${data.map(({ firstName, lastName }, i) => {
          return html`
            <tr key="${i}">
              <td>${firstName}</td>
              <td>${lastName}</td>
            </tr>
          `;
        })}
      </tbody>
    </table>
    <${AddNameForm} onSubmit=${onSubmit} />
  `;
}

export default Table;
