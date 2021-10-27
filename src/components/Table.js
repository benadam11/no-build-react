import { html } from '../utils/html.js';
import { useState, useReducer, useEffect } from 'https://cdn.pika.dev/react';
import { useForm } from 'https://cdn.pika.dev/react-hook-form';

function sortData(data, orderType, sortKey) {
  const localData = data;
  function sortAsc(a, b) {
    if (a[sortKey] < b[sortKey]) {
      return -1;
    }
    if (a[sortKey] < b[sortKey]) {
      return 1;
    }
    return 0;
  }

  function sortDesc(a, b) {
    if (a[sortKey] > b[sortKey]) {
      return -1;
    }
    if (a[sortKey] < b[sortKey]) {
      return 1;
    }
    return 0;
  }

  switch (orderType) {
    case 'asc':
      return data.sort(sortAsc);
    case 'desc':
      return data.sort(sortDesc);
    default:
      return localData;
  }
}

function AddNameForm({ onSubmit }) {
  const { register, handleSubmit } = useForm();
  return html`
    <form onSubmit=${handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Add a row:</legend>
        <label for="firstName">First Name</label>
        <input name="firstName" placeholder="First Name" ...${register} />
        <label for="firstName">First Name</label>
        <input name="lastName" placeholder="Last Name" ...${register} />
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  `;
}

function TableHeader({ dispatch }) {
  return html`
    <thead>
      <tr>
        <th>
          Avatar
        </th>
        <th>
          <split>
            First Name
            <span>
              <b
                title="First name ascending"
                role="button"
                onClick=${() => dispatch('firstNameAsc')}
              >
                🔼
              </b>
              <b
                title="First name descending"
                role="button"
                onClick=${() => dispatch('firstNameDesc')}
              >
                🔽
              </b>
            </span>
          </split>
        </th>
        <th>
          <split>
            Last Name
            <span>
              <b
                title="Last name ascending"
                role="button"
                onClick=${() => dispatch('lastNameAsc')}
              >
                🔼
              </b>
              <b
                title="Last name descending"
                role="button"
                onClick=${() => dispatch('lastNameDesc')}
              >
                🔽
              </b>
            </span>
          </split>
        </th>
      </tr>
    </thead>
  `;
}

function TableRow({ first_name: firstName, last_name: lastName, avatar }) {
  return html`
    <tr>
      <td><${Avatar} avatar=${avatar} /></td>
      <td>${firstName}</td>
      <td>${lastName}</td>
    </tr>
  `;
}

function Avatar({ avatar }) {
  return avatar
    ? html`<img src=${avatar} />`
    : html`
        <svg width="40px" height="40px" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="50" />
        </svg>
      `;
}

const initialState = {
  sortKey: 'default',
  sortOrder: 'asc',
};

function reducer(state, action) {
  switch (action) {
    case 'firstNameAsc':
      return { sortKey: 'first_name', sortOrder: 'asc' };
    case 'firstNameDesc':
      return { sortKey: 'first_name', sortOrder: 'desc' };
    case 'lastNameAsc':
      return { sortKey: 'last_name', sortOrder: 'asc' };
    case 'lastNameDesc':
      return { sortKey: 'last_name', sortOrder: 'desc' };
    case 'noop':
      return state;
    default:
      return initialState;
  }
}

function Table() {
  const [data, setData] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((d) => setData(d.data));
  }, []);

  const onSubmit = ({ firstName: first_name, lastName: last_name }, e) => {
    e.preventDefault();
    setData((prevData) => prevData.concat({ first_name, last_name }));
    e.target.reset();
  };

  return html`
    <h3>Tables:</h3>
    <table>
      <${TableHeader} dispatch=${dispatch} />
      <tbody>
        ${sortData(data, state.sortOrder, state.sortKey).map((item, i) => {
          return html`<${TableRow} ...${item} key=${i} />`;
        })}
      </tbody>
    </table>
    <${AddNameForm} onSubmit=${onSubmit} />
  `;
}

export default Table;
